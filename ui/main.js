console.log('Loaded!');

//change the text of the main-text div
var element = document.getElementById('main-text');
element.innerHTML = 'New value';

//Move the Image
var img = document.getElementById('alif');
img.onclick = function () {
    img.style.marginLeft = '100px';
};