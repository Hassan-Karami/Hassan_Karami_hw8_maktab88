let body = document.querySelector("body");
let tableContainer= document.createElement("div");
body.appendChild(tableContainer);
tableContainer.setAttribute("id", "table-container");


function createTable(parent, userDataArray, headerListArray) {
  parent = document.getElementById(parent);
  let table = document.createElement("table");
  table.setAttribute("id", "myTable");
  parent.appendChild(table);
  let thead = document.createElement("thead");
  let tbody = document.createElement("tbody");
  let th = document.createElement("th");
  thead.appendChild(tableHeaderCreator(headerListArray));
  table.appendChild(thead);
  userDataArray.forEach((user, index) => {
    let tr = document.createElement("tr");
    let rowNumbercell = document.createElement("td");
    let rowNumberText = document.createTextNode(index + 1);
    rowNumbercell.appendChild(rowNumberText);
    tr.appendChild(rowNumbercell);
    tr.className = "user" + (index + 1);
    Object.values(user).forEach((value) => {
      let tdText = document.createTextNode(value);
      let td = document.createElement("td");
      td.appendChild(tdText);
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
    table.appendChild(tbody);
    (index + 1) % 2 === 0
      ? (tr.style.backgroundColor = "#C9C9C9")
      : (tr.style.backgroundColor = "white");
  });
}



function tableHeaderCreator(headerArray) {
  let headerRow = document.createElement("tr");
  for (header of headerArray) {
    let headerCell = document.createElement("th");
    let headerText = document.createTextNode(header);
    headerCell.appendChild(headerText);
    headerRow.appendChild(headerCell);
  }
  return headerRow;
}
headers = [
  "Row",
  "UID",
  "First Name",
  "Last Name",
  "City",
  "Postal Code",
  "Phone Number",
  "Position",
];

createTable("table-container", userData, headers);
let myTable = document.getElementById("myTable");


body.addEventListener("dblclick", function (e) {
  let allModalInputs = document.querySelectorAll(".modal-content input");
  let updateBtn = document.getElementById("update-btn");
  let deleteBtn = document.getElementById("delete-btn");
  let cancelBtn = document.getElementById("cancel-btn");
  let submitBtn= document.getElementById("submit-btn");

  if (e.target.tagName === "TD") {
    submitBtn.style.display="none"
    let targetUid =
      +e.target.parentElement.getElementsByTagName("TD")[1].innerText;
    let userObject = userData.find((item) => item.uid === targetUid);
    let uidInput = document.getElementById("uidInput");
    let fNameInput = document.getElementById("fNameInput");
    let lNameInput = document.getElementById("lNameInput");
    let cityInput = document.getElementById("cityInput");
    let PocoInput = document.getElementById("PocoInput");
    let PhNumberInput = document.getElementById("PhNumberInput");
    let positionInput = document.getElementById("positionInput");

    //modal section appears after dbclicking on "td" and  user information goes into it.
    function importOriginalData(){
      uidInput.value = +userObject["uid"];
    fNameInput.value = userObject["firstname"];
    lNameInput.value = userObject["lastname"];
    cityInput.value = userObject["city"];
    PocoInput.value = userObject["postalCode"];
    PhNumberInput.value = userObject["phoneNumber"];
    positionInput.value = userObject["position"];

    }
    modal.style.display = "block";
    importOriginalData();
    
    let allModalInputs = document.querySelectorAll(".modal-content input");
    allModalInputs.forEach((input) => {
      input.setAttribute("readonly", true);
    });
  }

  

  body.addEventListener("click", function (event) {
    
    let clickedElement= event.target;
    if(clickedElement.className==="close"){
      modal.style.display="none";
      allModalInputs.forEach((input) => {
        input.setAttribute("readonly", true);
        input.style.border = "none";
      });
      deleteBtn.style.display="inline-block";
      updateBtn.style.display="inline-block";
      submitBtn.style.display="none";
      cancelBtn.style.display="inline-block";
    }

    if(clickedElement.innerHTML==="DELETE"){
      modal.style.display="none";
      removeUser(+uidInput.value);
      tableContainer.innerHTML="";
      createTable("table-container", userData, headers);
      deleteBtn.style.display="inline-block";
      updateBtn.style.display="inline-block";
      submitBtn.style.display="none";
      cancelBtn.style.display="inline-block";
      
      
    }
  
    

    if(clickedElement.innerHTML=== "CANCEL"){
    importOriginalData();
    deleteBtn.style.display="inline-block";
    updateBtn.style.display="inline-block";
    submitBtn.style.display="none"

    allModalInputs.forEach((input) => {
      input.setAttribute("readonly", true);
      input.style.border = "none";
    });

    }



    if (clickedElement.innerHTML === "UPDATE") {
      deleteBtn.style.display = "none";
      submitBtn.style.display="inline-block";
      updateBtn.style.display="none"
      for (let i = 1; i < allModalInputs.length; i++) {
        allModalInputs[i].removeAttribute("readonly");
        allModalInputs[i].style.border = "red 1px solid";
      }
     } 
     
      if(clickedElement.innerHTML=== "SUBMIT") {
      submitBtn.style.display="noen";
      updateBtn.style.display="inline-block";
      allModalInputs.forEach((input) => {
        input.style.border = "none";
        input.setAttribute("readonly", true);
      });
      let x = returnModifiedUserObject(
        +uidInput.value,
        fNameInput.value,
        lNameInput.value,
        cityInput.value,
        PocoInput.value,
        PhNumberInput.value,
        positionInput.value
      );
      update(+uidInput.value, x);
      tableContainer.innerHTML="";
      createTable("table-container", userData, headers);
    }
    
  });

  
    
  //lower line is end of body dblclicking
});

//end of dblclick addeventlistener
let addBtn= document.getElementById("add-user");
addBtn.addEventListener("click", (e)=>{
  updateBtn.style.display='none';

})

const create = (newUser) => {
  if (typeof newUser !== "object" || Array.isArray(newUser) || newUser === null)
    return "invalid input type";

  //sanitization
  const pattern = Object.keys(userData[0]);
  if (pattern.length !== Object.keys(newUser).length) {
    return "invalid input(length)";
  }
  for (key in newUser) {
    if (!newUser[key] || !pattern.includes(key))
      return `invalid input (${key})`;
  }
  const duplicateUser = userData.find((user) => {
    user.uid === newUser.uid;
  });
  if (!!duplicateUser) return "duplicate User";
  userData.push(newUser);
  return `user ${newUser.uid} created successfully`;
};

const update = (uid, modifiedUser) => {
  //validation
  if (typeof uid !== "number") return "invalid input(uid)";
  if (
    typeof modifiedUser !== "object" ||
    Array.isArray(modifiedUser) ||
    modifiedUser === null
  )
    return "invalid input type (modifiedUser)";
  const targetUser = userData.find((user) => user.uid === uid);
  if (!targetUser) return "user not found";
  //sanitization
  const pattern = Object.keys(userData[0]);
  for (key in modifiedUser) {
    if (!modifiedUser[key] || !pattern.includes(key))
      return `invalid input (${key})`;
  }

  userData = userData.map((user) => {
    if (user.uid === uid) {
      return { ...user, ...modifiedUser };
    }
    return user;
  });

  return  console.log(`updated uid: ${uid} successfully`);
};

const removeUser = (uid) => {
  if (typeof uid !== "number") return "invalid input type(uid)";
  const targetUser = userData.find((user) => user.uid === uid);
  if (!targetUser) return `user (uid: ${uid} not found)`;
  userData = userData.filter((user) => user.uid !== uid);
  return console.log(`user uid: ${uid} deleted successfully`);;
};

// Get the modal
var modal = document.getElementById("myModal");


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal

// span.onclick = function () {
//   modal.style.display = "none";
// };

// When the user clicks anywhere outside of the modal, close it


// window.onclick = function (event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
    
//   }
// };


// body.addEventListener("mouseover", (e)=>{
//   if(e.target.tagName==="TH"){
    
//     e.target.style.cursor="pointer"

//   }
// })


function sortTable() {
  body.addEventListener("click", function (e) {
    if (e.target.tagName === "TH") {
      if (e.target.innerHTML === "Last Name") {
        sortAscending(userData, "lastname");
        tableContainer.innerHTML="";
createTable("table-container", userData, headers);

        
      }

      if (e.target.innerHTML === "First Name") {
        sortAscending(userData, "firstname");
        tableContainer.innerHTML = "";
createTable("table-container", userData, headers);
        
      }

      if (e.target.innerHTML === "Postal Code") {
        sortAscending(userData, "postalCode");
        tableContainer.innerHTML = "";
createTable("table-container", userData, headers);
        
      }

      if (e.target.innerHTML === "Phone Number") {
        sortAscending(userData, "phoneNumber");
        tableContainer.innerHTML = "";
createTable("table-container", userData, headers);
        
      }

      if (e.target.innerHTML === "Position") {
        sortAscending(userData, "position");
        tableContainer.innerHTML = "";
createTable("table-container", userData, headers);
        
      }

      if (e.target.innerHTML === "City") {
        sortAscending(userData, "city");
        tableContainer.innerHTML = "";
createTable("table-container", userData, headers);
        
      }

      if (e.target.innerHTML === "UID") {
        sortAscending(userData, "uid");
        tableContainer.innerHTML = "";
createTable("table-container", userData, headers);
      
      }
    }
  });
}
sortTable();

const returnModifiedUserObject = function (
  mUid,
  mFirstName,
  mLastname,
  mCity,
  mPostalCode,
  mPhoneNumber,
  mPosition
) {
  return {
    uid: mUid,
    firstname: mFirstName,
    lastname: mLastname,
    city: mCity,
    postalCode: mPostalCode,
    phoneNumber: mPhoneNumber,
    position: mPosition,
  };
};

function sortAscending(data, title) {
  data.sort((a, b) => {
    return a[title] - b[title] || a[title].localeCompare(b[title]);
  });
}



