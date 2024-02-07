import connection from "../index.js";
import { ApiError } from "../utils/ApiError.js";

const rentalList = async (req, res) => {
    try {
        const { location } = req.query;
        console.log(location)
        connection.query("SELECT * FROM RentalAgency WHERE agencyLocation = ?;", [location],
            (err, result) => {
                if (err) {

                    throw new ApiError(500, "Failed to fetch  database")
                } else {
                    return res.status(200).json({
                        success: true,
                        data: result,
                        message: "rental Agency list fetched successfully"
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

const availableCars = async (req, res) => {
    try {
        const { agencyID, bookingDate } = req.query;
        connection.query(`SELECT *
        FROM Car
        WHERE carID NOT IN (
            SELECT carID
            FROM CarBooking
            WHERE agencyID = ? and bookingDate = ?
        );`, [agencyID, bookingDate],
            (err, result) => {
                if (err) {

                    throw new ApiError(500, "Failed to fetch  database")
                } else {
                    return res.status(200).json({
                        success: true,
                        data: result,
                        message: "car list fetched successfully"
                    });

                }
            }
        )
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error fetching cars",
            error: err
        });
    }
}

const bookCar = async (req, res) => {
    try {
        const { userID, carID, agencyID, bookingDate, days, price } = req.body;
        // console.log(userID, carID, agencyID, bookingDate, days, price)
        connection.query('INSERT INTO CarBooking (userID, carID, agencyID, bookingDate, days, price) values (?,?,?,?,?,?);', [userID, carID, agencyID, bookingDate, days, price], (err, result) => {
            if (err) {

                throw new ApiError(500, "Failed to fetch  database")
            } else {
                return res.status(200).json({
                    success: true,
                    data: result,
                    message: "car booked successfully"
                });

            }
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error booking car",
            error: err
        });
    }
}


export { rentalList, availableCars, bookCar }