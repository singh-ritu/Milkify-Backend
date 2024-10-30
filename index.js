const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { isAuthenticated } = require("./middlewares/auth");

const userRoute = require("./routes/user");
const milkItemRoute = require("./routes/milkItem");
const orderRoute = require("./routes/order");
const { connectToMongoDb } = require("./connect");
require("dotenv").config();

const PORT = 6005;

const allowedOrigins = [
  "http://localhost:5173",
  "https://milkify-one.vercel.app",
];

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
};
app.use(cors(corsOptions));
connectToMongoDb(
  `mongodb+srv://singhritu241101:${process.env.NODE_MONGODB_ATLAS_PASSWORD}@cluster0.0fdiz.mongodb.net/`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
  .then(() => console.log("mongodb Connected"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/", userRoute);
app.use("/", milkItemRoute);
app.use("/", orderRoute);

app.listen(PORT, () => console.log(`server started at PORT ${PORT}`));
