import nodemailer from "nodemailer"


export const sendEmail =()=>{
    nodemailer.createTransport({
        service: 'gmail', 
        auth:{
            user:"oyedejienoch@gmail.com",
            pass:"zogemhrxylaqjual"
        }
    })
}