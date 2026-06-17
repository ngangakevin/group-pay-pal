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
  // Mobile-ish tall page
  const page = pdfDoc.addPage([420, 760]);
  const { width, height } = page.getSize();

  const helv = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helvBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const margin = 28;
  let cursor = height - margin;

  // Draw success circle with check
  const circleCenterX = width / 2;
  const circleY = cursor - 36;
  const outerR = 60;
  // outer pale ring (use ellipse)
  page.drawEllipse({
    x: circleCenterX,
    y: circleY,
    xScale: outerR + 18,
    yScale: outerR + 18,
    color: rgb(0.92, 0.98, 0.96),
  });
  // inner green circle
  page.drawEllipse({
    x: circleCenterX,
    y: circleY,
    xScale: outerR,
    yScale: outerR,
    color: rgb(0.0, 0.66, 0.36),
  });
  // checkmark using a glyph
  const checkSize = 42;
  const checkText = "✓";
  const checkWidth = helvBold.widthOfTextAtSize(checkText, checkSize);
  page.drawText(checkText, {
    x: circleCenterX - checkWidth / 2,
    y: circleY - checkSize / 3,
    size: checkSize,
    font: helvBold,
    color: rgb(1, 1, 1),
  });

  cursor = circleY - outerR - 10;

  // Title
  const title = "Merchant paid";
  const titleSize = 18;
  const titleWidth = helvBold.widthOfTextAtSize(title, titleSize);
  page.drawText(title, {
    x: (width - titleWidth) / 2,
    y: cursor,
    size: titleSize,
    font: helvBold,
    color: rgb(0, 0, 0),
  });
  cursor -= titleSize + 6;

  // subtitle
  const subtitle = "Settlement successful";
  const subSize = 10;
  const subWidth = helv.widthOfTextAtSize(subtitle, subSize);
  page.drawText(subtitle, {
    x: (width - subWidth) / 2,
    y: cursor,
    size: subSize,
    font: helv,
    color: rgb(0.45, 0.48, 0.52),
  });
  cursor -= 24;

  // Amount big red
  const amountText = `${data.currency ?? ""} ${Number(data.amount).toLocaleString(undefined, { minimumFractionDigits: 0 })}`;
  const amountSize = 34;
  const amountWidth = helvBold.widthOfTextAtSize(amountText, amountSize);
  page.drawText(amountText, {
    x: (width - amountWidth) / 2,
    y: cursor,
    size: amountSize,
    font: helvBold,
    color: rgb(0.85, 0.09, 0.12),
  });
  cursor -= amountSize + 6;

  // to merchant small
  const toText = `to ${data.merchantName}`;
  const toSize = 10;
  const toWidth = helv.widthOfTextAtSize(toText, toSize);
  page.drawText(toText, {
    x: (width - toWidth) / 2,
    y: cursor,
    size: toSize,
    font: helv,
    color: rgb(0.45, 0.48, 0.52),
  });
  cursor -= toSize + 20;

  // Details rounded card
  const cardX = margin;
  const cardW = width - margin * 2;
  const rowH = 36;
  const rows = [
    ["Merchant", data.merchantName],
    ["Till", data.till ?? "—"],
    ["Reference", data.reference ?? "—"],
    ["Contributors", String(data.contributors ?? 0)],
    ["Time", data.time ?? new Date().toLocaleString()],
  ];
  const cardH = rows.length * rowH + 16;
  const cardY = cursor - cardH;

  // Card background and border (rounded)
  // Draw card background (rounded corners not directly supported; draw rectangle with a subtle border)
  page.drawRectangle({
    x: cardX,
    y: cardY,
    width: cardW,
    height: cardH,
    color: rgb(1, 1, 1),
  });
  // border: draw slightly inset rectangle stroke
  page.drawRectangle({
    x: cardX + 0.4,
    y: cardY + 0.4,
    width: cardW - 0.8,
    height: cardH - 0.8,
    borderWidth: 0.8,
    borderColor: rgb(0.88, 0.88, 0.9),
    color: undefined,
  });

  // Draw rows
  let ry = cardY + cardH - 12 - rowH + 6;
  for (let i = 0; i < rows.length; i++) {
    const [k, v] = rows[i];
    // label
    page.drawText(k, {
      x: cardX + 12,
      y: ry + 10,
      size: 10,
      font: helv,
      color: rgb(0.45, 0.48, 0.52),
    });
    // value right-aligned
    const valSize = k === "Time" ? 10 : 12;
    const fontToUse = k === "Time" ? helvBold : helvBold;
    const valWidth = fontToUse.widthOfTextAtSize(v, valSize);
    page.drawText(v, {
      x: cardX + cardW - 12 - valWidth,
      y: ry + 8,
      size: valSize,
      font: fontToUse,
      color: rgb(0, 0, 0),
    });

    // separator line
    if (i < rows.length - 1) {
      const lineY = ry - 6;
      page.drawLine({
        start: { x: cardX + 8, y: lineY },
        end: { x: cardX + cardW - 8, y: lineY },
        thickness: 0.5,
        color: rgb(0.92, 0.92, 0.94),
      });
    }

    ry -= rowH;
  }

  // Footer small thank you
  const footerY = cardY - 20;
  page.drawText("Thank you for using Pagamos.", {
    x: margin,
    y: footerY,
    size: 10,
    font: helv,
    color: rgb(0.4, 0.4, 0.4),
  });

  cursor = footerY - 24;

  const pdfBytes = await pdfDoc.save();
  const arrayBuffer = pdfBytes.buffer.slice(
    pdfBytes.byteOffset,
    pdfBytes.byteOffset + pdfBytes.byteLength,
  );
  return new Blob([arrayBuffer as ArrayBuffer], { type: "application/pdf" });
}
