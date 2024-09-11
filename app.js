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
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger);

app.use(helmet());

app.set('view engine', 'ejs');

app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));

app.use("/password", require("./routes/password"));
app.use("/api/messengers", require("./routes/messengers"));
app.use("/api/newsletter", require("./routes/newsletter"));

// app.use('/api/user-actions', require("./routes/userActions"));

// 1
app.use('/api/articles', require("./routes/articleRoute"));

// 2
app.use("/api/courses", require("./routes/courseRoute"));


app.use(notFound);
app.use(errorHanlder);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

