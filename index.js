import express from 'express';
import dotenv from 'dotenv';
//import { PrismaClient } from '@prisma/client';
import router from './routes/user.js';
import cors from 'cors'
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/user", router);

app.get('/',(req,res)=> {
    res.send("working");
})

// export const prismaClient = new PrismaClient({
//   log: ['query']
// });



const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server is running ${PORT}`);
});
