import runApp from "./app.js";
import backup from "./backup.js";

const app = runApp();

app.use('/', (req, res, next) => {
    const backupPromise = new Promise((resolve) => {
        backup.saveInput(resolve, req);
    })
    backupPromise.then(() => {
        next();
    })
});

app.get('/', (req, res) => {
    let index = backup.useBackup();
    res.send(index);
});