import app from "./app.js";
import getImages from "./imageGenerator.js";
import backup from "./backup.js";
import fs from "fs";

// app.use('/', (req, res, next) => {
//     const backupPromise = new Promise((resolve) => {
//         // backup.saveInput(resolve, req.query["lyrics"]);
//     })
//     backupPromise.then(() => {
//         next();
//     })
// });

app.get('/', (req, res) => {
    if (req.query["delete"] === "true") {
        try {
            fs.unlinkSync("./index_part2.html");
        } catch (e) {
            console.log(e);
        }
    }

    let index = backup.useBackup(req.query["lyrics"]);

    if (req.query["generate"] === "true") {
        setTimeout(() => {
            getImages(req.query["lyrics"], index);
        }, 100);
    }
    res.send(index);
});