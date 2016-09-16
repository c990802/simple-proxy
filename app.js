const Hapi              = require('hapi');
const h2o2              = require('h2o2');

const plugins = [
  h2o2
];


const server = new Hapi.Server({
  connections: {
    routes: {
      cors: true
    }
  }
});


const mainRoute = {
  // method  : ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'OPTIONS'],
  method  : '*',
  path    : '/{path*}',
  handler : {
    proxy: {
      host     : process.env.PROXY_HOST,
      port     : process.env.PROXY_PORT,
      protocol : process.env.PROXY_PROTOCOL,
      passThrough: true
      // mapUri   : function(req, callback){
      //   console.log(111, req.url)
      // }
    }
  }
};


server.connection({ port: process.env.PORT || 3001});


server.register(plugins).then(function(){

  server.route(mainRoute);

  return server.start((err)=>{
    console.log('Server started at: ' + server.info.uri);
  });

}).catch((err)=>{
  console.error(err);
})

module.exports = server;
