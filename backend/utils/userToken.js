require('dotenv').config({ path: '../.env' })


const createToken = async (user, request, response) => {
  
    request.session.user = { id: user.id, name: user.name }

    response.status(200).json({
        status: true,
        message: "Autenticação feita.",
        user: { id: user.id, name: user.name }
    })
}

module.exports = createToken
