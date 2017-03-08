var app = require('express')();
var server = require('http').createServer(app);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

var io = require('socket.io')(server);
var querystring = require('querystring');

app.set('port', (process.env.PORT || 5000));


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get('/', function (req, res) {
    res.send('Opinions-node server running :)');
});

io.sockets.on('connection', function (socket) {
    console.log('Client connected');
    socket.on('disconnect', () => console.log('Client disconnected'));
    
    socket.on('vote_up',function (info) {
        var values = querystring.stringify(info);
        
        //VIA POST
        // var options = {
        //     hostname: 'localhost',
        //     port: '8000',
        //     path: '/plus/',
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'x-www-form-urlencoded',
        //         'Content-Length': values.length
        //     }
        // }

        //VIA GET
        var options = {
            hostname: 'localhost',
            port: '8000',
            path: '/plus/' + info.enlace_id,
            method: 'GET'
        }

        var req = http.request(options, function (res) {
           console.log('Vino de vuelta');
           res.setEncoding('utf8');
           res.on('data', function (data) {
               console.log('Emitiendo: '+data);
               io.sockets.emit('vote_updated', data); 
           }); 
        });

        req.write(values);
        req.end();
    });

    socket.on('vote_down',function (info) {
        var values = querystring.stringify(info);
        
        //VIA POST
        // var options = {
        //     hostname: 'localhost',
        //     port: '8000',
        //     path: '/plus/',
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'x-www-form-urlencoded',
        //         'Content-Length': values.length
        //     }
        // }

        //VIA GET
        var options = {
            hostname: 'localhost',
            port: '8000',
            path: '/minus/' + info.enlace_id,
            method: 'GET'
        }

        var req = http.request(options, function (res) {
           console.log('Vino de vuelta');
           res.setEncoding('utf8');
           res.on('data', function (data) {
               console.log('Emitiendo: '+data);
               io.sockets.emit('vote_updated', data); 
           }); 
        });

        req.write(values);
        req.end();
    });
});


//Listening



// server.listen(process.env.PORT || 5000, function () {
//     console.log('HTTP Server listening on port 5000');
// });
