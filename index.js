var io = require('socket.io').listen(8008);

var querystring = require('querystring');
var http = require('http');

io.sockets.on('connection', function (socket) {
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


