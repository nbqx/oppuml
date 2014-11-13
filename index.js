var h = require('virtual-dom/h'),
    createElement = require('virtual-dom/create-element'),
    through = require('through2');

function createOutline(text,c){
  return (c!==undefined)?
    h('outline',{text: text},c) : h('outline',{text: text});
};

function recur(dt,m){
  var m = (m===undefined)? [] : m;
  
  for(var k in dt){
    var v = dt[k];
    if(Array.isArray(v)){

      m.push(createOutline(k,v.reduce(function(p,o){
        if(typeof o == 'string'){
          p.push(createOutline(o));
        }else{
          p.push(recur(o,p));
        }
        return p
      },[])));
      
    }else{
      m.push(createOutline(k,recur(v)));
    }
  }

  return m
};

function createOPML(data){
  return h('opml',{version: "1.0"},[
    h('head', {title: data.title, ownerName: data.author}),
    h('body', recur(data.content))
  ]);
};

function oppuml(data){
  return [
    '<?xml version="1.0" encoding="UTF-8" standalone="no"?>',
    createElement(createOPML(data)).toString()
  ].join('')
};

oppuml.createStream = function(){
  return through.obj(function(obj,e,next){
    this.push(oppuml(obj));
    next();
  });
};

module.exports = oppuml;
