import express from "express"
import http from "http";

function runApp() {
    const app = express();
    const server = http.createServer(app);

    server.listen(3000, () => {
        console.log('listening on http://%s:%s',"localhost", 3000);
    });
    return app
}

export default runApp;