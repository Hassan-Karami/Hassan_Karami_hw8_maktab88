let body = document.querySelector("body");
function createTable(parent, userDataArray, headerListArray) {
  parent = document.querySelector(parent);
  let table = document.createElement("table");
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
createTable("body", userData, headers);

body.addEventListener("dblclick", (e) => {
  if (e.target.tagName === "TD") {
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
      modal.style.display = "block";
      uidInput.value = userObject["uid"];
      fNameInput.value = userObject["firstname"];
      lNameInput.value = userObject["lastname"];
      cityInput.value = userObject["city"];
      PocoInput.value = userObject["postalCode"];
      PhNumberInput.value = userObject["phoneNumber"];
      positionInput.value = userObject["position"];
      let allModalInputs = document.querySelectorAll(".modal-content input");
      allModalInputs.forEach((input) => {
        input.setAttribute("readonly", true);
      });
      // buttons selection in DOM
      let updateBtn = document.getElementById("update-btn");
      let deleteBtn = document.getElementById("delete-btn");
      let cancelBtn = document.getElementById("cancel-btn");
      //buttons click treatment
      updateBtn.addEventListener("click", function () {
        updateBtn.innerHTML = "Submit";
        updateBtn.className="submit-class";
        deleteBtn.style.display="none"
        for (let i = 1; i < allModalInputs.length; i++) {
          allModalInputs[i].removeAttribute("readonly");
          allModalInputs[i].style.border = "red 1px solid";
        }
      

        let sc=document.querySelector(".submit-class");
        sc.addEventListener("click",   function(){
          this.className='update-class';
          this.innerHTML="Update";
          allModalInputs.forEach(input=>{
            input.style.border="none";
            input.setAttribute("readonly", true);
          })
         let x= returnModifiedUserObject(+uidInput.value,fNameInput.value, lNameInput.value,cityInput.value,PocoInput.value, PhNumberInput.value, positionInput.value );
        
        })

      });
      
      
      cancelBtn.addEventListener("click", function () {
        modal.style.display="none";
        allModalInputs.forEach((input)=>{
          input.setAttribute("readonly", true);
          input.style.border="none";
        })
        deleteBtn.style.display="block";
        updateBtn.innerHTML="Update";
        updateBtn.className="update-class"
        
      });

    
  }
  //end of if click on td 

});
//end of dblclick addeventlistener

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
  return `updated uid: ${uid} successfully`;
};

const remove = (uid) => {
  if (typeof uid !== "number") return "invalid input type(uid)";
  const targetUser = userData.find((user) => user.uid === uid);
  if (!targetUser) return `user (uid: ${uid} not found)`;
  userData = userData.filter((user) => user.uid !== uid);
  return `user uid: ${uid} deleted successfully`;
};

// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};




const returnModifiedUserObject= function(mUid,mFirstName,mLastname,mCity,mPostalCode,mPhoneNumber, mPosition){
  return {
    uid: mUid,
    firstname: mFirstName,
    lastname: mLastname,
    city: mCity,
    postalCode: mPostalCode,
    phoneNumber: mPhoneNumber,
    position: mPosition
  }
}
