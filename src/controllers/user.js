
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//bcrypt is very slow; //signup后数据库中存的是bcrypt加密后的密码；
const signupUser = async (req, res) => {
    const { username, password } = req.body;
    console.log("This is to check the content of username :", username);

    try {
        const exists = await User.findOne({ username });
        if (exists) {
            return res.status(400).json({error :`username: '${username}' already in use`});
            //return res.status(400).json({ error: "Username already in use." })
        }
        //valid username, then do the encrypting of password by using bcrypt;
        const hashedPassword = await bcrypt.hash(password, 10);

        //save the username + hashedPassword to mongodb database;
        const newUser = await User.create({
            username,
            password: hashedPassword
        });

        res.status(201).json({ newUser });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        //先从数据库中的数据验证用户名，如果该用户名在的话，验证密码和加密之后的数据库中的密码是否一样
        const exists = await User.findOne({ username });
        if (!exists) {
            return res.status(404).json({ error: "Username not found." });
        }

        //验证提供的密码和数据库中加密的密码是否一样，如果一样的话，服务器将产生一个token给到client
        const isPasswordMatched = await bcrypt.compare(password, exists.password);

        if (!isPasswordMatched) {
            return res.status(400).json({ error: "Incorrect password "});
        }

        //用JWT 来产生一个用了自己的密钥签名的token, 并且返回给client;
        const token = jwt.sign({ userId: exists._id }, process.env.JWT_SECRET);

        res.status(200).json({ username, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const logout = async(req, res) => {
    const { username, password } = req.body;
    try {
        const exists = await User.findOne({ username });
        if (!exists) {
            return res.status(400).json({error :`username: '${username}' does not exist`});
        }
    } catch (error) {
        
    }
}

module.exports = {
    signupUser,
    loginUser
};