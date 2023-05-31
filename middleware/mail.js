import { SMTPClient } from 'emailjs';


var otp = Math.random();
otp = otp * 1000000;
otp = parseInt(otp);


export const sendOtpMessage = async (email) => {

        

        const client = new SMTPClient({
            user: process.env.EMAIL,
            password: process.env.PASSWORD,
            host: 'smtp.gmail.com',
            ssl: true,
        });

        try {
            const message = await client.sendAsync({
                text: ` Your OTP from makeframes is  : ${otp} `,
                from: 'makeframes2023@gmail.com',
                to: `${email}`,
                // cc: 'else <else@your-email.com>',
                subject: 'OTP VERIFICATION',
            });
            return true
        } catch (err) {
            console.error(err);
            return false
        }

}


export const verifyOtp =  (clientOtp) => {
    try {
        
        if (Number(clientOtp) === otp) {
            return true
        } else {
            return false
        }
        
    } catch (error) {
        return false
    }

    
}