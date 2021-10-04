const sgMail = require('@sendgrid/mail')
const apiKey = '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'
sgMail.setApiKey(apiKey)
// const msg = {
//     to: { name: 'Blue Beard', email: 'avi.agarwal117@gmail.com'},
//     from: { name: 'Blue Beard', email: 'avi.agarwal117@gmail.com'}, // Only this email will work as only a single send is verified
//     subject: 'Sending with SendGrid is Fun',
//     text: 'and easy to do anywhere, even with Node.js',
// }
// sgMail
//     .send(msg)
//     .then(() => {
//         console.log('Email sent')
//     })
//     .catch((error) => {
//         console.error(error)
//     })

const sendEmailFromSendGrid = async (emailData) => {
    const sgReturn = await sgMail.send({
        to: { name: emailData.to_name, email: emailData.to },
        from: { name: emailData.from_name, email: 'avi.agarwal117@gmail.com' }, // Only this email will work as only a single sender is verified
        subject: emailData.subject,
        text: emailData.body,
    }).then(() => {
        console.log('Email sent')
        return true
    }).catch(error => {
        console.log(error)
        return false
    })
    return !!sgReturn
}

module.exports = { sendEmailFromSendGrid };
