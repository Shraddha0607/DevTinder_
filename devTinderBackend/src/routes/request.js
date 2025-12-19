const express = require("express");
const requestRouter = express.Router();
const {
    userAuth
} = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");


requestRouter.post(
    '/request/send/:status/:toUserId',
    userAuth,
    async (req, res) => {
        try {
            const fromUserId = req.user._id;
            const toUserId = req.params.toUserId;
            const status = req.params.status;

            const allowedStatus = ['ignored', 'interested'];
            if (!allowedStatus.includes(status)) {
                res.status(400).json({
                    message: `Invalid status type: ${status}`
                });
            }

            if (fromUserId === toUserId) {
                throw new Error("To send connection request to self is not allowed!");
            }

            const toUser = await User.findById(toUserId);
            if (!toUser) {
                return res.status(404).json({
                    message: "User not found!"
                });
            }

            // if there is an existing ConnectionRequest
            const existingConnectionRequest = await ConnectionRequest.findOne({
                $or: [{
                        fromUserId,
                        toUserId
                    },
                    {
                        fromUserId: toUserId,
                        toUserId: fromUserId
                    }
                ],
            });
            if (existingConnectionRequest) {
                return res.status(400).json({
                    message: "Connection request already exist!"
                });
            }

            const connectionRequest = new ConnectionRequest({
                fromUserId,
                toUserId,
                status,
            });

            const data = await connectionRequest.save();

            const messageStatus = status === 'ignored' ? "ignored" : "interested in";
            res.status(200).json({
                message: `${req.user.firstName} ${messageStatus} ${toUser.firstName} successfully.`,
                data,
            });
        } catch (err) {
            res.status(400).send("ERROR : " + err.message);
        }
    });


module.exports = requestRouter;