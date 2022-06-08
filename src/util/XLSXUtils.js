import XLSX from "xlsx";

/**
 * 创建一个worksheet,创建过程中设置表头
 * @param array
 * @param fields
 * @param titles
 * @returns {WorkSheet}
 */
const createWs = (array, fields, titles) => {
    const ws = XLSX.utils.json_to_sheet(array, {
        header: fields
    })
    const range = XLSX.utils.decode_range(ws['!ref'])
    for (let c = range.s.c; c <= range.e.c; c++) {
        const header = `${XLSX.utils.encode_col(c)}1`
        ws[header].v = titles[ws[header].v]
    }

    return ws
}

/**
 * 根据js object array创建一个workSheet，并导出为excel
 */
const exportExcelFile = (arrayObj, sheetName = 'sheet', fileName = 'excel示例.xlsx') => {
    const jsonWorkSheet = XLSX.utils.json_to_sheet(arrayObj);
    const workBook = {
        SheetNames: [sheetName],
        Sheets: {
            [sheetName]: jsonWorkSheet,
        }
    };
    return XLSX.writeFile(workBook, fileName);
}

/**
 * 自定义表头
 * @param arrayObj
 * @param sheetName
 * @param fileName
 */
const exportExcelFileAndCustomTitle = (arrayObj, sheetName = 'sheet', fileName = '自定义title.xlsx') => {
    const titles = {
        serialNumber: '序号',
        failReason: '错误类型',
        accountName: '账户名称',
        bankName: '开户银行',
        accountNo: '银行账号',
        accumulatedAmount: '累计限额'
    }
    const fields = Object.keys(titles)
    const tempArray = arrayObj.map((item, index) => ({
        serialNumber: index,
        failReason: item.failReason,
        accountName: item.accountName,
        bankName: item.bankName,
        accountNo: item.accountNo,
        accumulatedAmount: item.accumulatedAmount
    }))
    const jsonWorkSheet = createWs(tempArray, fields, titles)
    const workBook = {
        SheetNames: [sheetName],
        Sheets: {
            [sheetName]: jsonWorkSheet,
        }
    };
    return XLSX.writeFile(workBook, fileName);
}

export {
    createWs,
    exportExcelFile,
    exportExcelFileAndCustomTitle,
}
