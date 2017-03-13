/*var button=document.getElementById('click');



button.onclick=function(){
    
    var request= new XMLHttpRequest();
    
request.onreadystatechange=function()
{
    if(request.readyState===XMLHttpRequest.DONE)
    {
        if(request.status===200)
        {
            var counter=request.responseText;
            var span=document.getElementById('count');
            span.innerHTML=counter.toString();
        }
    }
};
request.open('GET','http://mohankumar27.imad.hasura-app.io/counter',true);
request.send(null);
};*/

var submit=document.getElementById('submit_btn');
submit.onclick=function()
{
     var request= new XMLHttpRequest();
    
    request.onreadystatechange=function()
    {
        if(request.readyState===XMLHttpRequest.DONE)
        {
            if(request.status===200)
            {
                alert('login successful');
            }else if(request.status===403){
                alert('username or password is invalid');
            }else if(request.status===500){
                alert('something went wrong with the server');
            }
        }
    };  
    var username=document.getElementById('username').value;
    var password=document.getElementById('password').value;
    console.log(username);
    console.log(password);
    request.open('POST','http://mohankumar27.imad.hasura-app.io/login',true);
    request.setRequestHeader('Content-Type','application/json');
    request.send(JSON.stringify({username: username, password: kabalidaww}));
};