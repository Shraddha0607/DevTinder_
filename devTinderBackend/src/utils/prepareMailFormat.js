const mailSender = require("./mailSender");

// function to send emails
const sendVerificationEmail = async (emailId, firstName) => {
    try {
        const mailResponse = await mailSender(
            emailId,
            "Welcome to DevTinder",
            `<h1> Signup confirmation</h1>
            <p>Hi,  ${firstName} </p>
            <p> Let's start wonderful journey with us. </p>`
        );

        return mailResponse;

    } catch (error) {
        console.log("Error occurred while sending email: ", error);
    }
};

const sendRequestNotificationEmail = async (emailId) => {
    try {
        const mailResponse = await mailSender(
            emailId,
            "Notification for new request",
            `<h1>Notification about new Request</h1>
            <p> Hi, You got the new request. </p>
            <p>Login to your account now. Explore possible interest. Might you got your best connection here</p>`
        );
        return mailResponse;
    } catch (err) {
        console.error("Error occured while sending notification email: ", error);
    }
};

module.exports = {
    sendVerificationEmail,
    sendRequestNotificationEmail
};