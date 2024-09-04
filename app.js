const express = require("express");
const app = express();

const path = require("path");

const cors = require("cors");
const helmet = require("helmet");


const connectDB = require("./config/database");
const logger = require("./middlewares/logger");
const { notFound, errorHanlder } = require("./middlewares/errors");

require("dotenv").config();

connectDB();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "token"],
    optionsSuccessStatus: 200,
  })
);

// Static Folder
app.use(express.static(path.join(__dirname, "images")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger);

app.use(helmet());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));


app.use("/api/test", require("./routes/test"));

// const { User } = require("./models/User")
// console.log(User.schema.obj.role.enum);
// console.log(User.schema.methods.generateToken());


app.use(notFound);
app.use(errorHanlder);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
