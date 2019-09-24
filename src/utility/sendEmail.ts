import * as nodemailer from 'nodemailer';
import  template  from './templateEmail'

class SendEmail{
    public async transport(){
        
    }

    public async sendMail(emails:String[], data:any){ 
        
        //emails.push("jose es el nuevo")

        
        
        const transport = await nodemailer.createTransport({
            service:'gmail',
            auth: {
                user: 'yuli.espitia2@kiero.co',
                pass: 'Clavesegura2017'
            } 
        })        



        const mailOptions = {
            from: 'yuli.espitia2@kiero.co',
            to: JSON.stringify(emails),
            subject: 'Kiero | Vendiste un producto!',
            html: template.sendEmail(data)
        };
        const result = await transport.sendMail(mailOptions);        
        return result;
        
    }


}
const sendEmail = new SendEmail();
export default sendEmail;
