import express from "express";
import cors from "cors";
import adminRouter from "./routes/admin";
import userRouter from "./routes/user"

const app = express();
app.use(cors({
    origin: "*"
}));
app.use(express.json());

app.use("/api/v1/admin", adminRouter);
app.use('/api/v1/user', userRouter)

app.listen(4000);

