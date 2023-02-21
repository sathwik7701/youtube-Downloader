const express = require("express");
const excelJs = require("exceljs");
var fs = require("fs");

const app = express();

const PORT = 4000;

app.get("/", async (req, res) => {
  try {
    let workbook = new excelJs.Workbook();
    workbook.creator = "Dinuwan";
    const sheet = workbook.addWorksheet("Export");
    var obj = JSON.parse(fs.readFileSync("data.json", "utf8"));
    sheet.columns = [
      { header: "Id", key: "id", width: 10 },
      { header: "Name", key: "name", width: 32 },
      { header: "D.O.B.", key: "DOB", width: 10, outlineLevel: 1 },
    ];

    await obj.data.map((val, idx) => {
      sheet.addRow({ id: val.id, name: val.name, DOB: val.age });
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment;filename=" + "exportData.xlsx"
    );
    workbook.xlsx.write(res);
  } catch (error) {
    console.error(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server Running on PORT : ${PORT} `);
});
