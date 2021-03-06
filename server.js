var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto'); 
var bodyParser = require('body-parser');

var config = {
   host: 'db.imad.hasura-app.io',
   user: 'alefiyahmarshal',
   password: process.env.DB_PASSWORD,
   database: 'alefiyahmarshal',
   port: '5432',
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());

var title;
var heading;
var date;
var content;
var articles = { 
    'article-one' : {
        title : 'Article One | Alefiyah Marshal',
        heading : ' Article one',
        date : 'feb 8,2017',
        content:
           `<p>
               This is the content of my new article.This is the content of my new article.This is the content of my new article.This is the content of my new article.
            </p>
            <p>
               This is the content of my new article.This is the content of my new article.This is the content of my new article.This is the content of my new article.
            </p>
            <p>
               This is the content of my new article.This is the content of my new article.This is the content of my new article.This is the content of my new article.
            </p>`
    
    },
    'article-two' : {
        title : 'Article Two | Alefiyah Marshal',
        heading : ' Article Two',
        date : 'feb 9,2017',
        content:
           `<p>
               This is the content of my second article.
            </p>`
           
    },
    'article-three' : {
        title : 'Article Three | Alefiyah Marshal',
        heading : ' Article three',
        date : 'feb 10,2017',
        content:
           `<p>
               This is the content of my third article.
            </p>`
    
    }
   
};
function createTemplate(data){ 
 var title = data.title;
 var heading = data.heading;
 var date = data.date;
 var content = data.content;
 var htmlTemplate = `
    <html>
    <head>
     <title>
        ${title}
     </title>
     <meta name="viewport" content="width-device-width,intial-scale=1"/>
     <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
    <div class="container">
        <div>
        <a href="/">Home</a>
        </div>
    <hr/>
    <h3>
        ${heading}
    </h3>
    <div>
        ${date.toDateString()}
    </div>
    <div>
        ${content}
      </div>
    </div>
    </body>
    </html>
    `;
    return htmlTemplate;
}  

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash(input, salt){
    //How do we create hash?
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return["pbkdf2", "10000", salt, hashed.toString('hex')].join('$');
}
app.get('/hash/:input', function (req, res) {
var hashedString = hash(req.params.input,'this-is some-random-string');
res.send(hashedString);
});

app.post('/create-user',function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    //username,password
    //{"username":"alefiyah", "password":"password"}
    var salt = crypto.randomBytes(128).toString('hex');
    var dbString = hash(password, salt);
    pool.query('INSERT INTO "user" (username,password) VALUES ($1, $2)', [username, dbString], function(err, result){
    if(err){
    res.status(500).send(err.toString());
    }
    else{
    res.send('User successfully created:' + username);
        }
    });
    
});

var pool = new Pool(config);
app.get('/test-db', function (req, res) {
//make a select request
//return a response with the results
pool.query('SELECT * FROM test',function(err, result){
if(err){
    res.status(500).send(err.toString());
}
else{
    res.send(JSON.stringify(result.rows));
    }
});
});
var counter = 0;
app.get('/counter',function (req, res) {
    counter = counter + 1;
    res.send(counter.toString());
});

var names = [];
app.get('/submit-name',function(req, res) { // /submit-name?name = xxxx
//Get the name from the request object
//var name = req.params.name; 
var name = req.query.name;
  //var name;//1000
names.push(name);
//JSON: javascript objetc notation
res.send(JSON.stringify(names));
});


app.get('/articles/:articleName',function(req,res){
    //articleName == article-one
    //articles[articleName] == {} content object for article-one
    //var articleName = req.params.articleName;
   // res.send(createTemplate(articles[articleName]));
   //SELECT * FROM article where title = article-one
   //SELECT * FROM article where title = '\';DELETE * FROM article where 'a' = '\a' ...where the query will dlt article-one entire row from database 
   pool.query("SELECT * FROM article WHERE title =$1" , [req.params.articleName], function(err, result){
    if(err){
        res.status(500).send(err.toString());
    }   else {
            if(result.rows.length === 0){
            res.status(404).send('Article not found');
   
    } else {
        var articleData = result.rows[0];
        res.send(createTemplate(articleData));
    }
  }
 });
});



app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('http://pngimg.com/upload/small/autumn_leaves_PNG3594.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'desktop/Newfolder/autumn_leaves_PNG3594', 'autumn_leaves_PNG3594'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
