const myBody = document.body;
const myDiv = document.createElement("div");

myBody.appendChild(myDiv);
myDiv.style.width = "320px";
myDiv.style.height = "280px";
myDiv.style.border = "2px solid black";
myDiv.style.paddingTop = "15px";
myDiv.style.paddingBottom= "2px";
myDiv.style.paddingLeft= "25px";
myDiv.style.paddingRight= "15px";
myDiv.style.margin= "auto";

const myHeader = document.createElement("h1");
const headerText = document.createTextNode("My Tasks");
myHeader.appendChild(headerText);
myHeader.style.color = "red";
myHeader.style.marginTop = "10px";
myDiv.appendChild(myHeader);

const myOrderedL = document.createElement("ol");
myOrderedL.style.listStyleType = "upper-roman";
myDiv.appendChild(myOrderedL);

const li1 = document.createElement("li");
const li1Text = document.createTextNode("user dashboard");
li1.appendChild(li1Text);

const li2 = document.createElement("li");
const li2Text = document.createTextNode("admin dashboard");
li2.appendChild(li2Text);

const li3 = document.createElement("li");
const li3Text = document.createTextNode("autentication");
li3.appendChild(li3Text);

myOrderedL.appendChild(li1);
myOrderedL.appendChild(li2);

const myUnorderedL = document.createElement("ul");
myUnorderedL.style.type = "circle";

const innerLi1 = document.createElement("li");
const innerLi1Text = document.createTextNode("login");
innerLi1.appendChild(innerLi1Text);

const innerLi2 = document.createElement("li");
const innerLi2Text = document.createTextNode("register");
innerLi2.appendChild(innerLi2Text);

innerLi2.style.textDecoration = "line-through";
const innerLi3 = document.createElement("li");
const innerLi3Text = document.createTextNode("logout");
innerLi3.appendChild(innerLi3Text);

myUnorderedL.appendChild(innerLi1);
myUnorderedL.appendChild(innerLi2);
myUnorderedL.appendChild(innerLi3);
li3.appendChild(myUnorderedL);

myOrderedL.appendChild(li3);
const li4 = document.createElement("li");
const li4Text = document.createTextNode("about page");

li4.appendChild(li4Text);
myOrderedL.appendChild(li4);
const li5 = document.createElement("li");

const li5Text = document.createTextNode("content page");
li5.appendChild(li5Text);
li5.style.textDecoration = "line-through";
myOrderedL.appendChild(li5);

const myInput = document.createElement("input");
myInput.style.marginRight = "7px";
myDiv.appendChild(myInput);

const myBtn = document.createElement("button");
const myTask = document.createTextNode("add task");
myBtn.appendChild(myTask);
myDiv.appendChild(myBtn);
