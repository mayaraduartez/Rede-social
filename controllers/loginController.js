const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");
const passport = require("../config/passport");

async function abreTela(req, res) {
  res.render("login/login.ejs");
}

const logar = passport.authenticate("local", {
  failureRedirect: "/",
  successRedirect: "/galeria",
});

async function cadastro(req, res) {
  var nome = req.body.nome;
  var email = req.body.email;
  var senha = req.body.senha;
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(senha, salt);
  const usuario = await Usuario.create({
    nome: nome,
    email: email,
    senha: hash,
  });
  res.redirect("/");
}

module.exports = { abreTela, logar, cadastro };
