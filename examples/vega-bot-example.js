var builder = require('botbuilder');
var restify = require('restify');
var sendVega = require('../lib/botbuilder-vega').sendVega;

var countyUnemploymentMap = require('./charts/county-unemployment.vg.json');

//Server setup
var server = restify.createServer();

server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

//Get secrets from server environment
var connector = new builder.ChatConnector({appId: process.env.MICROSOFT_APP_ID, appPassword: process.env.MICROSOFT_APP_PASSWORD});

//Create chat bot
var bot = new builder.UniversalBot(connector);

//Handle bot framework messages
server.post('/api/messages', connector.listen());

/* Dialogs */
bot.dialog('/', function (session) {
    session.send('Sending chart example:');
    sendVega(session, "US County Unemployment Map", countyUnemploymentMap); 
});

// END OF LINE
