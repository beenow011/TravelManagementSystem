
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import connection from "../index.js";

const createUser = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        connection.query(
            'INSERT INTO Users (email, password, username) VALUES (?, ?, ?)',
            [email, password, username],
            (err, result) => {
                if (err) {

                    console.error("Error adding user:", err);
                    return res.status(500).json({
                        success: false,
                        message: "Failed to add to database",
                        error: err
                    });

                } else {
                    console.log('New user added:', result.insertId);

                    return res.status(200).json({
                        success: true,
                        data: result.insertId,
                        message: "User created successfully"
                    });
                }
            }
        );
    } catch (err) {
        console.error("Error adding user:", err);

        return res.status(500).json({
            success: false,
            message: "Error adding user",
            error: err
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        connection.query("SELECT * FROM Users WHERE email = ?;", [email, password],
            (err, result) => {
                if (err) {
                    console.error("Error logging user:", err);
                    throw new ApiError(500, "Failed to add to database")
                } else {

                    console.log('user logged in:', result[0]?.password === password);

                    return res.status(200).json({
                        success: true,
                        data: result[0]?.password === password ? result[0] : null,
                        message: "User logged successfully"
                    });

                }
            }
        )
    } catch (err) {
        console.error("Error logging user:", err);

        return res.status(500).json({
            success: false,
            message: "Error logging user",
            error: err
        });
    }
}

const getUser = async (req, res) => {
    try {
        const { userID } = req.query;
        connection.query('SELECT * FROM Users where userID = ?', [userID], (err, result) => {
            if (err) {
                console.error("Error fetching user:", err);
                throw new ApiError(500, "Failed to fetch database")
            } else {


                return res.status(200).json({
                    success: true,
                    data: result,
                    message: "User fetched successfully"
                });

            }
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error fetching user",
            error: err
        });
    }
}

const userBookings = async (req, res) => {
    try {
        const { userID } = req.body;
        console.log(userID)
        // First, create or replace the view
        connection.query(`CREATE OR REPLACE VIEW UserBookings AS
        SELECT
            u.userID,
            u.email,
            u.username,
            COUNT(DISTINCT rb.bookingID) AS numberOfRoomBookings,
            SUM(rb.price) AS totalRoomPrice,
            COUNT(DISTINCT cb.bookingID) AS numberOfCarBookings,
            SUM(cb.price) AS totalCarPrice,
            SUM(rb.price) + SUM(cb.price) AS totalBookingPrice
        FROM
            Users u
        LEFT JOIN RoomBooking rb ON u.userID = rb.userID
        LEFT JOIN CarBooking cb ON u.userID = cb.userID
        GROUP BY
            u.userID;
         
        `, (err, result) => {
            if (err) {
                console.error("Error creating or replacing UserBookings view:", err);
                throw new ApiError(500, "Failed to create or replace UserBookings view");
            } else {
                // Once the view is created or replaced, select data from the view
                connection.query('SELECT * FROM UserBookings WHERE userID = ?;', [userID], (err, result) => {
                    if (err) {
                        console.error("Error fetching user bookings:", err);
                        throw new ApiError(500, "Failed to fetch user bookings");
                    } else {
                        return res.status(200).json({
                            success: true,
                            data: result,
                            message: "User bookings fetched successfully"
                        });
                    }
                });
            }
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error fetching user bookings",
            error: err
        });
    }
};

export { createUser, loginUser, getUser, userBookings }