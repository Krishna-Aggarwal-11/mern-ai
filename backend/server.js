const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/userRouter.js");
const openaiRouter = require("./routes/openaiRoute.js");
const stripeRouter = require("./routes/stripeRoute.js");
const connectDb = require("./utils/connectDb.js");
const { errorHandler } = require("./middlewares/errorMiddleware.js");
dotenv.config();

connectDb();

const app = express();
const PORT = process.env.PORT || 5000 ;

app.use(express.json());
app.use(cookieParser());

app.use("/api/vi/users" , userRouter);
app.use("/api/vi/openai" , openaiRouter);
app.use("/api/vi/stripe" , stripeRouter);


app.use(errorHandler)

app.listen(PORT, () => {
    console.log('server is running on port ' + PORT);
})