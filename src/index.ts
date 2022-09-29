import express ,{ Application} from 'express'

const {
    ENV
} = process.env

const PORT = 3000 ;

const app : Application= express();


app.get('/',(req : express.Request, res : express.Response )=>{
    res.send('main server route')
})


app.listen(PORT,()=>{
   if(ENV!='test') console.log('app started listening on port: '+PORT);
    
})


export default app ;