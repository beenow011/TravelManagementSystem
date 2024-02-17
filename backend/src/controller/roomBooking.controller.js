import connection from "../index.js";
import { ApiError } from "../utils/ApiError.js";

const hotelList = async (req, res) => {
    try {
        const { location } = req.query;
        console.log(location)
        connection.query("SELECT * FROM Hotel WHERE location = ?;", [location],
            (err, result) => {
                if (err) {

                    throw new ApiError(500, "Failed to fetch  database")
                } else {
                    return res.status(200).json({
                        success: true,
                        data: result,
                        message: "hotel list fetched successfully"
                    });

                }
            }
        )

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error fetching hotel",
            error: err
        });
    }
}

const availableRooms = async (req, res) => {
    try {
        const { hotelID, bookingDate } = req.query;
        connection.query(`SELECT *
        FROM Room
        WHERE RoomID NOT IN (
            SELECT roomID
            FROM RoomBooking
            WHERE hotelID = ? and bookingDate = ?
        )`, [hotelID, bookingDate],
            (err, result) => {
                if (err) {

                    throw new ApiError(500, "Failed to fetch  database")
                } else {
                    return res.status(200).json({
                        success: true,
                        data: result,
                        message: "room list fetched successfully"
                    });

                }
            }
        )
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error fetching room",
            error: err
        });
    }
}

const bookRoom = async (req, res) => {
    try {
        const { userID, RoomID, hotelID, bookingDate, days, price } = req.body;
        connection.query('INSERT INTO RoomBooking (userID,roomID,hotelID,bookingDate,days,price) values (?,?,?,?,?,?);',
            [userID, RoomID, hotelID, bookingDate, days, price], (err, result) => {
                if (err) {

                    throw new ApiError(500, "Failed to fetch  database")
                } else {
                    return res.status(200).json({
                        success: true,
                        data: result,
                        message: "room booked successfully"
                    });

                }
            })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error booking room",
            error: err
        });
    }
}

const bookedRoom = async (req, res) => {
    try {
        const { userID } = req.query;
        connection.query(`SELECT 
        rb.bookingID,
        rb.bookingDate,
        rb.days,
        rb.price,
        h.hotelName,
        h.location,
        r.roomNumber,
        r.roomType
    FROM 
        RoomBooking rb
    JOIN 
        Room r ON rb.roomID = r.RoomID
    JOIN 
        Hotel h ON rb.hotelID = h.hotelID
    WHERE 
        rb.userID = ?;`, [userID],
            (err, result) => {
                if (err) {

                    throw new ApiError(500, "Failed to fetch  database")
                } else {
                    return res.status(200).json({
                        success: true,
                        data: result,
                        message: "rooms fetched successfully"
                    });

                }
            })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error fetching booked room",
            error: err
        });
    }
}

const cancelBookingRooms = async (req, res) => {
    try {
        const { bookingID } = req.body;
        connection.query('DELETE FROM RoomBooking WHERE bookingID = ?', [bookingID], (err, result) => {
            if (err) {

                return res.status(500).json({
                    success: false,
                    message: "Failed to cancel booking",
                    error: err
                });
            }
            return res.status(200).json({
                success: true,
                data: result,
                message: "Room booking canceled successfully"
            });
        });
    } catch (err) {
        // console.error("Error canceling booked cars:", err);
        return res.status(500).json({
            success: false,
            message: "Error canceling booked Rooms",
            error: err
        });
    }
};

export { hotelList, availableRooms, bookRoom, bookedRoom, cancelBookingRooms }

