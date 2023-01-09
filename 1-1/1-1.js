//create html (text),(element)
const body= document.querySelector('body');
const div = document.createElement('div');
const text = document.createTextNode('default text !');
div.appendChild(text);
body.appendChild(div);

/////////////////

//create css 
div.style.backgroundColor = 'green';
div.style.width = '250px';
div.style.height = '150px';
div.style.overflow = 'auto';

////////////////

div.onclick = function(){
    div.innerHTML += 'click added some text';
};