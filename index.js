const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const userRoute = require("./routes/user");
const milkItemRoute = require("./routes/milkItem");
const orderRoute = require("./routes/order");
const { connectToMongoDb } = require("./connect");

const PORT = 6005;

const corsOptions = {
  origin: "http://localhost:5173",
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

app.use("/", userRoute);
app.use("/", milkItemRoute);
app.use("/", orderRoute);

app.listen(PORT, () => console.log(`server started at PORT ${PORT}`));
