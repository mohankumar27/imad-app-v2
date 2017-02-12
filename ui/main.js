var button=document.getElementById('click');



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
};

var inputname=document.getElementById('namecontent');
var name=inputname.value;
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
                var names=['name1','name2','name3','name4'];
                var list='';
                for(var i=0;i<names.length;i++)
                {
                    list+= '<li>' + names[i] + '</li>';
                }
                var listelement=document.getElementById('name_list');
                listelement.innerHTML=list;
            }
        }
    };  
    request.open('GET','http://mohankumar27.imad.hasura-app.io/submit?name='+name,true);
    request.send(null);
};