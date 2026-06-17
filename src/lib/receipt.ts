import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export type ReceiptData = {
  merchantName: string;
  till?: string;
  amount: number;
  currency?: string;
  reference?: string;
  contributors?: number;
  time?: string;
};

export async function createReceiptPdf(data: ReceiptData): Promise<Blob> {
  const pdfDoc = await PDFDocument.create();

  // Set explicit mobile viewport proportions
  const page = pdfDoc.addPage([420, 680]);
  const { width, height } = page.getSize();

  const helv = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helvBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const margin = 28;
  let cursor = height - margin;

  // ==========================================
  // 1. DRAW SUCCESS CHECKMARK DIAL (VECTOR)
  // ==========================================
  const circleCenterX = width / 2;
  const circleY = cursor - 60;
  const circleRadius = 45;

  // Outer green circle background
  page.drawCircle({
    x: circleCenterX,
    y: circleY,
    radius: circleRadius,
    color: rgb(0.29, 0.68, 0.43), // Rich green matching the screenshot
  });

  // Pure mathematical vector lines to draw the white checkmark inside the circle
  // This bypasses font-encoding errors entirely
  page.drawLine({
    start: { x: circleCenterX - 18, y: circleY - 2 },
    end: { x: circleCenterX - 5, y: circleY - 15 },
    thickness: 5,
    color: rgb(1, 1, 1),
  });
  page.drawLine({
    start: { x: circleCenterX - 6.5, y: circleY - 15 },
    end: { x: circleCenterX + 20, y: circleY + 12 },
    thickness: 5,
    color: rgb(1, 1, 1),
  });

  cursor = circleY - circleRadius - 30;

  // ==========================================
  // 2. TEXT TYPOGRAPHY LAYER
  // ==========================================

  // "Merchant paid" header
  const title = "Merchant paid";
  const titleSize = 24;
  const titleWidth = helvBold.widthOfTextAtSize(title, titleSize);
  page.drawText(title, {
    x: (width - titleWidth) / 2,
    y: cursor,
    size: titleSize,
    font: helvBold,
    color: rgb(0.05, 0.05, 0.05),
  });
  cursor -= titleSize + 8;

  // "Settlement successful" subtitle
  const subtitle = "Settlement successful";
  const subSize = 13;
  const subWidth = helv.widthOfTextAtSize(subtitle, subSize);
  page.drawText(subtitle, {
    x: (width - subWidth) / 2,
    y: cursor,
    size: subSize,
    font: helv,
    color: rgb(0.45, 0.48, 0.52),
  });
  cursor -= 40;

  // "MZN 5,000" big red amount
  const amountText =
    `${data.currency ?? "MZN"} ${Number(data.amount).toLocaleString("en-US", { minimumFractionDigits: 0 })}`.trim();
  const amountSize = 38;
  const amountWidth = helvBold.widthOfTextAtSize(amountText, amountSize);
  page.drawText(amountText, {
    x: (width - amountWidth) / 2,
    y: cursor,
    size: amountSize,
    font: helvBold,
    color: rgb(0.85, 0.15, 0.12),
  });
  cursor -= amountSize + 8;

  // "to 1234" context label
  const toText = `to ${data.till ?? "—"}`;
  const toSize = 11;
  const toWidth = helv.widthOfTextAtSize(toText, toSize);
  page.drawText(toText, {
    x: (width - toWidth) / 2,
    y: cursor,
    size: toSize,
    font: helv,
    color: rgb(0.45, 0.48, 0.52),
  });
  cursor -= toSize + 35;

  // ==========================================
  // 3. ROUNDED RECEIPT DETAILS CARD
  // ==========================================
  const cardX = margin;
  const cardW = width - margin * 2;
  const rowH = 48; // Roomy height matching design spacing

  const rows = [
    ["Merchant", data.merchantName],
    ["Till", data.till ?? "—"],
    ["Reference", data.reference ?? "—"],
    ["Contributors", String(data.contributors ?? 0)],
    ["Time", data.time ?? "—"],
  ];

  const cardH = rows.length * rowH;
  const cardY = cursor - cardH;
  const radius = 16; // Corner rounding matching the border layout

  // Draw card background
  page.drawRectangle({
    x: cardX,
    y: cardY,
    width: cardW,
    height: cardH,
    color: rgb(1, 1, 1),
  });

  // Render vector paths for true rounded borders
  // Top left
  page.drawCircle({ x: cardX + radius, y: cardY + cardH - radius, radius, color: rgb(1, 1, 1) });
  // Top right
  page.drawCircle({
    x: cardX + cardW - radius,
    y: cardY + cardH - radius,
    radius,
    color: rgb(1, 1, 1),
  });
  // Bottom left
  page.drawCircle({ x: cardX + radius, y: cardY + radius, radius, color: rgb(1, 1, 1) });
  // Bottom right
  page.drawCircle({ x: cardX + cardW - radius, y: cardY + radius, radius, color: rgb(1, 1, 1) });

  // Draw outer outline border strokes around corners manually to support complete styles
  const borderColor = rgb(0.88, 0.89, 0.91);
  page.drawLine({
    start: { x: cardX + radius, y: cardY + cardH },
    end: { x: cardX + cardW - radius, y: cardY + cardH },
    thickness: 1,
    color: borderColor,
  });
  page.drawLine({
    start: { x: cardX + radius, y: cardY },
    end: { x: cardX + cardW - radius, y: cardY },
    thickness: 1,
    color: borderColor,
  });
  page.drawLine({
    start: { x: cardX, y: cardY + radius },
    end: { x: cardX, y: cardY + cardH - radius },
    thickness: 1,
    color: borderColor,
  });
  page.drawLine({
    start: { x: cardX + cardW, y: cardY + radius },
    end: { x: cardX + cardW, y: cardY + cardH - radius },
    thickness: 1,
    color: borderColor,
  });

  // ==========================================
  // 4. MAP DATA ROWS INSIDE CONTAINER
  // ==========================================
  let currentRowTopY = cardY + cardH;

  for (let i = 0; i < rows.length; i++) {
    const [label, val] = rows[i];
    const textBaseY = currentRowTopY - rowH / 2 - 4;

    // Label styling (Left aligned, muted gray text)
    page.drawText(label, {
      x: cardX + 16,
      y: textBaseY,
      size: 13,
      font: helv,
      color: rgb(0.45, 0.48, 0.52),
    });

    // Content Value alignment (Right aligned, dark typography font)
    const valSize = 13;
    const valWidth = helvBold.widthOfTextAtSize(val, valSize);
    page.drawText(val, {
      x: cardX + cardW - 16 - valWidth,
      y: textBaseY,
      size: valSize,
      font: helvBold,
      color: rgb(0.05, 0.05, 0.05),
    });

    // Light interior horizontal rule row separator dividers
    if (i < rows.length - 1) {
      page.drawLine({
        start: { x: cardX, y: currentRowTopY - rowH },
        end: { x: cardX + cardW, y: currentRowTopY - rowH },
        thickness: 1,
        color: rgb(0.94, 0.95, 0.96),
      });
    }

    currentRowTopY -= rowH;
  }

  // File save compiler engine pipeline mappings
  const pdfBytes = await pdfDoc.save();
  const arrayBuffer = pdfBytes.buffer.slice(
    pdfBytes.byteOffset,
    pdfBytes.byteOffset + pdfBytes.byteLength,
  );
  return new Blob([arrayBuffer as ArrayBuffer], { type: "application/pdf" });
}
