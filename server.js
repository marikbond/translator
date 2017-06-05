var http = require('http');
var static = require('node-static');
var fileServer = new static.Server('./static');
var request = require('request');
var urlUtils = require('url');
var fs = require('fs');

function renderPage() {
    var htmlFile = fs.readFileSync('static/index.html', 'utf8');
    return htmlFile
        .replace('{{translation}}', '')
        .replace('{{text}}', 'Type your text');
}

function translate(req, res) {
    var data = urlUtils.parse(req.url, true).query;
    var host = 'https://translate.yandex.net/api/v1.5/tr.json/translate';
    var params = urlUtils.parse(host, true);
    params.query = {
        key: 'trnsl.1.1.20160509T202610Z.debc35a9979d7f99.45cb2d4468c993f78dd8f9be935d109d07cc5123',
        text: decodeURIComponent(data.text),
        lang: 'en-ru'
    };
    var options = {
        url: urlUtils.format(params),
        json: true
    };
    request.get(options, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            data.translation = body.text[0];
            res.writeHead(200, {"Content-Type": "text/html"});
            res.write(renderPage(data));
            res.end();
        }
    }, true);
}

function requestHandler(req, res) {
    var url = urlUtils.parse(req.url, true);

    if (url.pathname === '/' && req.method === 'GET') {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(renderPage());
        return;
    } else if (url.pathname === '/translate' && req.method === 'GET') {
        translate(req, res);
        return;
    }

    fileServer.serve(req, res);
}

var server = http.createServer(requestHandler);

var port = 8083;
server.listen(port, function () {
    console.log('Started at port: ' + port);
});