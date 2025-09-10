const express = require("express")
const router = express.Router()
const UserController = require("../controllers/userController")
const PokemonController = require("../controllers/pokemonController")
const verifyToken = require("../middleware/verifyToken")
const imageUpload = require("../middleware/image_upload")
const checkImage = require("../middleware/verifyImage")



// rotas para usuário
router.post('/user/register', UserController.register)
router.post('/user/login', UserController.login)
router.get('/user/check_user', UserController.checkUser)
router.get('/user/:id', UserController.getUserById)

router.patch('/user/:id', verifyToken, (request, response, next) => {
    imageUpload.single('photo')(request, response, function (err) {
        if(err) {
            // evitar que a imagem suba no servidor
            return checkImage(err, request, response, next)
        }
        UserController.editUser(request, response)
    })
})


// rotas para pokemons

router.post('/pokemon', verifyToken, PokemonController.addFavorite)
router.get('/pokemons/:user_id', verifyToken, PokemonController.getPokemons)
router.delete('/pokemon/:pokemon_id', verifyToken, PokemonController.remove)


module.exports = router
