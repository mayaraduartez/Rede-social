const Foto = require("../models/Foto");
const Postagem = require("../models/Postagem");
const Comunidade = require("../models/Comunidade");

async function abregaleria(req, res) {
  const fotos = await Foto.findAll({
    where: {
      UsuarioId: req.user.id,
    },
  }).catch(function (err) {
    console.log(err)
  });
  res.render("principal/galeria", { Fotos: fotos, Usuario: req.user });
}

async function postarfoto(req, res) {
  res.render("principal/postarfoto", {Usuario: req.user});
}

async function postagem(req, res) {
  res.render("principal/postagem", {Usuario: req.user});
}

async function postagens(req, res) {
  const postagens = await Postagem.findAll({
    where: {
      UsuarioId: req.user.id,
    }, include: 'Usuario'
  }).catch(function (err) {
    console.log(err)
  });
  res.render("principal/postagens" , {Postagens: postagens, Usuario: req.user});
}

async function listaramigos(req, res) {
  res.render("principal/listaramigos",{Usuario: req.user});
}

async function buscaramigos(req, res) {
  res.render("principal/buscaramigos",{Usuario: req.user});
}

async function criarcomunidade(req, res) {
  res.render("principal/criarcomunidade",{Usuario: req.user});
}

async function buscarcomunidade(req, res) {
      Comunidade.find({ nome: new RegExp(req.body.pesquisar, "i") }).then(function (
        docs
      ) {
        res.render("minhascomunidades.ejs", { Comunidade: docs });
      });
      res.render("principal/minhascomunidade",{Comunidade: req.user});
} 


async function minhascomunidades(req, res) {
    const comunidades = await Comunidade.findAll({
      where: {
        UsuarioId: req.user.id,
      }, include: 'Usuario'
    }).catch(function (err) {
      console.log(err)
    });
    res.render("principal/minhascomunidades" , {Comunidades: comunidades, Usuario: req.user});
}

async function salvarfoto(req, res) {
  const foto = await Foto.create({
    foto: req.file.filename,
    descricao: req.body.descricao,
    data: new Date(),
    UsuarioId: req.user.id,
  });
  res.redirect("/galeria");
};

async function salvarpostagem(req, res) {
  const postagem = await Postagem.create({
    descricao: req.body.descricao,
    titulo: req.body.titulo,
    data: new Date(),
    UsuarioId: req.user.id,
  }).catch(err=>{
    console.log(err)
  });
  res.redirect("/postagens");
};

async function salvarcomunidade(req, res){
  const comunidade = await Comunidade.create({
    foto: req.file.filename,
    nome: req.body.nome,
    descricao: req.body.descricao,
    UsuarioId: req.user.id,
  }).catch(err=>{
    console.log(err)
  });
  res.redirect("/minhascomunidades");
};

async function sair(req, res) {
  req.logout(function(err){
    if(err){
      return next(err);
    }
    res.redirect("/");
  });
}

module.exports = {
  abregaleria,
  postarfoto,
  postagens,
  listaramigos,
  postagem,
  buscaramigos,
  buscarcomunidade,
  minhascomunidades,
  criarcomunidade,
  salvarfoto,
  sair,
  salvarpostagem,
  salvarcomunidade,
};