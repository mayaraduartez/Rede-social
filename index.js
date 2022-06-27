const express = require("express");
const app = express();
const path = require("path");
const porta = process.env.PORT || 3000;
var session = require("express-session");
const passport = require("passport");

const loginRoute = require("./routes/loginRoute");

//configuração dos arquivos de visão (VIEWS)
app.set("view engine", "ejs");

//configura para receber dados por metodo post
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

app.listen(porta, function () {
  console.log("Servidor funcionando!");
});