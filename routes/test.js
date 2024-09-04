const express = require("express");
const verifyTokenAndAuthorization = require("../middlewares/verifyToken")

const router = express.Router();

const admin = (req, res) => {
    res.status(201).json("admin route entered successfuly")
}
const instructor = (req, res) => {
    res.status(201).json("instructor route entered successfuly")
}
const editor = (req, res) => {
    res.status(201).json("editor route entered successfuly")
}
const student = (req, res) => {
    res.status(201).json("student route entered successfuly")
}
const shared = (req, res) => {
    res.status(201).json("shared route entered successfuly")
}

router.get("/admin", verifyTokenAndAuthorization(['admin']), admin);
router.get("/instructor", verifyTokenAndAuthorization(['instructor']), instructor);
router.get("/editor", verifyTokenAndAuthorization(['editor']), editor);
router.get("/student", verifyTokenAndAuthorization(['student']), student);
router.get("/shared", verifyTokenAndAuthorization(['admin', 'instructor']), shared);



module.exports = router;
