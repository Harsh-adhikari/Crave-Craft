const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSignup = async (req, res) => {
    const { email, password, username } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    
    if (!username) {
        return res.status(400).json({ message: "Username is required" });
    }
    
    // Check if email already exists
    let existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ error: "Email already exists" });
    }
    
    // Check if username already exists
    let existingUsername = await User.findOne({ username });
    if (existingUsername) {
        return res.status(400).json({ error: "Username already taken" });
    }
    
    const hashPwd = await bcrypt.hash(password, 10);
    
    const newUser = await User.create({
        username,
        email,
        password: hashPwd
    });
    
    let token = jwt.sign({ email, id: newUser._id }, process.env.SECRET_KEY);
    return res.status(200).json({ token, user: newUser });
};

const userLogin = async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    
    let user = await User.findOne({ email });
    
    if (user && await bcrypt.compare(password, user.password)) {
        let token = jwt.sign({ email, id: user._id }, process.env.SECRET_KEY);
        return res.status(200).json({ token, user });
    } else {
        return res.status(400).json({ error: "Invalid credentials" });
    }
};

const getUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json({ email: user.email, username: user.username });
};

module.exports = { userLogin, userSignup, getUser };