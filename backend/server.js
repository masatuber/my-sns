//http://localhost:3000/
const express = require("express");
const app = express( );
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const uploadRoute = require("./routes/upload");
const PORT = 3000;
const mongoose = require("mongoose");
require("dotenv").config( );
const cors = require('cors');
app.use(cors());

//データベース接続にenvファイルにDBURL格納しgit管理下にしない
mongoose
    .connect(process.env.MONGOURL)
    .then( ( ) =>{
        console.log("DBに接続中・・・");
    } )
    .catch( ( err ) => {
        console.log(err);
    } );

//ミドルウェアにエンドポイントルーティング設定記述する。express.json()はJSON形式を指定
app.use(express.json());

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/upload", uploadRoute);
// app.get( "/", (req, res) => {
//     res.send("hello express");
// });

app.listen( PORT, () => console.log("サーバーが起動しました。"));
