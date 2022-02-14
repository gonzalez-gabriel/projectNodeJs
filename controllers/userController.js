const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UsersController = (User) => {

    // GET USERS
    const getUsers = async (req, res) => {
        const { query } = req;
        const response = await User.find(query);

        if(Object.keys(query).length > 0) {
            res.json(null);
        }

        res.json(response);
    }

    // POST USERS
    const postUsers = async (req, res) => {
        try{
            const user = new User(req.body);
            user.password = await bcrypt.hash(user.password, 2)
            await user.save();
            res.json(user);
        }catch(err){
            if(err.name === "ValidationError"){
                const errorObj = {};
                const keyError = Object.keys(err.errors)[0];
                errorObj[keyError] = err.errors[keyError].message;
                res.status(400).send(errorObj);   
            }         
        }
    }

    // GET USER BY ID
    const getUserById = async(req, res) => {
        try{
            const { params } = req;
            const response = await User.findById(params.userId);

            res.json(response);
        }catch(err){
            res.status(404).json(`${err.name}: Unknown Id`);
        }
    }

    // UPDATE USER BY ID
    const putUsers = async (req, res) => {
        try{
            const { body } = req;
            const response = await User.updateOne({
                _id: req.params.userId
            },
            {
                $set:{
                    firstName: body.firstName,
                    lastName: body.lastName,
                    userName: body.userName,
                    password: await bcrypt.hash(body.password, 2),
                    email: body.email,
                    address: body.address,
                    phone: body.phone
                }
            })
            res.json(response);
        }catch(err){
            res.status(404).json(`${err.name}: Unknown Id`);
        }
    }
    
    // DELETE USER BY ID
    const deleteUsers = async (req, res) => {
        try{
            const id = req.params.userId;

            await User.findByIdAndDelete(id);

            res.status(202).json('User has been deleted...');
        }catch(err){
            res.status(404).json(`${err.name}: Unknown Id`);
        }
    }

    // LOGIN
    const login = async (req, res) => {
        const {body} = req;
        const uploadedUser = await User.findOne({"userName": body.userName})
        let response;
        if(uploadedUser && await bcrypt.compare(body.password, uploadedUser.password)) {
            const token = generateToken(uploadedUser); 
            response = {message: "ok", token};
        }else{
            response = {message: "Invalid credentials"};
        }
        res.json(response);
    }

    // GENERATE A TOKEN
    const generateToken = uploadedUser => {
        const tokenPayload = {
            name: uploadedUser.name,
            lastName: uploadedUser.lastName,
            userName: uploadedUser.userName
        }
        return jwt.sign(tokenPayload, 'secret', { expiresIn: '48h' });
    }
    
    // FIND USER BY USER NAME WITH QUERY PARAMS
    const getUserByUserName = async (req, res, next) => {
        if(Object.keys(req.query).indexOf('userName') === -1){
            next();
            return;
        }

        const userName = req.query.userName;
        const response = await User.findOne({userName: userName});
        res.status(200).json(response);
    }

    return { getUsers, postUsers, getUserById,getUserByUserName, putUsers, deleteUsers, login };
}

module.exports = UsersController;

