var button=document.getElementById("click");
button.onclick=function(){
    var counter=0;
    counter=counter+1;
    var span=document.getElementById("count");
    span.innerHtml=counter.toString();
};
