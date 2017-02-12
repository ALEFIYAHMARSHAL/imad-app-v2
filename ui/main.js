console.log('Loaded!');

//change the text of the main-text div
var element = document.getElementById('main-text');
element.innerHTML = 'New value';

//Move the Image
var img = document.getElementById('alif');
var marginLeft = 0;
function marginRight () {
   for(;marginLeft < '50px'; marginLeft = marginLeft + 1){
    img.style.marginLeft = marginLeft + 'px';
   }
    }
    
img.onclick = function () {
    var interval = setInterval(marginRight,50);
    img.style.marginLeft = '100px';
};