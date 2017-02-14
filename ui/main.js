console.log('Loaded!');

//change the text of the main-text div
/*var element = document.getElementById('main-text');
element.innerHTML = 'New value';*/

//Move the Image
var img = document.getElementById('alif');
var marginLeft = 0;
function marginRight () {
   marginLeft = marginLeft + 1
   marginLeft = marginLeft + 1;
    img.style.marginLeft = marginLeft + 'px';
   
    }
    
img.onclick = function () {
    var interval = setInterval(marginRight,50);
    img.style.marginLeft = '100px';
};


/*var imgObj = null;
var animate ;
function init(){
   imgObj = document.getElementById('alif');
   imgObj.style.position= 'absolute'; 
   imgObj.style.top = '240px';
   imgObj.style.left = '-300px';
   imgObj.style.visibility='hidden';
   moveRight();
} 
function moveRight(){
if (parseInt(imgObj.style.left)<=10)
{
   imgObj.style.left = parseInt(imgObj.style.left) + 5 + 'px';
   imgObj.style.visibility='visible';
   animate = setTimeout(moveRight,20); // call moveRight in 20msec
   //stopanimate = setTimeout(moveRight,20);
  }
else
  stop();
  f();
}

function stop(){
   clearTimeout(animate);
}
window.onload =init;*/