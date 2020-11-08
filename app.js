const http = require ('http');

const server = http.createServer((req,res)=>{

    if(req.url === '/'){

        res.write('hello Node');
        res.end();
    }
});

// server.on('connection',(socket)=>{

//     console.log('new Connection');
// });

server.listen(3000);

console.log("listening on port 3000");
