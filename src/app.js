const express = require("express");

const app = express();

app.use("/",(req,res)=>{
    res.send("hello from the home pages")
})

app.use("/data",(req,res)=>{
    res.send("hello from the data")
})

app.use("/test",(req,res)=>{
    res.send("hello from the server for test")
})


app.listen(2001,()=>{console.log("server is sucssesful runing on 2001")})