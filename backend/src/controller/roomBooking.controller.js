import connection from "../index.js";

const hotelList = async (req, res) => {
    try {
        const { location } = req.body;
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
        const { hotelID } = req.body;
        connection.query(`SELECT *
        FROM Room
        WHERE RoomID NOT IN (
            SELECT roomID
            FROM RoomBooking
            WHERE hotelID = ?
        );`, [hotelID],
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


export { hotelList, availableRooms }