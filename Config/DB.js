const mongoose = require('mongoose');
require('dotenv').config();

const dataBaseConnection = async () => {

    await mongoose.connect(process.env.Mongo_URI)
        .then(() => {
            console.log("DB Connected Successfully.");
        })
        .catch((error) => {
            console.log(error.message)
        });
};

module.exports=dataBaseConnection;