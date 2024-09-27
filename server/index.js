const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./database/dbConnect");
const authRouter = require("./routes/authRoute");
const jwt =require("jsonwebtoken");
const morgan = require("morgan");
const cookieParser =require("cookie-parser");


const app = express();
//middlewares


app.use(express.json());
app.use(morgan("common"));
app.use(cookieParser());



app.use('/auth', authRouter);
app.get('/', (req, res) => {
  res.status(200).send("Ok From Server");
});

const PORT = 3500;

dbConnect();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
