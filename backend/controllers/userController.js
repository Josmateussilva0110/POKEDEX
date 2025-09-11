const User = require("../models/User")
const bcrypt = require("bcrypt")
const userToken = require("../utils/userToken")
const getToken = require("../utils/getToken")
const jwt = require("jsonwebtoken")
const getUserAndToken = require("../utils/getUserAndToken")
const FieldValidator = require("../utils/userValidator")
require('dotenv').config({ path: '../.env' })

class UserController {
    async register(request, response) {
        const { name, email, password, confirm_password, photo} = request.body

        const error = FieldValidator.validate({
            name, 
            email,
            password,
            confirm_password
        })

        if (error) {
            return response.status(422).json({ status: false, message: error })
        }

        var emailExists = await User.emailExists(email)
        if(emailExists) {
            response.status(422).json({status: false, message: "Email já existe."})
            return 
        }
        
        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(password, salt)

        try {
            const done = await User.save(name, email, passwordHash, photo)
            if(!done) {
                return response.status(500).json({status: false, message: "Erro ao cadastrar usuário."})
            }
            else {
                const user = await User.findByEmail(email) 
                if(!user) {
                    return response.status(400).json({status: false, message: "Erro ao criar token para usuário."})
                }
                else {
                    // criar token
                    return await userToken(user, request, response)
                }
            }

        } catch(err) {
            return response.status(500).json({status: false, message: err.message})
        }
    }

    async login(request, response) {
        const { email, password } = request.body

        const error = FieldValidator.validate({ email, password })
        if (error) return response.status(422).json({ status: false, message: error })

        const user = await User.findByEmail(email)
        if (!user) return response.status(404).json({ status: false, message: "Email não encontrado." })

        const checkPassword = await bcrypt.compare(password, user.password)
        if (!checkPassword) return response.status(422).json({ status: false, message: "Senha incorreta." })

        request.session.user = { id: user.id, name: user.name}

        return response.status(200).json({
            success: true,
            message: "Login feito com sucesso",
            user: { id: user.id, name: user.name }
        })
    }


    async logout(request, response) {
        request.session.destroy(err => {
            if (err) {
                return response.status(500).json({ success: false, message: "Erro ao sair" })
            }
            response.clearCookie('connect.sid')
            return response.status(200).json({ success: true, message: "Logout feito com sucesso" })
        })
    }


    async checkUser(request, response) {
        let currentUser
        //console.log(request.headers.authorization)
        if(request.headers.authorization) {
            const token = getToken(request)
            const decoded = jwt.verify(token, process.env.SECRET)
            currentUser = await User.findById(decoded.id)
            currentUser.password = undefined
        }
        else {
            currentUser = null
        }

        response.status(200).send(currentUser)
    }

    async getUserById(request, response) {
        const id = request.params.id
        const error = FieldValidator.validate({id})

        if (error) {
            return response.status(422).json({ status: false, message: error })
        }

        var user = await User.findById(id)
        if(!user) {
            return response.status(404).json({status: false, message: "Usuário não encontrado."})
        }
        response.status(200).json({status: true, user})
    }

    async editUser(request, response) {
        var update = {}
        const id = request.params.id 
        const {name, email} = request.body

        const error = FieldValidator.validate({ id, name, email })
        if (error) return response.status(422).json({ status: false, message: error })

        update.name = name
        update.email = email

        if(!request.session && request.session.user) {
            return response.status(401).json({status: false, message: "Usuário não autenticado."})
        }
        
        const user = await User.findById(id)
        if(!user) {
            return response.status(404).json({status: false, message: "Usuário não encontrado."})
        }

        if (parseInt(id) !== request.session.user.id) {
            return response.status(403).json({status: false, message: "Operação não permitida. Token não corresponde."})
        }

        const emailExists = await User.emailExists(email)
        if(user.email !== email && emailExists) {
            return response.status(422).json({status: false, message: "Email já existe."})
        }

        if(request.file) {
            update.photo = request.file.filename
        }

        try {
            var done = await User.update(id, update)
            if(!done) return response.status(422).json({status: false, message: "Erro ao atualizar usuário."}) 
            const userUpdate = await User.findById(id)
            return response.status(200).json({status: true, message: "Dados atualizados com sucesso.", user: userUpdate})
        } catch(err) {
            return response.status(500).json({status: false, message: err})
        }
    }

    async session(request, response) {
        if (request.session && request.session.user) {
            return response.status(200).json({ success: true, user: request.session.user })
        } else {
            return response.status(401).json({ success: false, message: "Usuário não autenticado" })
        }
    }


}

module.exports = new UserController()
