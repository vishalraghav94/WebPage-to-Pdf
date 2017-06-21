var express = require('express');
var fs = require('fs');
var path = require('path');
var phantomjs = require('phantomjs-prebuilt');
var router = express.Router();
var childProcess = require('child_process');
var binPath = phantomjs.path;
function puts(error, stdout, stderr){
    console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        if (error !== null) {
            console.log(`exec error: ${error}`);
        }}
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
})

router.get('/generate', function (req, res, next) {
var url= req.query.docUrl;
var pdfWidth = req.query.screenWidth;
    var pdfHeight = req.query.screenHeight;
    console.log(pdfHeight);
    var childArgs = [
        path.join(__dirname, 'phantom.js'),
        url,
        pdfWidth,
        pdfHeight
    ];
    childProcess.execFile(binPath, childArgs, puts);
    setTimeout(function(){
        var file = path.join(".","output.pdf");
        var stat = fs.statSync("./output.pdf");
        res.setHeader('Content-Length', stat.size);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=observationPrint.pdf');
        res.sendfile(file);

    },5000);

   setTimeout(function(){
       fs.unlink("./output.pdf");
   },7000);
});

module.exports = router;
