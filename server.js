

import authRoutes from './routes/authRoutes.js'
import incomeRoutes from './routes/incomeRoutes.js'
import expenseRoutes from './routes/expenseRoutes.js'
import express from 'express';
import mongoose from 'mongoose';
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();





app.use(cors({
  origin: [
    "http://localhost:5174", 
    "http://localhost:5173",
    "https://frontend-expense-chi.vercel.app"
  ],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/income', incomeRoutes);
app.use('/', authRoutes);
app.use('/expense', expenseRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


mongoose.connect(process.env.MONGO_URI)
  .then(() =>    console.log("✅ MongoDB Connected from database" , process.env.MONGO_URI))
  .catch((err) => console.error(" MongoDB Error:", err));

// app.listen(process.env.PORT || 3000, () => {
//   console.log(` Server running on port ${process.env.PORT || 3000}`);
// });
  

export default app;
