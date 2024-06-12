//database
const myconn = require("../DB/dbconn")
const {StatusCodes} = require('http-status-codes');



async function allAnswers(req, res){
    try {
         let allAnswers = 'SELECT answer, questionid, user_name FROM answers JOIN users ON answers.userid = users.user_id ORDER BY answerid ASC';  
         const data = await myconn.query(allAnswers);
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

async function Answer(req, res){
    const {answer, questionid} = req.body
    // const {answer, uname} = req.body

    if(!answer||!questionid){
        return res.status(StatusCodes.BAD_REQUEST).json({message: "Please provide Answer"})
    }
   
    // const questionid = req.question.questionid;
    try {
        // console.log(userid);
        const userid = req.user.userid;
        // const [qid] = await myconn.query("SELECT questionid from questions WHERE userid = (SELECT user_id from users WHERE user_name = ? )",[uname]);
        // console.log(qid);
        // const questionid = qid[0].questionid;
        // const questionid = req.question.questionid
        // console.log(questionid[0].questionid);

        let sqlAddToanswer =
        "INSERT INTO answers(userid, questionid, answer) VALUES (?,?,?)";

        const [results] = await myconn.query(sqlAddToanswer,[userid, questionid, answer]);
        // console.table(results)
        Id = results.insertId;        
        return res.status(StatusCodes.CREATED).json({message:"Answer is successfully Added"})
    
    } catch (error) {
        console.error(error.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Something went wrong, try it leter to answer"})
    }
}
module.exports = {allAnswers, Answer}