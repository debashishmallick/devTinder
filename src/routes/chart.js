const express = require("express");
const { userAuth } = require("../middleware/auth");
const Chart = require("../models/chart");
// const User = require("../models/user");
const chartRouter = express.Router();

chartRouter.get("/chart/:targetUserId",userAuth,async(req,res)=>{
    const { targetUserId } = req.params;
    const userId = req.user._id;
    try {
        

        let chart = await Chart.findOne({
            participants: { $all: [userId, targetUserId] },
        }).populate({path:"messages.senderId",select:"firstName lastName photoUrl"});
        if(!chart){
            chart = new Chart({
                participants: [userId, targetUserId],
                messages: [],
            });
            await chart.save();
        }

        // const fintPhtUrl = await User.findById(targetUserId).select("photoUrl");
       
        res.json(chart);

        
    } catch (error) {
        res.status(400).send("ERROR : " + error.message);
    }
})

module.exports = chartRouter;