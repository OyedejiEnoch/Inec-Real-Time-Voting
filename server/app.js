import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connection from './config/database.js';
import voterRoute from "./routes/voterRoute.js"
import partyRoute from './routes/partyRoute.js';
import electionRoute from './routes/electionRoute.js';
import candidateRoute from './routes/candidateRoute.js';
import voteRoute from './routes/voteRoute.js';
import userRoute from './routes/userRoute.js';
import errorMiddleware from './middleware/errors.js';


const app = express();

dotenv.config({path: 'config/.env'});
const allowedOrigins = [
    "http://localhost:3000"  
];
app.use(
  cors({
    origin: function (origin, callback) {
      // Check if the origin is in the array of allowed origins
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

connection();

app.use("/api/auth", voterRoute);
app.use("/api/party", partyRoute);
app.use("/api/election", electionRoute);
app.use("/api/candidate", candidateRoute);
app.use("/api/vote", voteRoute);
app.use("/api/user", userRoute);


app.use(errorMiddleware);

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV} mode`);
})

const today = new Date();

// Start Date: Tomorrow
const startDate = new Date(today);
startDate.setDate(startDate.getDate() + 1);

// End Date: This coming Friday
const endDate = new Date(today);
const day = endDate.getDay(); // 0 (Sun) to 6 (Sat)
const daysUntilFriday = (5 - day + 7) % 7 || 7; // ensure it's the next Friday
endDate.setDate(endDate.getDate() + daysUntilFriday);

// Format to ISO string
// console.log("Start Date (Tomorrow):", startDate.toISOString());
// console.log("End Date (This Friday):", endDate.toISOString());