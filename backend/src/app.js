import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import orgRoutes from "./routes/orgRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/employeeRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import performanceRoutes from "./routes/performanceRoutes.js";
import leaveRoutes from "./routes/leaveRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/org", orgRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/employees", userRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/performance", performanceRoutes);
app.use("/api/leaves", leaveRoutes);


export default app;
