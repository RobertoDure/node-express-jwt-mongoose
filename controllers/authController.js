const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const authConfig = require('../config/auth.json');
const crypto = require('crypto');

const router = express.Router();

function generateToken(params = {}){

    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });

}
router.post('/register', async (req,res) => {
   const { email } = req.body;
    try{
        if(await User.findOne({ email }))
        return res.status(400).send({ error: 'User already exists'});
        const user = await User.create(req.body);
        user.password = undefined;
        res.send({
            user,
            token: generateToken({ id: user.id, email: user.email, name: user.name }),
            });
    } catch (err){
        console.log(err);
    return res.status(400).send({ error: 'Registration failed'+err});
    }
});

router.post('/authenticate', async (req, res) => {
    const { email, password} = req.body;

    const user = await User.findOne({ email}).select('+password');

    if(!user)
    return res.status(400).send({ error: 'User not found'});

    if(!await bcrypt.compare(password, user.password))
    return res.status(400).send({ error: 'Invalid password'});
    user.password = undefined;

    const token = 

    res.send(
        { user,
          token: generateToken({ id: user.id, email: user.email, name: user.name }),
        });
});

router.post('/forgot_password', async (req, res) =>{
    const {email} = req.body;

    try {
       
        const user = await User.findOne({ email});

        if(!user)
        return res.status(400).send({ error: 'User not found'}); 
        
        const token = crypto.randomBytes(20).toString('hex');

        const now = new Date();
        now.setHours(now.getHours()+1);

        await User.findByIdAndUpdate(user.id, {
         '$set':{
             passwordResetToken: token,
             passwordResetExpires: now,
         }   
        });
        
        console.log(token, now);
    } catch (error) {
        return res.status(400).send({ error: 'Erro on forgot password, try again'});  
    }
});
module.exports = app => app.use('/auth', router);