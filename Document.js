import fs from "fs";
import path from "path";

import __dirname from "./commons.js";

const INDEX_PART2 = path.join(__dirname, "index_part2.html");
const INDEX_PART2_BASIC = path.join(__dirname, "index_part2_basic.html");

class Document {
    constructor() {
        this.staticParts = this.divide(this.readIndex());
        this.text = "Paste here a lyrics"
        this.images = "Here will be placed generated images";
    }

    divide(index) {
        let parts = ["", "", ""];

        const textStart = "<textarea id=\"lyrics\" name=\"lyrics\" rows=\"100\" cols=\"100\">"
        let textIdx = index.indexOf(textStart, 1000) + textStart.length;
        parts[0] = index.slice(0, textIdx);

        const imgStart = "<div class=\"scrolls\">";
        let imgIdx = index.indexOf(imgStart, textIdx) + imgStart.length;
        parts[1] = index.slice(textIdx, imgIdx) + imgIdx;

        parts[2] = index.slice(imgIdx);
        return parts;
    }

    readIndex() {
        // let index_name = INDEX_PART2;
        // try {
        //     if (!fs.existsSync(index_name)) {
        //         index_name = INDEX_PART2_BASIC
        //     }
        // } catch (err) {
        //     console.log(err);
        //     index_name = INDEX_PART2_BASIC
        // }
        // try {
            return fs.readFileSync(INDEX_PART2_BASIC, 'utf8');
        // } catch (err) {
        //     console.log("Error: ", err);
        // }

    }

    saveIndex() {
        fs.writeFile(INDEX_PART2, this.toString(), err => {
            if (err) console.log(err);
        });
    }

    toString() {
        return this.staticParts[0] + this.text +
            this.staticParts[1] + this.images +
            this.staticParts[2];
    }
}