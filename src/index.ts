import express, {Application} from 'express';
import walkToPay from './routes/walk-to-pay';

class Server{
    
    public app: Application;
    
    constructor(){
        this.app = express();
        this.config();
        
    }

    config():void{
        this.app.set('port',  process.env.PORT ||  3002)
    }

    router():void{

    }

    start():void{
        this.app.listen(this.app.get('port'), ()=>{
            console.log("Server on port ",this.app.get('port'))
        })
    }
}

const server = new Server()
server.start();