const express = require("express");
const router = express.Router();
const principalController = require("../controllers/principalController");
const upload = require("../config/upload");
const autenticacao = require("../config/autenticacao");

router.get("/galeria", autenticacao, principalController.abregaleria);

router.get("/postarfotos", autenticacao, principalController.postarfoto);

router.get("/postagem", 
  autenticacao,
  principalController.postagem);

router.get("/postagens", 
  autenticacao, 
  principalController.postagens);

router.get("/listaramigos", autenticacao, principalController.listaramigos);

router.get("/buscaramigos", autenticacao, principalController.buscaramigos);

router.get(
  "/buscarcomunidade",
  autenticacao,
  principalController.buscarcomunidade
);

router.get(
  "/minhascomunidades",
  autenticacao,
  principalController.minhascomunidades
);

router.get(
  "/criarcomunidade",
  autenticacao,
  principalController.criarcomunidade
);

router.post(
  "/postarfotos",
  autenticacao,
  upload.single("foto"),
  principalController.salvarfoto
);

router.post(
  "/postagem",
  autenticacao,
  principalController.salvarpostagem
);

router.post(
  "/criarcomunidade",
  autenticacao,
  upload.single("foto"),
  principalController.salvarcomunidade
);

router.get("/sair", autenticacao, principalController.sair);

module.exports = router;