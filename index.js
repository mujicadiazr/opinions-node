var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.set('port', (process.env.PORT || 5000));

var querystring = require('querystring');
var http = require('http');

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

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
