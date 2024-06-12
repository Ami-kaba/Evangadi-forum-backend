require("dotenv").config()
const express = require("express")
const port = 4500
const app = express()

const cors = require("cors");

// const corsOption = {
//     Origin:[
//         "http://localhost:5050/api/Test/iphonedata",
//     ],
// };

app.use(cors());

//database
const myconn = require("./Server/DB/dbconn")

//user routes middleware 
const usersroute = require("./Server/routes/userroutes")

//question middleware 
const questionroute = require("./Server/routes/questionroutes")

//answer middleware 
const answerroutee = require("./Server/routes/answerroutes")

//Authentication middleware
const authMiddleware = require("./Server/Middleware/authmiddleware")

//to extract json sent from postman
app.use(express.json())

app.use(express.urlencoded({extended:true}))

//middleware for users
app.use("/api/users", usersroute)

//middleware for questions
app.use("/api",authMiddleware, questionroute)

//middleware for answer
app.use("/api",authMiddleware, answerroutee)


async function main(){
    try{
        let result = await myconn.execute("select 'test'")
        await app.listen(port)
        console.log("database connection established")
        console.log(`listening at port: ${port}`)
    }catch(err){
        console.log(err.message)
    }
}
main()
// main().removeListener('end', main);
module.exports =  app; 