const express = require('express');
const app = express();
const cors = require('cors');
const userRouter = require('./Routes/userRouter');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/user", userRouter);

app.get("/", (req, res) => {
    res.status(200).sendFile(__dirname + "/Views/index.html");
});

app.use((req, res, next) => {
    res.status(404).json({
        success: "false",
        Messege: "Page Not Found..."
    });
});

app.use((err, req, res, next) => {
    res.status(500).json({
        Success: "false",
        Messege: "Something Broke..."
    })
})

module.exports = app;