//database
const myconn = require("../DB/dbconn")
const bcrypt = require('bcrypt');
const {StatusCodes} = require('http-status-codes');
const jwt = require('jsonwebtoken')

async function register(req, res){
    const {username, firstname,lastname,email,password} = req.body
    
    try {
        console.table(req.body)

        if(!username||!firstname||!lastname||!email||!password){
            return res.status(StatusCodes.BAD_REQUEST).json({message: "Please provide all information"})
        }
             // To use it as a foreign key
        const [existinguser] = await myconn.query("SELECT user_name from users WHERE user_name = ?",[username]);
        if(existinguser.length > 0){
            return res.status(StatusCodes.BAD_REQUEST).json({message:"Already user registered with this name, please register with other user name!!"})
        }
        if(password.length < 6){
            return res.status(StatusCodes.BAD_REQUEST).json({message:"Password length must be at least 6 character"})
        }
          //  to hash the password
        // const saltRounds = 10;
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password, salt);

        let sqlAddTousers =
        "INSERT INTO users(user_name, first_name,last_name,email,password) VALUES (?,?,?,?,?)";

        const [results] = await myconn.query(sqlAddTousers,[username, firstname,lastname,email,hashpassword]);
        console.table(results)
        Id = results.insertId;
        console.log(Id)
        // return res.status(201).json({msg:"Data inserted"})
        return res.status(StatusCodes.CREATED).json({message:"Data inserted"})
    }catch(e){
            console.error(e.message);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Something went wrong, try it leter"})
    }       
}
async function login(req, res){
    const {email, password} = req.body
     //check Whether email and password is fullfiled or not. 
     if(!email||!password){
        return res.status(StatusCodes.BAD_REQUEST).json({message: "Please provide all information"})
    }
    try{
       
        const [user] = await myconn.query("SELECT user_name,user_id, password from users WHERE email = ?",[email]);
        console.log(user);
        if(user.length == 0){
            return res.status(StatusCodes.BAD_REQUEST).json({message: "invalid credential"})
        }
        //compare password
        const ispasswordMatch = await bcrypt.compare(password, user[0].password)        
        if(!ispasswordMatch){
            return res.status(StatusCodes.BAD_REQUEST).json({message: "invalid credential"})
        }
        const username= user[0].user_name
        const userid= user[0].user_id

        const token = jwt.sign({username, userid}, process.env.JWT_SECURT, {expiresIn:"1d"})
        return res.status(StatusCodes.OK).json({message: "login successfully",token, username})
    }   
    catch(e){
        console.error(e.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Something went wrong, try it leter"})
    }
}

async function check(req, res){
    const username = req.user.username
    const userid = req.user.userid
    return res.status(StatusCodes.OK).json({message: "valid user",username,userid})
}

module.exports = {register, login, check}