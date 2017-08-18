# botbuilder-vega

Bot Framework Node.js plugin to enable sending Vega charts rendered to PNG in your bot's messages.

### Install
1.  `npm install botbuilder-vega --save`

### Usage
1. In your bot code, import the module: `var sendVega = require('botbuilder-vega');`
2. In your bot dialog, use `sendVega(session, "Message text", vegaSpec)` instead of `session.send()`.

### Example Bot
```js
var builder = require('botbuilder');
var restify = require('restify');
var sendVega = require('../lib/botbuilder-vega');

var countyUnemploymentMap = require('./charts/county-unemployment.vg.json');

// Server setup
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// Get secrets from server environment
var connector = new builder.ChatConnector({appId: process.env.MICROSOFT_APP_ID, appPassword: process.env.MICROSOFT_APP_PASSWORD});

// Create chat bot
var bot = new builder.UniversalBot(connector);

// Handle bot framework messages
server.post('/api/messages', connector.listen());

// root dialog
bot.dialog('/', function (session) {
    session.send('Sending chart example:');
    sendVega(session, "US County Unemployment Map", countyUnemploymentMap); 
});
```

**Example Output**
![example output](https://raw.githubusercontent.com/nwhitmont/botbuilder-vega/master/examples/example-chart-output.png)
