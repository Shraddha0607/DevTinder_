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

module.exports = {
    sendVerificationEmail
};