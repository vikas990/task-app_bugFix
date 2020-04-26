const sgMail = require('@sendgrid/mail')




sgMail.setApiKey(process.env.SENDGRID_API_KEY)


const sendWelcomeEmail = (email,name)=>{
    sgMail.send({
        to: email,
        from: 'vikaskumarp66@gmail.com',
        subject: `Welcome ${name} to our Family`,
        text: 'Tell us how you intract with our app :)'
    })
}

const sendCancelEmail = (email,name)=>{
    sgMail.send({
        to: email,
        from: 'vikaskumarp66@gmail.com',
        subject: 'Its hard to see our Family member GO :(',
        text: `Please take a minute ${name} what went worng:)`
    })
}

module.exports= {
    sendWelcomeEmail,
    sendCancelEmail
}
