var button=document.getElementById('click');



button.onclick=function(){
    
    var request= new XMLHttpRequest();
    
request.onreadystatechange=function()
{
    if(request.readystate===XMLHttpRequest.DONE)
    {
        if(request.status===200)
        {
            var counter=request.responseText;
            var span=document.getElementById("count");
            span.innerHTML=counter.toString();
        }
    }
};
request.open('GET','http://http://mohankumar27.imad.hasura-app.io',true);
request.send(null);
};

