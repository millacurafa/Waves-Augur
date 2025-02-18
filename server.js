const express = require('express');
const app = express();

const port = process.env.PORT || 5000;

const httpServer = app.listen(port, () => {
    console.log(__dirname); // eslint-disable-line no-console
    console.log('Listening Port ' + port); // eslint-disable-line no-console
});

if (process.env.DAPP) {
    require('./node/contract_legacy');
}
require('./node/contract')(app, httpServer);
require('./node/upload')(app);

app.use(function(req, res, next) {
    if (req.header('x-forwarded-proto') == 'http') {
        res.redirect(301, 'https://' + req.headers.host + req.url);
        return;
    }
    next();
});
app.use(express.static(__dirname + '/dist'));

app.get('/get-dapp-info', (req, res) => {
    res.send({
        DAPP: process.env.DAPP,
        APP_DAPP_NETWORK: process.env.APP_DAPP_NETWORK,
        NODE_URL: process.env.NODE_URL
    });
});

app.get('/*', (req, res) => {
    res.sendFile('index.html', { root : __dirname + '/dist'});
});

//require('./node/contract');