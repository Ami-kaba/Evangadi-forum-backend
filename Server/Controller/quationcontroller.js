//database
const myconn = require("../DB/dbconn")
const {StatusCodes} = require('http-status-codes');

async function allQuestions(req, res){
   try {
        let allquestions = 'SELECT user_name, title, questionid, description FROM users JOIN questions ON users.user_id = questions.userid ORDER BY questions.id DESC';  
        const data = await myconn.query(allquestions);
        const [rows, fileds]= data;

        res.status(200).json({
            data:rows,
        });

        // return res.status(StatusCodes.CREATED).json({message:"Data"})
        //  console.log(message)
   } catch (error) {
            console.error(error.message);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Something went wrong, try it leter"})
   }
    
}
async function Questions(req, res){
    const {title, description, tag} = req.body
    const questionid = generateString(30)   
    // const username = req.user.username
    const userid = req.user.userid
      
    try {
        console.table(req.body)
        req.question = {questionid}; 

        if(!title||!description||!questionid||!userid){
            return res.status(StatusCodes.BAD_REQUEST).json({message: "Please provide all information"})
        }
        let sqlAddToquestions =
        "INSERT INTO questions(questionid, userid, title, description, tag) VALUES (?,?,?,?,?)";

        const [results] = await myconn.query(sqlAddToquestions,[questionid, userid, title, description, tag]);
        // console.table(results)
        Id = results.insertId;
        // console.log(Id)      
        return res.status(StatusCodes.CREATED).json({message:"Data inserted"})
    } catch (error) {
        console.error(error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Something went wrong, try it leter"})
    }
}
//to generet random String
const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

  
module.exports = {allQuestions, Questions}