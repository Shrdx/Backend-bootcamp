import Mailgen from "mailgen";
import nodemailer from "nodemailer"

const sendEmail = async (options) => {
    const mailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "Task Manager",
            link: "https://taskmanagerlink.com"
        }
    })

    const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent)

    const emailHtml = mailGenerator.generate(options.mailgenContent)

    const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_SMTP_HOST,
        port: process.env.MAILTRAP_SMTP_PORT,
        auth: {
            user: process.env.MAILTRAP_SMTP_USER,
            pass: process.env.MAILTRAP_SMTP_PASS
        }
    })

    const mail = {
        from: "mail.taskmanager@example.com",
        to: options.email,
        subject: options.subject,
        text: emailTextual,
        html: emailHtml
    }

    try {
        await transporter.sendMail(mail)
    } catch (error) {
        console.error("Email service failed make sure the credential provided in .env file")
    }

}


const emailVerificationMailgencontent =  (username, verificationUrl) => {
    return {
        body: {
            name: username,
            intro: "Welcome to our platform! excited to have you on board",
            action: {
                instructions: "Verify your email by clicking on the button",
                button: {
                    color: "#22BC66",
                    text: "Verify your email",
                    link: verificationUrl
                },
            },
            outro: "Need any help or questions? reply back to this email"
        },
    }
}

const forgotPasswordMailgencontent =  (username, passwordResetUrl) => {
    return {
        body: {
            name: username,
            intro: "We got a request to reset the password of your account",
            action: {
                instructions: "Reset your password click on the following button",
                button: {
                    color: "#0fff77ff",
                    text: "Reset password",
                    link: passwordResetUrl
                },
            },
            outro: "Need any help or questions? reply back to this email"
        },
    }
}

export{
    emailVerificationMailgencontent,
    forgotPasswordMailgencontent,
    sendEmail
}