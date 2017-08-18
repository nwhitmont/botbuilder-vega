var vega = require('vega');
var builder = require('botbuilder');

exports.sendVega = function (session, messageText, vegaSpec) {
    var view = new vega
        .View(vega.parse(vegaSpec))
        .renderer('none')
        .initialize();

    view
        .toCanvas()
        .then(function (canvas) {
            var pngString = canvas
                .toBuffer()
                .toString('base64')
            var message = new builder
                .Message(session)
                .text(messageText);
            message.addAttachment({
                contentType: 'image/png',
                contentUrl: 'data:image/png;base64,' + pngString,
                name: 'Chart name'
            });
            // send message with attached image stream
            session.send(message);
        })
}
// END OF LINE
