const ExcelJS = require('exceljs');
const { test } = require('playwright/test');

async function writeExcelTest(searchText, replaceText, change, filePath) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');
    const output = await readExcel(worksheet, searchText);

    const cell = worksheet.getCell(output.row, output.column + change.colChange);
    cell.value = replaceText;
    await workbook.xlsx.writeFile(filePath);
}

async function readExcel(worksheet, searchText) {

    let output = { row: -1, column: -1 };
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {

            if (cell.value === searchText) {
                output.row = rowNumber;
                output.column = colNumber;

            }
        });
    });
    return output;
}

test('Upload download excel validation', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download' }).click();
    // await downloadPromise;

    const download = await downloadPromise;

    // Get the actual downloaded file path
    const downloadPath = await download.path();
    console.log("Downloaded file path:", downloadPath);

    // writeExcelTest("Mango", 350, { rowChange: 0, colChange: 2 }, "/Users/dierokreator/Downloads/download.xlsx");
    // await page.locator("#fileinput").click();
    // await page.locator("#fileinput").setInputFiles("/Users/dierokreator/Downloads/download.xlsx");

    /* If you want to save the downloaded file in a specific location, you can explicitly save it: */
    // const suggestedPath = path.join(__dirname, 'download.xlsx');
    // await download.saveAs(suggestedPath);

    // Modify the Excel file
    writeExcelTest("Mango", 350, { rowChange: 0, colChange: 2 }, downloadPath);

    // Upload it back
    await page.locator("#fileinput").setInputFiles(downloadPath);
});
