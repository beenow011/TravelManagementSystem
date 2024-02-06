
import dotenv from "dotenv"
import express from "express";
import mysql from 'mysql2';
import cors from "cors";
import { createUser, loginUser } from "./controller/users.controller.js";
import { availableRooms, hotelList } from "./controller/roomBooking.controller.js";
dotenv.config({
    path: './env'
})
const app = express()
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(cors({ origin: 'http://localhost:5173/signup' }));
const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

connection.connect((err) => {
    if (err) {
        throw err;
    }

    console.log('Connected to MySQL database!');



});
//auth
app.post('/api/user/createUser', createUser)
app.post('/api/user/loginUser', loginUser)

//room
app.get('/api/hotel/fetchHotels', hotelList)
app.get('/api/hotel/availableRoom', availableRooms)

export default connection;