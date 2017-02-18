//counter code
var button = document.getElementById('counter');
var counter = 0;

button.onclick = function(){
    //Create a request objects
    var request = XMLHttpRequest();
    
    //Capture the response and store it in a variable
    request.onreadystatechange = function(){
        if(request.readyState == XMLHttprequest.DONE){
            //take some action
            if(request.status == 200){
                counter = counter + 1;
                var counter = request.responseText;
                var span = document.getElementById('count');
                span.innerHTML = counter.toString();
            } 
        }
        //Not Done yet ignore it
    };
    //Make a request to the counter endpoint
        request.open('GET','http://alefiyahmarshal.imad.hasura-app.io/counter',true);
        request.send(null);
   };