var express = require('express');
var router = express.Router();
var Mapa = require('../controllers/mapa')

/* GET home page. */
router.get('/api/cidades', function(req, res, next) {

  if(req.query['distrito'] != undefined){
    var cidades = []

    Mapa.ListarporDistritos(req.query['distrito'])
    .then(dados =>{
      res.status(200).jsonp(dados)
    })
    .catch( e => {
      res.status(504).jsonp({erro : e})
    })
  }

  else{
    Mapa.listarCidade()
  .then(dados =>{
    res.status(200).jsonp(dados)
  })
  .catch( e => {
    res.status(504).jsonp({erro : e})
  })
  }  
});

router.get('/api/cidades/nomes', function(req, res, next) {
  Mapa.ListarNomes()
  .then(dados =>{
    res.status(200).jsonp(dados)
  })
  .catch( e => {
    res.status(504).jsonp({erro : e})
  })
});



router.get('/api/distritos', function(req, res, next) {
  //Devolve uma lista de distritos em que para cada distrito apresenta os campos:
  // nome do distrito e lista de cidades pertencentes ao distrito (apenas id e nome de cada cidade).
  var distritos = {}
  Mapa.ListarDistritos()
  .then(dados =>{
    dados.forEach(cidade => {
      if(distritos[cidade.distrito] == undefined){
        distritos[cidade['distrito']] = [{nome: cidade['nome'], id : cidade['id']}]
      }
      else{
        distritos[cidade['distrito']].push({nome: cidade['nome'], id : cidade['id']}) 
      }
    });
    res.status(200).jsonp(distritos)
  })
  .catch( e => {
    res.status(504).jsonp({erro : e})
  })
});

router.get('/api/ligacoes', function (req, res, next) {
  var query = req.query
  if (query['origem']) {
    Mapa.listarCidade()
      .then(data => {
        var cidades = {}
        data.forEach(cidade => {
          cidades[cidade.id] = cidade.nome
        })
        Mapa.listarLigacao(query['origem'])
          .then(dados => {
            var ligacoes = []
            dados.forEach(o => {
              ligacoes.push({ 'id': o.id, 'destino': o.destino, 'nome': cidades[o.destino] })
            })
            res.status(200).jsonp(ligacoes)
          })
          .catch(error => res.render('error', { error: error }))
      })
      .catch(error => res.render('error', { error: error }))
  }
  else if (query['dist']) {
    
    Mapa.listarCidade()
      .then(data => {
        var cidades = {}
        data.forEach(c => cidades[c.id] = c.nome)
        Mapa.consultarDistancia()
          .then(dados => {
            var ligacoes = []
            dados.forEach(o => {
              if (o.distancia >= query['dist']) {
                ligacoes.push({ 'id': o.id, 'idOrigem': o.origem, 'nomeOrigem': cidades[o.origem], 'idDestino': o.destino, 'nomeDestino': cidades[o.destino] })
              }
            })
            res.status(200).jsonp(ligacoes)
          })
          .catch(error => res.render('error', { error: error }))
      })
      .catch(error => res.render('error', { error: error }))
  }

})




router.get('/api/cidades/:id', function(req, res, next) {
  Mapa.consultarCidade(req.params.id)
  .then(dados =>{
    res.status(200).jsonp(dados)
  })
  .catch( e => {
    res.status(504).jsonp({erro : e})
  })
});




module.exports = router;
