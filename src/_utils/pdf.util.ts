import * as PDFDocument from 'pdfkit';
import * as fs from 'fs';
import { Demand } from 'src/api/demand/entity/demand.entity';

const totalDocWith = 615;
const totalDocHeight = 795;

const startPosXPage = 50;
const endPosXPage = 550;
const startPosYPage = 50;
const endPosYPage = 700;
const posYAddition = 28;

export const buildDemandPDFDoc = (pathFile: string, data: Demand): Promise<boolean> => {
    return new Promise((resolve, reject) => {        
        let writeStream = fs.createWriteStream(`${pathFile}`);         
        let doc = new PDFDocument();

        // Write document with entity
        writeDemandPdfContent(doc, data);

        doc.pipe(writeStream);

        finishPDFDocument(doc);
        writeStream.on('finish', function (err: Error) {
            if(err)
                reject(err);
            else
                resolve(true);
        });
    });
}

export const finishPDFDocument = (doc: typeof PDFDocument) => {
    doc.end();
}

export const validateAdditionPage = (doc: typeof PDFDocument, posY: number): number => {
    if(posY >= endPosYPage) {
        addPDFPage(doc);
        posY = startPosYPage;
    }
    return posY;
}

export const addPDFPage = (doc: typeof PDFDocument) => {
    doc.addPage();
}

export const writeBoldPDFDoc = (
    doc: typeof PDFDocument, 
    value: string, 
    posX: number, 
    posY: number,
    fonSize: number = 15,
    color: string = 'black') => {
    doc.font('Helvetica-Bold')
    .fillColor(color)
    .fontSize(fonSize)
    .text(value, posX, posY);
}

export const writePDFDoc = (
    doc: typeof PDFDocument, 
    value: string, 
    posX: number, 
    posY: number,
    fonSize: number = 15,
    color: string = 'black') => {
    doc.font('Helvetica')
    .fillColor(color)
    .fontSize(fonSize)
    .text(value, posX, posY);
}

export const writeLinePDFDoc = (
    doc: typeof PDFDocument,
    posY: number) => {
    doc.save()
    .moveTo(10, posY)
    .lineTo(550, posY)
    .fill('#000000');
}

export const writeImagePDFDoc = (
    doc: typeof PDFDocument, 
    pathImage: string,
    posX: number, 
    posY: number,
    fitW: number,
    fitH: number = fitW) => {
    doc.image(pathImage, posX, posY, {fit: [fitW, fitH], align: 'center', valign: 'center'});
}

export const writeDemandPdfContent = (doc: typeof PDFDocument, data: Demand): void => {
    let posY = startPosYPage;
    posY = writeDemand(doc, posY, data);    
}

export const writeDemand = (doc: typeof PDFDocument, posY: number, data: Demand) => {
    writeTitle(doc, 'CINTALAST', (totalDocWith / 2) - 90, posY);
    posY += posYAddition;
    writeTitle(doc, 'SOLICITUD EN TELARES', startPosXPage + 80, posY);
    posY += posYAddition;
    writeNormal(doc, `${data.date_created?.getFullYear()}-${data.date_created?.getMonth()}-${data.date_created?.getDate()}  ${data.date_created?.getHours()}-${data.date_created?.getMinutes()}-${data.date_created?.getMilliseconds()}`, startPosXPage, posY);
    posY += (posYAddition * 2);
    writeTitle(doc, 'TIPO', startPosXPage, posY);
    posY += posYAddition;
    writeNormal(doc, data.error_detail?.type?.name, startPosXPage, posY);
    posY += (posYAddition * 2);
    writeTitle(doc, 'DETALLE', startPosXPage, posY);
    posY += posYAddition;
    writeDetail(doc, data, posY);
    posY += (posYAddition * 2);
    writeTitle(doc, 'TELAR', startPosXPage, posY);
    posY += posYAddition;
    writeNormal(doc, data.loom, startPosXPage, posY);
    posY += (posYAddition);
    return posY;
}

export const writeDetail = (doc: typeof PDFDocument, data: Demand, posY: number) => {
    if(data.error_detail?.type?.cod === 'MECHA' || data.error_detail?.type?.cod === 'BOXES'){
        writeNormal(doc, data.error_detail?.name, startPosXPage, posY);
    } else if(data.error_detail?.type?.cod === 'WARP'){
        writeNormal(doc, 'Código urdiembre:', startPosXPage, posY);
        writeNormal(doc, data.warp, startPosXPage + 240, posY);
    } else if(data.error_detail?.type?.cod === 'WEFT'){
        writeNormal(doc, 'Cantidad:', startPosXPage, posY);
        writeNormal(doc, data.weft_quantity.toString(), startPosXPage + 120, posY);
    }
}

export const writeTitle = (doc: typeof PDFDocument, value: string, posX: number, posY: number) => {
    writeBoldPDFDoc(doc, value, posX, posY, 33, 'black');
}

export const writeNormal = (doc: typeof PDFDocument, value: string, posX: number, posY: number) => {
    writePDFDoc(doc, value, posX, posY, 27, 'black');
}

