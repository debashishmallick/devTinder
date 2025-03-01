const  mongoose  = require("mongoose");

const connectDB = async ()=>{
    await mongoose.connect("mongodb+srv://mdebashish543:HhIfe1ymlCk9fVlo@debashishnodejs.tcvwr.mongodb.net/devTinder")
}

// mongoose.connect("mongodb+srv://mdebashish543:HhIfe1ymlCk9fVlo@debashishnodejs.tcvwr.mongodb.net/")

module.exports = connectDB;

