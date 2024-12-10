const express = require("express");
const zod = require("zod");
const User = require("../models/user");
const Wallet = require("../models/wallet");
const Transaction = require('../models/transaction');
const router = express.Router();
const userVerification = require("../middlewares/userVerification");
const mongoose = require('mongoose')

router.get('/balance', userVerification, async (req, res)=>{
    // const token = req.cookies.token;
    const user_id = req.user._id;
    const userWallet = await Wallet.findOne({user_id});
    
    res.status(200).json({
        balance: userWallet.balance,
        success: true
    })
    
})

router.post('/send', userVerification, async (req, res)=>{
    const {email, phoneNumber, amount} = req.body;
    
    const session = mongoose.startSession();
    
    const createTransaction = async (sender, recipient, amount)=>{
        const transaction = await Transaction.create({
            sender,
            recipient,
            amount,
        },{session});
    }

    try{   
        //session.startTransaction();
        const reciever = await User.findOne({
            email
        })
        
        if(!reciever){
            return res.status(401).json(
                { message:'Invalid receiver'}
            )
        }
        const sender_wallet = await Wallet.findOne({user_id: req.user._id}) //.session(session);
        const reciever_wallet = await Wallet.findOne({user_id: reciever._id}) //.session(session));
        if(!sender_wallet || !reciever_wallet) {
            return res.status(401).json(
                { message:'Invalid Wallet'}
            )
        }
        console.log(reciever_wallet.balance);
        if(sender_wallet.balance < amount){
            throw new Error("Ineffient amount");
        }
        sender_wallet.balance -= amount;
        reciever_wallet.balance += amount;

        await sender_wallet.save()
        await reciever_wallet.save()
        
        //createTransaction(req.user._id, reciever._id, amount);
        

        // Commit transaction
        //await session.commitTransaction();

        return res.status(200).json({
          success: true,
          //transaction: transaction,
          message: 'Transfer successful'
        })

    }catch(err){
        const reciever = await User.findOne({
            $or:[{email}, {phoneNumber}]
        })
        // const transaction = await Transaction.create({
        //     sender: req.user._id,
        //     recipient: reciever._id,
        //     amount: amount,
        //     transactionType: "SEND",
        //     status:"FAILED"
        // }, {session})
        
        //await session.abortTransaction();
        return res.status(401).json({
            success:false,
            message:"Transaction failed"
        })
    }
    finally{
        //session.endSession();
    }
})

module.exports = router;