const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt"); //importei a biblioteca de criptografar a senha
//cria as funções
const passport = require("../config/passport");
async function abreTela(req, res) {
  res.render("login/login.ejs"); //render renderiza o arquivo ejs
}

const logar = passport.authenticate("local", {
  failureRedirect: "/",
  successRedirect: "/logado",
});

async function cadastro(req, res) {
  var nome = req.body.nome;
  var email = req.body.email;
  var senha = req.body.senha;
  var salt = bcrypt.genSaltSync(10);
  console.log(salt);
  var hash = bcrypt.hashSync(senha, salt);
  console.log(hash);
  const usuario = await Usuario.create({
    nome: nome,
    email: email,
    senha: hash,
  });
  res.redirect("/");
}

module.exports = { abreTela, logar, cadastro }; //exporta as funções
