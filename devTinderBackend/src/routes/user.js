const express = require("express");
const userRouter = express.Router();
const {
    userAuth
} = require('../middlewares/auth');
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

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

// what to show in card  ?page=1&limit=10
userRouter.get('/user/feed', userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit;

        const skip = (page - 1) * limit;

        const connectionRequests = await ConnectionRequest.find({
                $or: [{
                        toUserId: loggedInUser._id
                    },
                    {
                        fromUserId: loggedInUser._id
                    }
                ]
            }).select("fromUserId toUserId")
            .populate("fromUserId", "firstName")
            .populate("toUserId", "firstName");

        const hideUsersFromFeed = new Set();
        connectionRequests.forEach((req) => {
            hideUsersFromFeed.add(req.fromUserId);
            hideUsersFromFeed.add(req.toUserId);
        });

        const users = await User.find({
                $and: [{
                        _id: {
                            $nin: Array.from(hideUsersFromFeed)
                        }
                    }, // $nin: not in
                    {
                        _id: {
                            $ne: loggedInUser._id
                        }
                    }, // $ne = not equal
                ]
            }).select(USER_SAFE_DATA)
            .skip(skip).limit(limit);

        if (users.length === 0) {
            return res.status(400).json({
                message: "No more feed available. Try after some time.",
            });
        }

        return res.status(200).json({
            message: "All feed data fetched successfully.",
            data: users
        });


        // first check loggedInUser or not
        // get all the user
        // filter out all those 
        // 1) not show user all rejected, accepted, interested, ignored
        // 2) not show self one
        // 3) 
    } catch (err) {
        return res.status(400).json({
            message: "ERROR : " + err.message
        });
    }
});
module.exports = userRouter;