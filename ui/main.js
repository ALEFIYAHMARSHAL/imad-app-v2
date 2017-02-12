console.log('Loaded!');

//change the text of the main-text div
var element = document.getElementById('main-text');
element.innerHTML = 'New value';

//Move the Image
var img = document.getElementById('alif');
var marginLeft = 0;
function marginRight () {
    marginLeft = marginLeft + 10;
    img.style.marginLeft = marginLeft + 'px';
    }
    
img.onclick = function () {
    var interval = setInterval(marginRight,100);
    img.style.marginLeft = '100px';
};