import fs from "fs"
import path from "path";

import __dirname from "./commons.js";

const INDEX_PART2 = path.join(__dirname, "index_part2.html");
const INDEX_PART2_BASIC = path.join(__dirname, "index_part2_basic.html");


function saveInput(resolve, lyrics) {
    if (lyrics === undefined || lyrics === "") {
        resolve();
        return;
    }
    fs.writeFile(INDEX_PART2, lyrics, err => {
        resolve();
        if (err) console.log(err);
    });
}

function saveIndex(index) {
    fs.writeFile(INDEX_PART2, index, err => {
        if (err) console.log(err);
    });
}

function useBackup(lyrics) {
    let index_name = INDEX_PART2;
    try {
        if (!fs.existsSync(index_name)) {
            index_name = INDEX_PART2_BASIC
        }
    } catch (err) {
        console.log(err);
        index_name = INDEX_PART2_BASIC
    }
    try {
        if (lyrics === undefined) lyrics = "";
        const index = fs.readFileSync(index_name, 'utf8');
        return index.replace("Paste here a lyrics", lyrics);
    } catch (err) {
        console.log("Error: ", err);
    }

}

export default {
    saveInput,
    useBackup,
    saveIndex,
};