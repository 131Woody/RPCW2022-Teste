var express = require('express');
var router = express.Router();
var axios = require('axios')

apikey = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTRlY2VhNmI1ZDVjMjQ3NmNmMDhiMSIsImxldmVsIjozLjUsImVudGlkYWRlIjoiZW50X0EzRVMiLCJlbWFpbCI6InJwY3cyMDIyQGdtYWlsLmNvbSIsImlhdCI6MTY1NDAxNTIyNSwiZXhwIjoxNjU0MDQ0MDI1fQ.mhfFaMn-2t2vllEvPFPmGfvJnHM0W7ViPPlem_OpMNwW9td-3fFvqUXXYy6BKWm0KiwlxiUHkU4A81o5kuo8S3zzQGpYNZbkWEXIYtjyq4DW-h3_yfUjp6oth6rPtwnTzjYnDcQf8naLg88j8W73gZNg8cyyOIopheSiEeGW61JVON97xIQ3XGpLkzvf61HeLkuwzGXFmkBSH0fL4zEfSP5Apb5X4VcvsFj4dpQAfJT_WaiboVUjGvLzCnu-52eDEjwF1QhyYVnHvW5ZQ_Q_flsx89fh2FpNRxi40jFX_whHXDpuyO22JZ2BCKa5e8rQjmdUzHMlCo3lJrYp-WO3wA"
/* GET home page. */
router.get('/', function(req, res, next) {
  
  res.render('index', { title: ' Lista Consolidada ' });
});

router.get('/classes/', function(req, res, next) {
  axios.get("http://clav-api.di.uminho.pt/v2/classes?nivel=1&token=" + apikey)
    .then(resposta =>{
      var data = resposta.data
      res.render('classesn1', {dados: data})
    })
    .catch(function(erro){
      res.render('error', { erro: 'erro' });
    })
});

router.get('/classe/:id/', function(req, res, next) {
  axios.get("http://clav-api.di.uminho.pt/v2/classes/c" + req.params.id + "?token=" + apikey)
    .then(resposta =>{
      var data = resposta.data
      res.render('classe', {dados: data})
    })
    .catch(function(erro){
      res.render('error', { erro: 'erro' });
    })
});

router.get('/termos/', function(req, res, next) {
  axios.get("http://clav-api.di.uminho.pt/v2/termosIndice?token=" + apikey)
    .then(resposta =>{
      var data = resposta.data
      res.render('termos', {dados: data})
    })
    .catch(function(erro){
      res.render('error', { erro: 'erro' });
    })
});

module.exports = router;
