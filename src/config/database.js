const  mongoose  = require("mongoose");

const connectDB = async ()=>{
    await mongoose.connect(process.env.DB_CONNECTION_SECRET)
}

// mongoose.connect("mongodb+srv://mdebashish543:HhIfe1ymlCk9fVlo@debashishnodejs.tcvwr.mongodb.net/")

module.exports = connectDB;

