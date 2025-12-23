const express = require("express");
const userRouter = express.Router();
const {
    userAuth
} = require('../middlewares/auth');
const ConnectionRequest = require("../models/connectionRequest");

const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

// Get all the pending connection request for the logged in user
userRouter.get('/user/requests/received', userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        // to get all pending request
        // from the connectionRequest, fetch those which status is "interested"
        const pendingRequest = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
            // }).populate(
            //     "fromUserId",
            //     ["firstName", "lastName"]
            // );
        }).populate(
            "fromUserId",
            USER_SAFE_DATA
        );

        if (!loggedInUser) {
            res.status(400).json({
                message: "No pending request found!"
            });
        }
        res.status(200).json({
            message: "Data fetched successfully.",
            data: pendingRequest
        });


    } catch (err) {
        res.status(400).json({
            message: "Error : " + err.message
        });
    }
});

// get who are my connection
userRouter.get('/user/connections', userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        if (!loggedInUser) {
            return res.status(400).json({
                message: "Invalid user!"
            });
        }

        const connectionRequest = await ConnectionRequest.find({
                $or: [{
                        fromUserId: loggedInUser._id,
                        status: "accepted"
                    },
                    {
                        toUserId: loggedInUser._id,
                        status: "accepted"
                    }
                ],
            }).populate("toUserId", USER_SAFE_DATA)
            .populate("fromUserId", USER_SAFE_DATA);

        if (connectionRequest.length === 0) { // as find() always return array, either empty array so !connectionRequest is not correct
            return res.status(400).json({
                message: "No connection found!"
            });
        }

        const connectedUser = connectionRequest.map((row) => {
            if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return row.toUserId;
            }
            return row.fromUserId;
        });

        return res.status(200).json({
            message: "All connection fetched successfully.",
            data: connectedUser
        });

    } catch (err) {
        return res.status(400).json({
            message: "ERROR : " + err.message
        });
    }

});

module.exports = userRouter;