var http = require('http');
            var fs = require('fs');

            http.createServer(function (req,res){
                if(req.url === 'src/index.html') {
                fs.readFile('src/index.html',function(err,data){
                res.writeHead(200,{'Content-Type': 'text/html'});
                res.write(data);
                res.end();
              });
                }
                else if(req.url === 'css/styleform.css') {
                fs.readFile('css/styleform.css',function(err,data){
                res.writeHead(200,{"Content-Type": "text/css"});
                res.write(data);
                res.end();
                });
                }

            }).listen(3000); 
