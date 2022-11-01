import fs from "fs"
import path from "path";

import __dirname from "./commons.js";

const BACKUP_DIR = path.join(__dirname + "recourses/backup.txt");

function saveInput(resolve, req) {
    const lyrics = req.query["lyrics"];
    if (lyrics === undefined || lyrics === "") {
        resolve();
        return;
    }
    fs.writeFile(BACKUP_DIR, lyrics, err => {
        resolve();
        if (err) console.log(err);
    });
}

function useBackup() {
    try {
        const backup = fs.readFileSync(BACKUP_DIR, 'utf-8');
        let rawPage = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
        return rawPage.replace("Paste here a lyrics", backup);
    } catch (err) {
        console.log("Error: ", err);
    }

}

export default {
    saveInput,
    useBackup
};