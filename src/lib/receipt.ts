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

  // Explicit mobile viewport proportions (Tall card canvas)
  const page = pdfDoc.addPage([420, 740]); // 💡 Slightly taller canvas to allow comfortable spacing
  const { width, height } = page.getSize();

  const helv = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helvBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const margin = 28;
  let cursor = height - margin;

  // ==========================================
  // 1. SUCCESS CHECKMARK DIAL (VECTOR)
  // ==========================================
  const circleCenterX = width / 2;
  const circleY = cursor - 65; // 💡 Positioned clean from the top margin
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

  // 🚨 THE CRITICAL FIX: Push the cursor down significantly further past the edge of the circle
  // Circle center is at circleY, bottom edge is at (circleY - circleRadius) -> 65px lower than that provides perfect clearance.
  cursor = circleY - circleRadius - 55;

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
  cursor -= titleSize + 12; // 💡 More breathing room between title and status

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
  cursor -= 45; // 💡 Clean offset separation before drawing the large currency amount

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
  cursor -= amountSize + 10;

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
  cursor -= toSize + 40; // 💡 Ensures a crisp, empty block before table box start

  // ==========================================
  // 3. SEAMLESS ROUNDED DETAILS CARD
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
  const r = 16;
  const borderColor = rgb(0.88, 0.89, 0.91);

  // Background fills
  page.drawRectangle({
    x: cardX + r,
    y: cardY,
    width: cardW - r * 2,
    height: cardH,
    color: rgb(1, 1, 1),
  });
  page.drawRectangle({
    x: cardX,
    y: cardY + r,
    width: cardW,
    height: cardH - r * 2,
    color: rgb(1, 1, 1),
  });
  page.drawCircle({ x: cardX + r, y: cardY + r, radius: r, color: rgb(1, 1, 1) });
  page.drawCircle({ x: cardX + cardW - r, y: cardY + r, radius: r, color: rgb(1, 1, 1) });
  page.drawCircle({ x: cardX + r, y: cardY + cardH - r, radius: r, color: rgb(1, 1, 1) });
  page.drawCircle({ x: cardX + cardW - r, y: cardY + cardH - r, radius: r, color: rgb(1, 1, 1) });

  const x0 = cardX.toFixed(1);
  const x1 = (cardX + r).toFixed(1);
  const x2 = (cardX + cardW - r).toFixed(1);
  const x3 = (cardX + cardW).toFixed(1);

  const y0 = cardY.toFixed(1);
  const y1 = (cardY + r).toFixed(1);
  const y2 = (cardY + cardH - r).toFixed(1);
  const y3 = (cardY + cardH).toFixed(1);

  const borderPath = `M ${x1} ${y0} L ${x2} ${y0} A ${r} ${r} 0 0 0 ${x3} ${y1} L ${x3} ${y2} A ${r} ${r} 0 0 0 ${x2} ${y3} L ${x1} ${y3} A ${r} ${r} 0 0 0 ${x0} ${y2} L ${x0} ${y1} A ${r} ${r} 0 0 0 ${x1} ${y0} Z`;

  page.drawSvgPath(borderPath, {
    x: 0,
    y: 0,
    borderColor: borderColor,
    borderWidth: 1,
  });

  // ==========================================
  // 4. DATA ROW ALIGNMENT EXECUTION
  // ==========================================
  let currentRowTopY = cardY + cardH;

  for (let i = 0; i < rows.length; i++) {
    const [label, val] = rows[i];
    const textBaseY = currentRowTopY - rowH / 2 - 4;

    page.drawText(label, {
      x: cardX + 16,
      y: textBaseY,
      size: 13,
      font: helv,
      color: rgb(0.45, 0.48, 0.52),
    });

    const valSize = 13;
    const valWidth = helvBold.widthOfTextAtSize(val, valSize);
    page.drawText(val, {
      x: cardX + cardW - 16 - valWidth,
      y: textBaseY,
      size: valSize,
      font: helvBold,
      color: rgb(0.05, 0.05, 0.05),
    });

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

  const pdfBytes = await pdfDoc.save();
  const arrayBuffer = pdfBytes.buffer.slice(
    pdfBytes.byteOffset,
    pdfBytes.byteOffset + pdfBytes.byteLength,
  );
  return new Blob([arrayBuffer as ArrayBuffer], { type: "application/pdf" });
}
