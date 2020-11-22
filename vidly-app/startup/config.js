const config =require('config')
const { func } = require('joi')

module.exports = function(){
    if (!config.get("jwtPrivateKey")) {
        console.error('Fatal Error', 'Kye not defined');
        throw new Error('Fatal Error key not defined');
        process.exit(1);
      }
      
      
}