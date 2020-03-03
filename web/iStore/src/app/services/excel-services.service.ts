import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Injectable({
  providedIn: 'root'
})
export class ExcelServicesService {
  constructor() { }
  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
    let headerRow = worksheet.getRow(1);
    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFF00' },
        bgColor: { argb: 'FF0000FF' }
      }
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    })
    worksheet.getColumn(1).width = 30;
    worksheet.getColumn(2).width = 13;
    worksheet.getColumn(3).width = 18;
    worksheet.getColumn(4).width = 10;
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
     const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
     FileSaver.saveAs(data, fileName + '_export_' + new  Date().getTime() + EXCEL_EXTENSION);
  }
  
  
  // public exportAsExcelFile(json: any[], excelFileName: string, headersArray: any[]): void {
  //   //Excel Title, Header, Data
  //   const header = headersArray;
  //   const data = json;
  //   //Create workbook and worksheet
  //   let workbook = new Workbook();
  //   let worksheet = workbook.addWorksheet(excelFileName);
  //   //Add Header Row
  //   let headerRow = worksheet.addRow(header);
  //   // Cell Style : Fill and Border
  //   headerRow.eachCell((cell, number) => {
  //     cell.fill = {
  //       type: 'pattern',
  //       pattern: 'solid',
  //       fgColor: { argb: 'FFFFFF00' },
  //       bgColor: { argb: 'FF0000FF' }
  //     }
  //     cell.font = { name: 'Calibri', family: 4, size: 15, bold: true, strike: false };
  //     cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
  //   })
  //   // Add Data and Conditional Formatting
  //   data.forEach((element) => {
  //     let eachRow = [];
  //     headersArray.forEach((headers) => {
  //       eachRow.push(element[headers])
  //     })
  //     if (element.isDeleted === "Y") {
  //       let deletedRow = worksheet.addRow(eachRow);
  //       deletedRow.eachCell((cell, number) => {
  //         cell.font = { name: 'Calibri', family: 4, size: 11, bold: false, strike: true };
  //       })
  //     } else {
  //       worksheet.addRow(eachRow);
  //     }
  //   })
  //   worksheet.getColumn(1).width = 30;
  //   worksheet.getColumn(2).width = 17;
  //   worksheet.getColumn(3).width = 28;
  //   worksheet.getColumn(4).width = 14;
  //   worksheet.addRow([]);
  //   //Generate Excel File with given name
  //   workbook.xlsx.writeBuffer().then((data) => {
  //     let blob = new Blob([data], { type: EXCEL_TYPE });
  //     FileSaver.saveAs(blob, excelFileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  //   })
  // }
}
