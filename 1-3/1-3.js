let divChild = document.createElement('div');
let paragraph3 = document.createElement('p');
paragraph3.innerText = "The main node child node";
divChild.appendChild(paragraph3);

let divMidd = document.createElement('div');
let paragraph2 = document.createElement('p');
paragraph2.innerText = 'the text node.';
divMidd.appendChild(paragraph2);
divMidd.appendChild(divChild);

let divParent = document.createElement('div');
let paragraph1 = document.createElement('p');
paragraph1.innerText = 'parent node text';
divParent.appendChild(paragraph1);
divParent.appendChild(divMidd);
document.body.appendChild(divParent);

//div parent css
divParent.style.backgroundColor = 'green';
divParent.style.width = '650px';
divParent.style.height = '350px';

// div midd css
divMidd.style.border = '2px solid black';
divMidd.style.height = '250px';
divMidd.style.width = '450px';
divMidd.style.margin = '35px'
divMidd.style.overflow = 'auto';

//div child css

divChild.style.border = '2px solid black';
divChild.style.height = '150px';
divChild.style.width = '250px';;
divChild.style.margin = '35px';
divChild.style.overflow = 'auto';

//js
let copyParent = document.querySelector('#cpt');
copyParent.onclick = function () {
    divMidd.children[0].innerText= 
    divParent.children[0].innerText +
    divMidd.children[0].innerText +
    divChild.children[0].innerText+
    divParent.children[0].innerText;
}

let copyChild = document.querySelector('#cct');
copyChild.onclick = function () {
    divMidd.children[0].innerText =
    divChild.children[0].innerText + divMidd.children[0].innerText;
}

// let div3 = document.createElement('div');
// let paragraph3 = document.createElement('p');
// paragraph3.innerText = "The main node child node";
// div3.appendChild(paragraph3);

// let div2 = document.createElement('div');
// let paragraph2 = document.createElement('p');
// paragraph2.innerText = 'the text node.';
// div2.appendChild(paragraph2);
// div2.appendChild(div3);

// let div1 = document.createElement('div');
// let paragraph1 = document.createElement('p');
// paragraph1.innerText = 'the main node chils node';
// div1.appendChild(paragraph1);
// div1.appendChild(div2);
// document.body.appendChild(div1)

// div1.style.backgroundColor = 'green';
// div1.style.border = '1px solid black';
// div1.style.width = '600px';
// div1.style.height= '300px';
// div1.style.padding = '1rem';

// div2.style.backgroundColor = 'green';
// div2.style.border = '1px solid black';
// div2.style.width = '400px';
// div2.style.height= '200px';
// div2.style.padding = '1rem';

// div3.style.backgroundColor = 'green';
// div3.style.border = '1px solid black';
// div3.style.width = '150px';
// div3.style.height= '50px';
// div3.style.padding = '1rem';

// let parentCopy =document.querySelector('#cpt');

// parentCopy.oneclick = function () {
//     div2.children[0].innerText
// }

// let childCopy = document.querySelector('#cct');
// childCopy.oneclick = function () {
//     div3.children[0].innerText
// }




