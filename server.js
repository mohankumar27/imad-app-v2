var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto=require('crypto');
var bodyParser=require('body-parser');
var session=require('express-session');

var config = {
    user: 'mohankumar27',
    database: 'mohankumar27',
    host: 'db.imad.hasura-app.io',
    port:'5432',
    password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
    secret: 'someRandomSecretValue',
    cookie: {maxAge: 1000*60*60*24*30}
    
}));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});


/*var articles={
    'article-one':{
        title: 'ARTICLE ONE',
        content: `<p>
                     I completed my higher studies in Chennai. Ambition is to become an app developer.
                  </p>`,
        profile: `<ul>
                <li>Name: Mohan Kumar S</li>
                <li>DOB: 27/01/1997</li>
                <li>Sex: Male</li>
             </ul>`
    },
    'article-two':{
        title: 'ARTICLE TWO',
        content: `<p>
                     I completed my higher studies in Chennai. Ambition is to become an app developer.
                  </p>`,
         profile: `<ul>
                <li>Name: Mohan Kumar S</li>
                <li>DOB: 27/01/1997</li>
                <li>Sex: Male</li>
             </ul>`
    },
    'article-three':{
        title: 'ARTICLE THREE',
        content: `<p>
                     I completed my higher studies in Chennai. Ambition is to become an app developer.
                  </p>`,
        profile: `<ul>
                <li>Name: Mohan Kumar S</li>
                <li>DOB: 27/01/1997</li>
                <li>Sex: Male</li>
             </ul>`
    },
    
};*/
function createTemplate (data){
var title=data.title;
var content=data.content;
var profile=data.profile;
var htmlTemplate=
    `<html>
    <head>
        <title>${title}</title>
        <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
        <div class='container'>
             <a href="/">HOME</a>
             <hr/>
             <h3>My Profile</h3>
             ${profile}
             ${content}
        </div>
    </body>
</html>`;
return htmlTemplate;
}

function hash(input,salt){
    var hashed=crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return ["pbkdf2Sync","10000",salt,hashed.toString('hex')].join('$');
}


app.get('/hash/:input',function(req,res){
    var hashedstring=hash(req.params.input,'this-is-a-random-string');
    res.send(hashedstring);
});

app.post('/create-user',function(req,res){
    
    var username=req.body.username;
    var password=req.body.password;
   var salt=crypto.randomBytes(128).toString('hex');
   var dbstring=hash(password,salt);
   pool.query('INSERT INTO "user" (username,password) VALUES ($1,$2)',[username,dbstring],function(err,result){
       if(err)
        {
            res.status(500).send(err.toString());
        }else{
            res.send('user successfully created '+ username);
        }
   });
});

app.post('/login',function(req,res){

    var username=req.body.username;
    var password=req.body.password;
   pool.query('SELECT * FROM "user" WHERE username=$1',[username],function(err,result){
       if(err)
        {
            res.status(500).send(err.toString());
        }else{
            if(result.rows.length===0){
                res.status(403).send('username/password is invalid');
            }else{
                var dbstring=result.rows[0].password;
                var salt=dbstring.split('$')[2];
                var hashedstring=hash(password,salt);
                if(hashedstring===dbstring){
                    req.session.auth={userId: result.rows[0].id};
                    res.send('credentials correct');
                }else{
                    res.status(403).send('username/password is invalid');
                }
            }
            
        }
   });
});

app.get('/check-login',function(req,res){
   if(req.session && req.session.auth && req.session.auth.userId){
       res.send('you are logged in'+ req.session.auth.userId.toString());
   } else{
       res.send('you are not logged in');
   }
});

app.get('/logout',function(req,res){
   delete req.session.auth;
   res.send('logged out');
});

var pool = new Pool(config);
app.get('/test-db',function(req,res){
    pool.query('SELECT * FROM test',function(err,result){
        if(err)
        {
            res.status(500).send(err.toString());
        }else{
            res.send(JSON.stringify(result.rows));
        }
    });
});
var counter=0;
app.get('/counter',function(req,res){
    counter=counter+1;
    res.send(counter.toString());
});

var names=[];
app.get('/submit-name',function(req,res)
{
    var name=req.query.name;
    names.push(name);
    res.send(JSON.stringify(names));
});

app.get('/articles/:articleName', function (req, res) {
   // var articleName=req.params.articleName;
    pool.query("SELECT * FROM article WHERE title=$1",[req.params.articleName], function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            if(result.rows.length===0){
                res.status(404).send("article not found");
            }else{
                var articleData=result.rows[0];
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

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
