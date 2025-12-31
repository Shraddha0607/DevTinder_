const cron = require('node-cron');
const ConnectionRequest = require('../models/connectionRequest');
const {
    sendRequestNotificationEmail
} = require("./prepareMailFormat.js");
const {
    subDays,
    startOfDay,
    endOfDay
} = require("date-fns");

// send emails to all people who got requests the previous day
cron.schedule('* 8 * * *', async () => {
    try {

        // get the connection requests
        // filter out those, who got connection request, the day before today, status:: "interested"
        // we get list of those users
        // then fetch email of those toUserId
        // use that email, to send the mail

        const yesterday = subDays(new Date(), 1);

        const yesterdayStart = startOfDay(yesterday);
        const yesterdayEnd = endOfDay(yesterday);

        const pendingRequests = await ConnectionRequest.find({
            createdAt: {
                $gte: yesterdayStart,
                $lt: yesterdayEnd,
            },
            status: "interested"
        }).populate("fromUserId toUserId");

        const listOfEmails = [...new Set(pendingRequests.map((req) => req.toUserId.emailId))];

        for (const email of listOfEmails) {
            try {
                const res = await sendRequestNotificationEmail(email);
                console.log("Email sent.");
            } catch (err) {
                console.log(err);
            }
        };

    } catch (err) {
        console.error(err);
    }
});