const EXPRESS = require('express');
const WS = require('ws');
const APP = EXPRESS();

const WSS = WS.Server({noServer: true});

APP.set('view engine', 'ejs');

APP.get('/', (req, res) => {
    res.render('index')
});

const SERVER = APP.listen(1729);

SERVER.on('upgrade', (req, socket, head) => {
    WSS.handleUpgrade((req, socket, res, socket) => {
        WSS.emit('connection', socket, req);
    })
})