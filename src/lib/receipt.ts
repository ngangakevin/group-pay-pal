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
  const page = pdfDoc.addPage([400, 520]);
  const { width, height } = page.getSize();

  const helv = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helvBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const margin = 28;
  let y = height - margin;

  type DrawOptions = { bold?: boolean };

  const drawText = (text: string, size = 12, options: DrawOptions = {}) => {
    page.drawText(text, {
      x: margin,
      y,
      size,
      font: options.bold ? helvBold : helv,
      color: rgb(0, 0, 0),
    });
    y -= size + 6;
  };

  drawText("Pagamos — Receipt", 16, { bold: true });
  y -= 6;

  drawText(`Merchant: ${data.merchantName}`, 12);
  if (data.till) drawText(`Till: ${data.till}`, 12);
  drawText(`Amount: ${data.currency ?? ""} ${Number(data.amount).toFixed(2)}`, 12);
  drawText(`Reference: ${data.reference ?? "—"}`, 12);
  drawText(`Contributors: ${data.contributors ?? 0}`, 12);
  drawText(`Time: ${data.time ?? new Date().toLocaleString()}`, 10);

  // Footer
  y = margin + 30;
  page.drawLine({
    start: { x: margin, y },
    end: { x: width - margin, y },
    thickness: 0.5,
    color: rgb(0.6, 0.6, 0.6),
  });
  y -= 18;
  page.drawText("Thank you for using Pagamos.", {
    x: margin,
    y,
    size: 10,
    font: helv,
    color: rgb(0.2, 0.2, 0.2),
  });

  const pdfBytes = await pdfDoc.save();
  // pdfBytes is a Uint8Array; convert to ArrayBuffer slice to satisfy Blob typing
  const arrayBuffer = pdfBytes.buffer.slice(
    pdfBytes.byteOffset,
    pdfBytes.byteOffset + pdfBytes.byteLength,
  );
  return new Blob([arrayBuffer as ArrayBuffer], { type: "application/pdf" });
}
