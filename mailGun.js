const mailgun = require("mailgun-js");
const domain = 'sandboxfdff83951dc3403da7baa6fc90ed248b.mailgun.org';
const apiKey = 'bc1c63caa7606d148c40d0a461162402-443ec20e-4f6ecd3b'
const mg = mailgun({ apiKey: apiKey, domain: domain });

const sendEmailUsingMailGun = async (emailData) => {
    try {
        const mgReturn = await mg.messages().send({
            from: `${emailData.from_name} <${emailData.from}>`,
            to: emailData.to,
            subject: emailData.subject,
            text: emailData.body
        })
        return !!mgReturn;
    } catch (e) {
        console.log(e)
        return false
    }
}

module.exports = { sendEmailUsingMailGun };
