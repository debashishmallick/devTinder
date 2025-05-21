const { default: mongoose } = require("mongoose");
const mangoose = require("mongoose");


const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
},{
    timestamps: true,
});


const chartSchema = new mangoose.Schema({
  participants: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  ],
  messages:[messageSchema],
});

module.exports = mangoose.model("Chart", chartSchema);
