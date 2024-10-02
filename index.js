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

const PORT = 6005;

const corsOptions = {
  origin: "https://milkify-sigma.vercel.app/",
  credentials: true,
};
app.use(cors(corsOptions));

connectToMongoDb("mongodb://127.0.0.1:27017/milkify-backend", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("mongodb Connected"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/", userRoute);
app.use("/", isAuthenticated, milkItemRoute);
app.use("/", isAuthenticated, orderRoute);

app.listen(PORT, () => console.log(`server started at PORT ${PORT}`));
