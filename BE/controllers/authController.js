const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const userSchema = require('../models/userModel.js');
const bcrypt = require('bcryptjs');
const { 
    createTable,
    checkRecordExists,
    insertRecord,
   } = require('../utils/sqlFunctions.js');

const generateAccessToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const register = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password ) {
        res.status(400).json({ message: 'Please provide both username and password' });
        return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = {
        id: uuidv4(),
        username,
        password: hashedPassword,
    };
    try {
        await createTable(userSchema);
        const userAlraedyExists = await checkRecordExists('user', 'username', username);
        if (userAlraedyExists) {
            res.status(400).json({ message: 'User already exists' });
        } else {
            await insertRecord('user', user);
            res.status(201).json({ message: 'User created' });
        } 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({ message: 'Please provide both username and password' });
        return;
    }

    try {
        const existingUser = await checkRecordExists('user', 'username', username);

        if (existingUser) {
            if (!existingUser.password) {
                res.status(401).json({ message: 'Invalid credentials' });
                return;
            }

            const passwordMatch = await bcrypt.compare(password, existingUser.password);

            if (passwordMatch) {
                res.status(200).json({
                    id: existingUser.id,
                    username: existingUser.username,
                    access_token: generateAccessToken(existingUser.id),
                });
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    register,
    login,
}