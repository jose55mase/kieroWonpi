import * as nodemailer from 'nodemailer';
import  template  from './templateEmail'

class SendEmail{
    public async transport(){
        
    }

    public async sendMail(req:any[]){         
        //emails.push("jose es el nuevo")        
        console.log(req)
        const transport = await nodemailer.createTransport({
            service:'gmail',
            auth: {
                user: 'yuli.espitia2@kiero.co',
                pass: 'Clavesegura2017'
            } 
        }) 

        const mailOptions = {
            from: 'yuli.espitia2@kiero.co',
            to: JSON.stringify("josemase55@gmail.com"),
            subject: 'Kiero | Vendiste un producto!',
            html: template.sendEmail(req)
        };
        //const result = await transport.sendMail(mailOptions);
               
        return console.log("ḧola jose");
        
    }


}
const sendEmail = new SendEmail();
export default sendEmail;
