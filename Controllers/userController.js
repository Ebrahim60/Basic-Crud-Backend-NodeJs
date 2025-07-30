const bcrypt = require('bcrypt');
const User = require('../Models/userModel');

const getAllUser = async (req, res) => {
    try {
        const user = await User.find();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getOneUser = async (req, res) => {
    try {
        const userID = req.params.id
        const user = await User.findOne({ _id: userID });
        if (!user) {
            res.status(404).json({ message: "User Does Not Exist With Thid ID." })
        }
        res.status(200).json(user);

    } catch (error) {
        res.status(500).send(error.message);
    }
};

const creatUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            res.status(404).json({
                success: "false",
                message: "All Fields Are Required."
            });
        };

        const ExistUser = await User.findOne({ email });

        if (ExistUser) {
            res.status(400).json({
                success: "false",
                message: "User Is Already Exist With This Email."
            });
        };

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).send(newUser);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};

const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id)
        if (!user) {
            res.status(404).json({ message: "User Not Found" })
        }

        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        user.password = req.body.password ? await bcrypt.hash(req.body.password, 10) : user.password;

        const updatedUser = await user.save();

        res.status(200).send({ message: "User Is Updated", updatedUser });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);

        await User.findByIdAndDelete(id);
        res.status(200).send({ message: `${user.username} is deletd Successfully` });

    } catch (error) {
        res.status(500).send(error.message);

    };
};

module.exports = { getAllUser, getOneUser, creatUser, updateUser, deleteUser }