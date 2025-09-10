const checkSession = (request, response, next) => {
  if (request.session && request.session.user) {
    request.user = request.session.user
    return next()
  } else {
    return response.status(401).json({
      status: false,
      message: "Usuário não autenticado. Faça login para acessar."
    })
  }
}

module.exports = checkSession
