const express = require("express")
const cors = require("cors")
const session = require("express-session")
const pgSession = require("connect-pg-simple")(session)
const { Pool } = require("pg")
require('dotenv').config({ path: '../.env' })

const router = require("./routes/routes")

const app = express()

// Pool do Postgres
const pgPool = new Pool({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.PORT,
  database: process.env.DATABASE,
})

app.use(express.json())
app.use("/images", express.static("public/images"))

app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true, 
  })
)


app.use(
  session({
    store: new pgSession({
      pool: pgPool,
      tableName: "session",
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 dia
      secure: false, // true se usar https
      httpOnly: true,
      sameSite: "lax", // pode ser 'strict' ou 'none' (se usar https)
    },
  })
)

app.use("/", router)

app.listen(8080, () => console.log("Servidor rodando 🚀"))
