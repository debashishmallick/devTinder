const express = require("express");

const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser"); //reading cookies
const cors =require("cors")
const http = require("http");

require("dotenv").config();

app.use(cors({
  origin:"http://localhost:5173",
  methods:['GET', 'POST', 'PUT', 'PATCH', 'DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}))
// app.options('*', cors()); // Allow preflight across all routes
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const paymentRouter = require("./routes/payment");
const initializeSocket = require("./utils/socket");
const chartRouter = require("./routes/chart")

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", paymentRouter)
app.use("/",chartRouter)


const server = http.createServer(app)


initializeSocket(server)

connectDB()
  .then(() => {
    console.log("database connection successful...");

    server.listen(process.env.PORT, () => {
      console.log("server is sucssesfull runing on 7788");
    });
  })
  .catch((err) => {
    console.error("database can't connected...");
  });
