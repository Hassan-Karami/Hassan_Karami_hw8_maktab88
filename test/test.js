function createTable(userDataArray,headerListArray){
    let body= document.querySelector("body");
    let table= document.createElement("table");
    body.appendChild(table);
    let thead= document.createElement("thead");
    let tbody=document.createElement("tbody");
    let th= document.createElement("th");
    thead.appendChild(tableHeaderCreator(headerListArray));
    table.appendChild(thead);
    userDataArray.forEach((user,index) => {
        let tr= document.createElement("tr");
        let rowNumbercell= document.createElement("td");
        let rowNumberText= document.createTextNode(index+1);
        rowNumbercell.appendChild(rowNumberText);
        tr.appendChild(rowNumbercell);
        tr.className= "user"+(index+1);
        Object.values(user).forEach(value=>{
            let tdText= document.createTextNode(value);
            let td= document.createElement("td");
            td.appendChild(tdText);
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
        table.appendChild(tbody);
        (index+1)%2 === 0 ? tr.style.backgroundColor="#C9C9C9": tr.style.backgroundColor="white";

    });
}

function tableHeaderCreator(headerArray){
    let headerRow= document.createElement("tr");
    for(header of headerArray){
        let headerCell= document.createElement("th");
        let headerText= document.createTextNode(header);
        headerCell.appendChild(headerText);
        headerRow.appendChild(headerCell);
    }
    return headerRow;
}

let body = document.querySelector("body");
body.addEventListener("dblclick", (e)=>{
      let targetUid=  +(e.target.parentElement.getElementsByTagName("td")[1].innerText);
      let userObject= userData.find(item=> item.uid=== targetUid);
      console.log(userObject);
    });

    const create= (newUser)=>{
        if(typeof newUser !=="object" || Array.isArray(newUser) || newUser===null) return "invalid input type";

        //sanitization
    const pattern= Object.keys(userData[0]);
    if(pattern.length !== Object.keys(newUser).length){
        return "invalid input(length)";
    }
    for(key in newUser){
        if(!newUser[key] || !pattern.includes(key)) return `invalid input (${key})`;
    }
    const duplicateUser= userData.find(user=>{user.uid===newUser.uid})
    if(!!duplicateUser) return "duplicate User";
    userData.push(newUser);
    return `user ${newUser.uid} created successfully`;

    }

    const update = (uid,modifiedUser)=>{
        //validation 
        if(typeof uid !== "number") return "invalid input(uid)";
        if(typeof modifiedUser !== "object" || Array.isArray(modifiedUser) || modifiedUser===null) return "invalid input type (modifiedUser)";
        const targetUser= userData.find(user=> user.uid === uid);
        if(!targetUser) return "user not found";
        //sanitization
    const pattern= Object.keys(userData[0]);
    for(key in modifiedUser){
        if(!modifiedUser[key] || !pattern.includes(key)) return `invalid input (${key})`;
    }  

        userData= userData.map((user)=>{
            if(user.uid===uid){
                return {...userData,...modifiedUser}
            }
            return user;
        })
        return `updated uid: ${uid} successfully`;

    }
     
    const remove= (uid)=>{
        if(typeof uid !== "number") return "invalid input type(uid)";
        const targetUser= userData.find((user)=>user.uid=== uid);
        if(!targetUser) return `user (uid: ${uid} not found)`;
        userData = userData.filter((user)=> user.uid !== uid);
        return `user uid: ${uid} deleted successfully`;

    }
    
    
headers=["Row","UID","First Name","Last Name","City","Postal Code", "Phone Number", "Position"];
createTable(userData,headers);