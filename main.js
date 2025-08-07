const express = require('express');
const PORT = 3000
const app = express();
const {verify} = require('./authUtils/jwt')
const Ratelimiter = require('./authUtils/rateLimiter')

const myRateLimiter = new Ratelimiter();

app.get('/auth', myRateLimiter.attempt, verify, async(req, res, next) => {
    return res.status(200).json({message: "succeed"});
})

app.listen(PORT, ()=>{
    console.log("server start ...")
})