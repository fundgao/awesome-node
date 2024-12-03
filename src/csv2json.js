const fs = require("fs");
const csv = require("csv-parser");

const csvfilePath = "./新增UID.csv";
const uidsfilePath = "./uids.json";
const results = [];
let newarr = [];

fs.createReadStream(csvfilePath)
  .pipe(csv({ headers: true }))
  .on("data", (data) => {
    results.push(data);
  })
  .on("end", async () => {
    await format(results);
    fs.writeFile(uidsfilePath, JSON.stringify(newarr), () => {
      console.log("done");
    });
  });

const format = (results) => {
  newarr = results.map((item) => {
    if (item._0 === "key" || item._1 === "value") {
      return {};
    }
    return {
      label: `${item._1}-${item._0}`,
      value: item._1,
    };
  });
};
