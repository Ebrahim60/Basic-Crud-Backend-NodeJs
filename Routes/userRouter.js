const express = require('express');
const { getAllUser, getOneUser, creatUser, updateUser, deleteUser } = require('../Controllers/userController');
const router = express.Router();

router.get("/", getAllUser);

router.get("/:id", getOneUser);

router.post("/", creatUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

module.exports = router;