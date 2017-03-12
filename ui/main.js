//counter code
var button = document.getElementById('counter');
//var counter = 0;

button.onclick = function(){
    //Create a request objects
    var request = new XMLHttpRequest();
    
    //Capture the response and store it in a variable
    request.onreadystatechange = function(){ //its check the request of current state object
        if(request.onreadystatechange === XMLHttpRequest.DONE){
            //take some action
            if(request.status === 200){ //this means the request has successfully completed
                //counter = counter + 1;
                var counter = request.responseText; // v hv to capture response
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
   
   //submit name
   
   var submit = document.getElementById('submit_btn');
   submit.onclick = function() {
       //Create a request objects
    var request = new XMLHttpRequest();
    
    //Capture the response and store it in a variable
    request.onreadystatechange = function(){ //its check the request of current state object
        if(request.onreadystatechange === XMLHttpRequest.DONE){
            //take some action
            if(request.status === 200){ //this means the request has successfully completed
    //capture a list of name and render it as a list
       var names = request.responseText;
       names = JSON.parse(names);
       //to convrt to html string
       var list = '';
       for(i=0; i<names.length; i++) {
           list += '<li>' + names[i] + '</li>';
       }
           //to insert elemnt in our uordered list
       var ul = document.getElementById('namelist');
       ul.innerHTML = list;
            } 
        }
        //Not Done yet ignore it
    };
    //Make a request to the counter endpoint
    var nameInput = document.getElementById('name');
   //value of the name
   var name = nameInput.value;
        request.open('GET','http://alefiyahmarshal.imad.hasura-app.io/submit-name?name='+ name,true);
        request.send(null);
      //Make a request to the server and send the name
     
   };
   