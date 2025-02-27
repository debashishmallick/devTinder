const express = require("express");

const app = express();

// app.use("/data",(req,res)=>{
//     res.send("hello from the data")
// })

app.get(
  "/user",
  [(req, res,next) => {
    console.log("handel 1st routing");
    // res.send("response");
    next()
  },
  (req, res,next) => {
    console.log("handel 2nd routing");
    // res.send("2nd response");
    next()
  },
  (req, res,next) => {
    console.log("handel 3rd routing");
    // res.send("3rd response");
    next()
  },
  (req, res,next) => {
    console.log("handel 4th routing");
    // res.send("4th response");
    next()
  },
  (req, res,next) => {
    console.log("handel 5th routing");
    res.send("5th response");
    
  },]
);

// app.post("/user",(req,res)=>{
//     res.send("data susscessfully save in DB")
// })

// app.delete("/user",(req,res)=>{
//     res.send("delete susscessfully in DB")
// })

// app.use("/test",(req,res)=>{
//     res.send("hello from the server for test")
// })

app.listen(2001, () => {
  console.log("server is sucssesful runing on 2001");
});
