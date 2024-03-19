const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const cron = require("node-cron");
const userRouter = require("./routes/userRouter.js");
const openaiRouter = require("./routes/openaiRoute.js");
const stripeRouter = require("./routes/stripeRoute.js");
const connectDb = require("./utils/connectDb.js");
const { errorHandler } = require("./middlewares/errorMiddleware.js");
const User = require("./models/User.js");
dotenv.config();

connectDb();

const app = express();

const PORT = process.env.PORT || 5000;

cron.schedule("0 0 * * * *", async () => {
  try {
    const today = new Date();
    const updatedUser = await User.updateMany(
      {
        trialActive: true,
        trialExpires: {
          $lte: today,
        },
      },
      { trialActive: false, subscription: "Free", monthlyRequestCount: 5 }
    );
  } catch (error) {console.log(error)}
});

cron.schedule("0 0 1 * * *", async () => {
  try {
    const today = new Date();
    await User.updateMany(
      {
        subscription: "Free",
        nextBillingDate: {
          $lte: today,
        },
      },
      { monthlyRequestCount: 0 }
    );
  } catch (error) {console.log(error)}
});

cron.schedule("0 0 1 * * *", async () => {
  try {
    const today = new Date();
    await User.updateMany(
      {
        subscription: "Basic",
        nextBillingDate: {
          $lte: today,
        },
      },
      { monthlyRequestCount: 0 }
    );
  } catch (error) {console.log(error)}
});

cron.schedule("0 0 1 * * *", async () => {
  try {
    const today = new Date();
    await User.updateMany(
      {
        subscription: "Premium",
        nextBillingDate: {
          $lte: today,
        },
      },
      { monthlyRequestCount: 0 }
    );
  } catch (error) {console.log(error)}
});

app.use(express.json());
app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, 
}

app.use(cors(corsOptions));

app.use("/api/vi/users", userRouter);
app.use("/api/vi/openai", openaiRouter);
app.use("/api/vi/stripe", stripeRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log("server is running on port " + PORT);
});
