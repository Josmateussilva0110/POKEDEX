const express = require("express")
const router = express.Router()
const UserController = require("../controllers/userController")
const PokemonController = require("../controllers/pokemonController")
const checkSession = require("../middleware/verifyToken")
const imageUpload = require("../middleware/image_upload")
const checkImage = require("../middleware/verifyImage")



// rotas para usuário
router.post('/user/register', UserController.register)
router.post('/user/login', UserController.login)
router.get('/user/session', UserController.session)
router.get('/user/:id', UserController.getUserById)
router.post('/user/logout', UserController.logout)

router.patch('/user/:id', checkSession, (request, response, next) => {
    imageUpload.single('photo')(request, response, function (err) {
        if(err) {
            // evitar que a imagem suba no servidor
            return checkImage(err, request, response, next)
        }
        UserController.editUser(request, response)
    })
})


// rotas para pokemons

router.post('/pokemon', checkSession, PokemonController.addFavorite)
router.get('/pokemons/:user_id', checkSession, PokemonController.getPokemons)
router.delete('/pokemon/:pokemon_id', checkSession, PokemonController.remove)


module.exports = router
