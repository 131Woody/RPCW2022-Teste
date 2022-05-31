var Ligacao = require('../models/ligacao') //import do modelo
var Cidade = require('../models/cidade') //import do modelo
const mongoose = require('mongoose') 



module.exports.listarCidade = () =>{ //=>   Devolve a lista das cidades, com os campos: id, nome, e distrito;
    return Cidade
        .find({},{_id:0, distrito:1, nome:1, id:1}) 
        .exec()
}

module.exports.consultarCidade = (id) =>{
    //console.log(id)
    return Cidade
        .findOne({id: id}, {_id:0}) // -> seleção
        .exec()
}

module.exports.consultarNomeCidade = (id) =>{
    //console.log(id)
    return Cidade
        .findOne({id: id}, {_id:0}) // -> seleção
        .exec()
}

module.exports.ListarNomes = () =>{
    //console.log(id)
    return Cidade
        .find({}, {_id:0, nome:1}) // -> seleção
        .sort({nome:1})
        .exec()
}

module.exports.ListarporDistritos = (d) =>{
    //console.log(id)
    return Cidade
        .find({distrito:d}, {_id:0, nome:1, id:1}) // -> seleção
        .exec()
}

module.exports.ListarDistritos= () =>{
    //console.log(id)
    return Cidade
        .find({}, {_id:0, nome:1, id:1, distrito:1}) // -> seleção
        .sort({nome:1})
        .exec()
}

module.exports.listarLigacao = (o) =>{ //=>   
    return Ligacao
        .find({origem:o},{ destino: 1, id: 1}) 
        .sort()
        .exec()
}

module.exports.consultarDistancia = () => {
    return Ligacao
        .find({}, { _id: 0, id: 1, origem: 1, destino: 1, distancia: 1 })
        .exec()
}


