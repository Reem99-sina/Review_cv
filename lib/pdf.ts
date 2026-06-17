import PDFParser from "pdf2json";

export function extractText(buffer: Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    const pdfParser = new (PDFParser as any)(null, true);

    pdfParser.on("pdfParser_dataError", (err: any) => {
      reject(err.parserError);
    });

    pdfParser.on("pdfParser_dataReady", (pdfData: any) => {
      try {
        let text = "";

        pdfData.Pages.forEach((page: any) => {
          page.Texts.forEach((textItem: any) => {
            text += decodeURIComponent(textItem.R[0].T) + " ";
          });

          text += "\n";
        });

        resolve(text);
      } catch (e) {
        reject(e);
      }
    });

    pdfParser.parseBuffer(buffer);
  });
}