var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles={
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
    
};
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

var counter=0;
app.get('/counter',function(req,res){
    counter=counter+1;
    res.send(counter);
});

app.get('/:articleName', function (req, res) {
    var articleName=req.params.articleName;
  res.send(createTemplate(articles[articleName]));
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
