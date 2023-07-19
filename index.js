// 코드에서 사용할 익스프레스 라이브러리를 불러온다.
const express = require("express");
const fs = require("fs");
// 환경변수 읽어오기
require('dotenv').config();

// 익스프레스 앱의 인스턴스를 생성한다.
const app = express();
// HTTP 서버는 3000번을 열고 대기한다.
let PORT = 3000;

// if (!process.env.PORT) {
//     throw new Error("Please specify the port number \n " +
//         "for the HTTP server with the environment variable PORT.")
// }
//
// PORT = process.env.PORT;

app.get("/", (req, res) => {
    res.send("Hello world !");
});

app.get("/video", (req, res) => {
    const path = "D:\\bootstrapping-microservices\\my-new-project\\vidoes\\pexels-thirdman-5538137 (1080p).mp4"
    fs.stat(path, (err, stats) => {
        if (err) {
            console.error("An error occurred.");
            res.sendStatus(400);
            return;
        }

        res.writeHead(200, {
            "Content-Length": stats.size,
            "Content-Type": "video/mp4"
        });
        fs.createReadStream(path).pipe(res);
    })
});

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
});
