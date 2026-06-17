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
  // 1. SUCCESS CHECKMARK DIAL (VECTOR)
  // ==========================================
  const circleCenterX = width / 2;
  const circleY = cursor - 60;
  const circleRadius = 45;

  page.drawCircle({
    x: circleCenterX,
    y: circleY,
    radius: circleRadius,
    color: rgb(0.29, 0.68, 0.43),
  });

  // Vector checkmark inside the circle
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
  // 2. TYPOGRAPHY LAYER
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

  // Big amount string
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

  // "to merchant" subtitle context
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
  // 3. TRUE ROUNDED DETAILS CARD MAPPING
  // ==========================================
  const cardX = margin;
  const cardW = width - margin * 2;
  const rowH = 48;

  const rows = [
    ["Merchant", data.merchantName],
    ["Till", data.till ?? "—"],
    ["Reference", data.reference ?? "—"],
    ["Contributors", String(data.contributors ?? 0)],
    ["Time", data.time ?? "—"],
  ];

  const cardH = rows.length * rowH;
  const cardY = cursor - cardH;
  const r = 16; // Corner radius matching your UI
  const borderColor = rgb(0.88, 0.89, 0.91);

  // Draw the central white background block body
  page.drawRectangle({
    x: cardX,
    y: cardY,
    width: cardW,
    height: cardH,
    color: rgb(1, 1, 1),
  });

  // Clear out the harsh square corners to prepare for bezier drawing masks
  const clearSquareCorner = (cx: number, cy: number) => {
    page.drawRectangle({ x: cx, y: cy, width: r, height: r, color: rgb(1, 1, 1) });
  };
  clearSquareCorner(cardX, cardY + cardH - r);
  clearSquareCorner(cardX + cardW - r, cardY + cardH - r);
  clearSquareCorner(cardX, cardY);
  clearSquareCorner(cardX + cardW - r, cardY);

  // Smooth out and draw true curved vector corner borders
  // Top-Left Curve
  page.drawBezierCurve({
    start: { x: cardX, y: cardY + cardH - r },
    control1: { x: cardX, y: cardY + cardH },
    control2: { x: cardX + r, y: cardY + cardH },
    end: { x: cardX + r, y: cardY + cardH },
    thickness: 1,
    color: borderColor,
  });
  // Top-Right Curve
  page.drawBezierCurve({
    start: { x: cardX + cardW - r, y: cardY + cardH },
    control1: { x: cardX + cardW, y: cardY + cardH },
    control2: { x: cardX + cardW, y: cardY + cardH - r },
    end: { x: cardX + cardW, y: cardY + cardH - r },
    thickness: 1,
    color: borderColor,
  });
  // Bottom-Right Curve
  page.drawBezierCurve({
    start: { x: cardX + cardW, y: cardY + r },
    control1: { x: cardX + cardW, y: cardY },
    control2: { x: cardX + cardW - r, y: cardY },
    end: { x: cardX + cardW - r, y: cardY },
    thickness: 1,
    color: borderColor,
  });
  // Bottom-Left Curve
  page.drawBezierCurve({
    start: { x: cardX + r, y: cardY },
    control1: { x: cardX, y: cardY },
    control2: { x: cardX, y: cardY + r },
    end: { x: cardX, y: cardY + r },
    thickness: 1,
    color: borderColor,
  });

  // Flat straight boundary outline line rules linking the curves
  page.drawLine({
    start: { x: cardX + r, y: cardY + cardH },
    end: { x: cardX + cardW - r, y: cardY + cardH },
    thickness: 1,
    color: borderColor,
  });
  page.drawLine({
    start: { x: cardX + r, y: cardY },
    end: { x: cardX + cardW - r, y: cardY },
    thickness: 1,
    color: borderColor,
  });
  page.drawLine({
    start: { x: cardX, y: cardY + r },
    end: { x: cardX, y: cardY + cardH - r },
    thickness: 1,
    color: borderColor,
  });
  page.drawLine({
    start: { x: cardX + cardW, y: cardY + r },
    end: { x: cardX + cardW, y: cardY + cardH - r },
    thickness: 1,
    color: borderColor,
  });

  // ==========================================
  // 4. DATA ROW ALIGNMENT EXECUTION
  // ==========================================
  let currentRowTopY = cardY + cardH;

  for (let i = 0; i < rows.length; i++) {
    const [label, val] = rows[i];

    // Precise typography baseline centering offset inside row container
    const textBaseY = currentRowTopY - rowH / 2 - 4;

    // Label alignment (Stays left-aligned at exactly 16px inset padding)
    page.drawText(label, {
      x: cardX + 16,
      y: textBaseY,
      size: 13,
      font: helv,
      color: rgb(0.45, 0.48, 0.52),
    });

    // Content alignment (Calculates width dynamically to snap right at 16px inset padding)
    const valSize = 13;
    const valWidth = helvBold.widthOfTextAtSize(val, valSize);
    page.drawText(val, {
      x: cardX + cardW - 16 - valWidth, // 👈 Perfect alignment bounding rule
      y: textBaseY,
      size: valSize,
      font: helvBold,
      color: rgb(0.05, 0.05, 0.05),
    });

    // Interior structural dividing rules
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

  // Final compile operations
  const pdfBytes = await pdfDoc.save();
  const arrayBuffer = pdfBytes.buffer.slice(
    pdfBytes.byteOffset,
    pdfBytes.byteOffset + pdfBytes.byteLength,
  );
  return new Blob([arrayBuffer as ArrayBuffer], { type: "application/pdf" });
}
