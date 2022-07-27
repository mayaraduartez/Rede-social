const express = require("express");
const app = express();
const path = require("path");
const porta = process.env.PORT || 3030;
var session = require("express-session");
var passport = require("passport");

const loginRoute = require("./routes/loginRoute");
const principalRoute = require("./routes/principalRoute");

const Foto = require("./models/Foto");
const Usuario = require("./models/Usuario");
const Postagem = require("./models/Postagem");
const Comunidade = require("./models/Comunidade");

Foto.belongsTo(Usuario);
Usuario.hasMany(Foto);

Postagem.belongsTo(Usuario);
Usuario.hasMany(Postagem);

Comunidade.belongsTo(Usuario);
Usuario.hasMany(Comunidade);

//configuração dos arquivos de visão (VIEWS)
app.set("view engine", "ejs");

//configurar para receber dados por metodo post
app.use(express.urlencoded({ extended: false }));

//pasta de arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.authenticate("session"));

app.use("/", loginRoute);

app.use("/", principalRoute);


app.get("/teste", async function (req, res) {
  const foto = await Foto.create({
    nome: "oi.jpg",
    descricao: "Oi",
    data: new Date(),
    UsuarioId: 1,
  }).catch((err) => {
    console.log(err);
  });
  console.log(foto);
});

app.listen(porta, function () {
  console.log("Servidor funcionando!");
});