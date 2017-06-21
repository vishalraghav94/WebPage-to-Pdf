var system = require('system');
var page = require('webpage').create();
var pageWidth = system.args[2];
var pageHeight = system.args[3];
page.viewportSize= { width: pageWidth, height: pageHeight};
var address = system.args[1];
page.open(address, function() {
  page.render('output.pdf');
  phantom.exit();
});
