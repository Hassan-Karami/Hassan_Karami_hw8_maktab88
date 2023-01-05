function createTable(userDataArray, headerListArray) {
  let body = document.querySelector("body");
  let table = document.createElement("table");
  body.appendChild(table);
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

let body = document.querySelector("body");

body.addEventListener("dblclick", (e) => {
  if (e.target.tagName === "TD") {
    let targetUid =
      +e.target.parentElement.getElementsByTagName("TD")[1].innerText;
    if (!!targetUid) {
      let userObject = userData.find((item) => item.uid === targetUid);
      let uidInput = document.getElementById("uidInput");
      let fNameInput = document.getElementById("fNameInput");
      let lNameInput = document.getElementById("lNameInput");
      let cityInput = document.getElementById("cityInput");
      let PocoInput = document.getElementById("PocoInput");
      let PhNumberInput = document.getElementById("PhNumberInput");
      let positionInput = document.getElementById("positionInput");

      //modal section appears after dbclicking on "td" and input user information into it.
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
      updateBtn.addEventListener("click", function () {});
    }
  }
});

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
createTable(userData, headers);
