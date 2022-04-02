import * as XLSX from 'xlsx/xlsx.mjs';
import userDataConverter from './userDataConverter';

export default ({inputData, sheetName, clientsQuantity}) => {
  const data = userDataConverter(inputData)

  const tableCreator = (dataTable, tableOrder) => {
    const tableName = tableOrder ? `${sheetName} ${tableOrder}` : sheetName

    const workbook = XLSX.utils.book_new()

    workbook.Props = {
      Title: 'Clients',
      Subject: 'Clients',
      CreatedDate: new Date(),
    }

    workbook.SheetNames.push(tableName)

    const newSheet = XLSX.utils.aoa_to_sheet(dataTable);

    newSheet.A1.v = 'Имя';
    newSheet.B1.v = 'Телефон';

    workbook.Sheets[tableName] = newSheet

    XLSX.writeFile(workbook, `${tableName}.xlsx`);
  }

  if (clientsQuantity && clientsQuantity > 1) {
    let counter = 0
    let tableOrder = 1
    let dataTable = [['', '']]
    for (let i = 0; i < data.length; i++) {
      if (counter < clientsQuantity) {
        dataTable.push(data[i])
        counter++
      } else {
        tableCreator(dataTable, tableOrder)
        dataTable = [['', '']]
        counter = 0
        dataTable.push(data[i])
        tableOrder++
        counter++
      }
    }

    if (dataTable.length) {
      tableCreator(dataTable, tableOrder)
    }
  } else {
    tableCreator([['', ''], ...data])
  }
}
