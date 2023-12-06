const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const userRegister = async (request, response) => {

    try {
        const { name, email, mobile, password, image } = request.body;
        const emailAlreadyExists = await User.findOne({ email });
        if (emailAlreadyExists) {
            response.status(400).send({
                Success: false,
                message: "Oops... email is already exits"
            })
        }
        const passwordBcrypt = await bcrypt.hash(password, 10);

        const user = new User({

            name,
            email,
            mobile,
            password: passwordBcrypt,
            image: 'images' + request.file.filename
        })

        const userData = await user.save();
        response.status(201).send({
            Success: true,
            message: "Registration  Successfully Completed",
            userdata: userData
        })

    } catch (error) {
        response.status(400).send({ error: error.message });
    }

}



module.exports = { userRegister };