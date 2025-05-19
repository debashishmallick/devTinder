
const express = require("express");
const { userAuth } = require("../middleware/auth");
const paymentRouter = express.Router();
const razorpayInstance = require("../utils/razorpay");
const Payment = require("../models/payments");
const { membershipAmounts } = require("../utils/constants");
const {validateWebhookSignature} = require('razorpay/dist/utils/razorpay-utils')
const { User } = require("../models/user");



paymentRouter.post("/payment/create", userAuth, async (req, res) => {
  try {
    const { membershipType } = req.body;
    const { firstName, lastName, emailId } = req.user;
    const order = await razorpayInstance.orders.create({
      amount: membershipAmounts[membershipType] * 100,
      currency: "INR",
      receipt: "receipt#1",
      partial_payment: false,
      notes: {
        firstName,
        lastName,
        emailId,
        membershipType: membershipType,
      },
    });

    //save order details to database

    const payment = new Payment({
      userId: req.user._id,
      orderId: order.id,
      amount: order.amount,
      status: order.status,
      currency: order.currency,
      receipt: order.receipt,
      notes: order.notes,
    });

    const savedPayment = await payment.save();

    //return back my order details to frontend
    res.json({ ...savedPayment.toJSON(), keyId: process.env.RAZORPAY_KEY_ID });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

paymentRouter.post("/payment/webhook", async (req, res) => {
  try {

    const webhookSignature = req.get("X-Razorpay-Signature");
    
    const isWebHookValid = validateWebhookSignature(JSON.stringify(req.body), webhookSignature, process.env.RAZORPAY_WEBHOOK_SECRET);

    if (!isWebHookValid){
      return res.status(400).json({ msg: "Invalid webhook signature" });
    }

    //update payment status in database
    const paymentDetails = req.body.payload.payment.entity

    const payment = await Payment.findOne({orderId:paymentDetails.order_id})

    payment.status = paymentDetails.status;
    await payment.save();

    const user = await User.findOne({_id:payment.userId});
    user.isPremium = true;
    user.membershipType = payment.notes.membershipType;
    await user.save();

    //update user as premium

    // if(req.body.event === "payment.captured"){}
    // if(req.body.event === "payment.failed"){}

    //return success response to razorpay
    res.status(200).json({ msg: "Webhook received" });
  

  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

module.exports = paymentRouter;


























