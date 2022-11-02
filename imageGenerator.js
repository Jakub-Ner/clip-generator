import Replicate from 'replicate-js'

import TOKEN from "./secrets.js"
import backup from './backup.js'

function split(lyrics) {
    let lines = [];
    let word = "";
    for (const letter of lyrics)
        if (letter === '\n' || letter === '\r') {
            if (word === "") continue;
            lines.push(word);
            word = "";
        } else {
            word += letter;
        }
    if (word.length > 0)
        lines.push(word);
    return lines;
}

function createTag(prompt, url) {
    return `<img src="${url}" class="genImg"/> <p><i>"${prompt}"</i></p>`
}

function insert(baseStr, idx, newLine) {
    return baseStr.slice(0, idx) + newLine + baseStr.slice(idx);
}

async function getImages(lyrics, index) {
    if (index.indexOf("<!-- SEMAPHORE -->", 1800) !== -1)
        return;
    index = index.replace("<p>Here will be placed generated images</p>", "<!-- SEMAPHORE -->");
    let tagPlace = index.indexOf("<!-- place for imgs -->", 1900);

    for await (const {prompt, url} of generateImages(lyrics)) {
        const newLine = createTag(prompt, url);
        index = insert(index, tagPlace, newLine);
        tagPlace += newLine.length;
        backup.saveIndex(index);
        console.log(newLine)
    }
}

async function* generateImages(lyrics) {
    if (lyrics.length === 0) return;
    try {
        const replicate = new Replicate({token: TOKEN});
        const model = await replicate.models.get('stability-ai/stable-diffusion');
        const lines = split(lyrics);
        for (const line of lines) {
            const imageURL = await model.predict({prompt: line});
            // const imageURL = "http://www.telekarma.pl/userfiles/images/aktualnosci/305464337-760x500.jpg"; // for testing
            yield {
                prompt: line,
                url: imageURL
            };
        }
    } catch (e) {
        console.log("unable to connect to model " + e);
    }
}


export default getImages;
