require("dotenv").config();
const middleware = require("./middleware");
const express = require("express");
const connectDB = require("./config/db");
const session = require("express-session");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

//Connect Database

connectDB();

//Init MiddleWare

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  session({
    key: "UserID",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { sameSite: "strict" },
  })
);
//Defining Routes

app.get("/", (req, res) => res.send("API Running"));

app.post("/", middleware.requireLogin, (req, res) => {
  res.status(200).send("true");
});

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.use("/", require("./middleware/decryption"));

app.use("/api/users", require("./route/api/users"));

app.use("/api/auth", require("./route/api/auth"));

app.use("/api/setup", require("./route/api/setup"));

app.use("/api/device", require("./route/api/device"));

app.use("/api", require("./middleware/encryption"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started on PORT ${PORT}`));
