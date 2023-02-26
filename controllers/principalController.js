const Foto = require("../models/Foto");
const Postagem = require("../models/Postagem");
const Comunidade = require("../models/Comunidade");
const Usuario = require("../models/Usuario");
const Amigo = require("../models/Amigo");
const { Op } = require("sequelize");

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
  const amigos = await Amigo.findAll({
    where: {
      [Op.or]: [{ idsolicitado: req.user.id}, { idsolicitante: req.user.id}],
    },
  });
  const usuarios = await Usuario.findAll({
    where: {
      [Op.not]: [{ id: req.user.id}],
    },
  });

  res.render("principal/buscaramigos",{Usuarios: usuarios , Solicitados: amigos, });
}

async function buscaramigosfiltro(req, res) {
  const amigos = await Amigo.findAll({
    where: {
      [Op.or]: [{ idsolicitado: req.user.id}, { idsolicitante: req.user.id}],
    }, //busca todas as solicitações de amizade do usuário logado
  });
  const usuarios = await Usuario.findAll({
    where: {
      [Op.not]: [{ id: req.user.id}],//não quero o meu user na lista
      nome: {
        [Op.iLike]: "%" + req.body.pesquisar + "%",
      },
    },
  });
  res.render("principal/buscaramigos",{Usuarios: usuarios, Solicitados: amigos,});
}


async function criarcomunidade(req, res) {
  res.render("principal/criarcomunidade",{Usuario: req.user});
}


async function minhascomunidadesbuscar(req, res) {
  console.log(req.body)
      Comunidade.findAll({where:{ nome:{[Op.iLike]:"%"+req.body.pesquisar+"%"}}}).then(function (
        docs
      ) { console.log(docs);
        res.render("principal/minhascomunidades.ejs", { Comunidades: docs, Usuario: req.user });
      });
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

async function adicionaramigo(req, res){
  const usuarios = await Usuario.findByPk(req.user.id);
  const amigo = await Usuario.findByPk(req.params.id);
  await usuarios.addSolicitante(amigo, {
    through: {
      datasolicitacao: new Date(),
      dataaceito: new Date(),
      situacao: "P",
    },
  });
  res.redirect("/buscaramigos");
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
  buscaramigosfiltro,
  minhascomunidadesbuscar,
  minhascomunidades,
  criarcomunidade,
  salvarfoto,
  sair,
  salvarpostagem,
  salvarcomunidade,
  adicionaramigo,
};