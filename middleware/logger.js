function log(req,res,next){
    console.log('Logg ...');
    next();
}

module.exports = log;