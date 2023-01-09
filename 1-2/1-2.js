const body = document.querySelector('body');
const div = document.createElement('div');
const text = document.createTextNode('hover over me!');
div.appendChild(text);
body.appendChild(div);
////////
div.style.backgroundColor = 'blue';
div.style.width = '250px';
div.style.height = '150px';
div.style.margin = '300px';
div.style.border = '3px solid black'
///////
div.onmouseover = function () {
    div.style.backgroundColor = 'red'
}
div.onmouseleave = function () {
    div.style.backgroundColor = 'blue'
}
