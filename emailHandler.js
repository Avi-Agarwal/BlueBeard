const { htmlToText } = require('html-to-text');
const mailGunService = require('./mailGun');
const sendGridService = require('./sendGrid');
const requiredFields = ['to', 'to_name', 'from', 'from_name','subject','body']

const emailHandler = async (data) => {
    // Validate Param
    const dataKeys = Object.keys(data);
    if (!data || dataKeys.length < 1) {
        console.log('Status 400: Invalid Body')
        return { statusCode: 400, message: 'Invalid Body' }
    }

    // Check if all required fields are present
    if (!requiredFields.every(field => dataKeys.includes(field))) {
        console.log('Status 400: Missing required field(s)')
        return { statusCode: 400, message: 'Missing required field(s)' }
    }

    // Validate emails passed in
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(data.from).toLowerCase()) || !re.test(String(data.to).toLowerCase())) {
        console.log('Status 400: Invalid Email Present')
        return { statusCode: 400, message: 'Invalid Email Present' }
    }
    // Switch HTML body to text
    data.body = htmlToText(data.body);

    let emailSuccess
    if (data.service) {
        switch (data.service) {
            case 'sendgrid':
                // Use specified email service
                console.log('Using sendgrid as primary service')
                emailSuccess = await sendGridService.sendEmailFromSendGrid(data)

                // If primary service is down, use back-up email service
                if (!emailSuccess) {
                    console.log('Using secondary email service')
                    emailSuccess = await mailGunService.sendEmailUsingMailGun(data)
                }
                break;
            case 'mailgun':
                // Use primary email service
                console.log('Using mailgun as primary service')
                emailSuccess = await mailGunService.sendEmailUsingMailGun(data);

                // If primary service is down, use back-up email service
                if (!emailSuccess) {
                    console.log('Using secondary email service')
                    emailSuccess = await sendGridService.sendEmailFromSendGrid(data)
                    console.log(emailSuccess)
                }
                break;
        }
    } else {
        // Use primary email service
        emailSuccess = await mailGunService.sendEmailUsingMailGun(data);

        // If primary service is down, use back-up email service
        if (!emailSuccess) {
            console.log('Using secondary email service')
            emailSuccess = await sendGridService.sendEmailFromSendGrid(data)
            console.log(emailSuccess)
        }
    }

    // Abstract email service responses
    if (emailSuccess) {
        console.log('Status 200: Email Sent')
        return { statusCode: 200, message: 'Email Sent'}
    } else {
        return { statusCode: 500, message: 'Internal Service Error'}
    }
}

module.exports = { emailHandler };
