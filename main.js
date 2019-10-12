const express = require('express')
const port = 8080;
var path = require('path');
app = express()
app.use(express.static('public'));

app.get("/", function(req, res) {
    res.sendfile("html/home.html")
 });

 app.get("/search/", function(req, res) {
    res.sendfile("html/search.html")
 });

 app.get(/^(.+)$/, function(req, res){ 
    res.sendFile( __dirname + "/html/"+req.params[0]); 
});

 app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.status(err.status || 500);
    res.sendFile("html/404.html")
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))