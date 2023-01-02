let parentDiv = document.createElement("div");
parentDiv.className="parDiv";
let body=document.querySelector("body");
body.appendChild(parentDiv);
body.style.textAlign="center";
// parentDiv.style.backgroundColor="gray";
parentDiv.style.margin="auto";
/*table creation */
let table= document.createElement("table");
table.style.backgroundColor="gray";
table.style.border= "solid 1px black";
parentDiv.appendChild(table);
//create table header section and add headers to it
headerRow=document.createElement("tr");
headerRow.className="headerRow";
headers=["Row","UID","First Name","Last Name","City","Postal Code", "Phone Number", "Position"];
headers.forEach(header => {
    let headerCell= document.createElement("th");
    let headerText= document.createTextNode(header);
    headerCell.appendChild(headerText);
    headerRow.appendChild(headerCell);

});
table.appendChild(headerRow);
let tableBody= document.createElement("tbody");

//  add each user information in a seperate row 
userData.forEach((user,index)=>{
    let userRow= document.createElement("tr");
    if((index+1)%2 !==0){
        userRow.style.backgroundColor="white";
    }
    else{
        userRow.style.backgroundColor="#C9C9C9";
    }
    //create row Number cell
    rowNumberCell = document.createElement("td");
    rowNumberCell.className="rowNumberCell";
  
     rowNumberText= document.createTextNode(index+1);
     rowNumberCell.appendChild(rowNumberText);
     userRow.appendChild(rowNumberCell);

    //import user info from userData to table 
    Object.values(user).forEach(value=>{
        let userCell= document.createElement("td");
        let userTextInfo= document.createTextNode(value);
        userCell.appendChild(userTextInfo);
        userRow.appendChild(userCell);
    })
    tableBody.appendChild(userRow);
    table.appendChild(tableBody);
})


function sortByColumn(table,n){

    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /* Loop through all table rows (except the
      first, which contains table headers): */
      for (i = 1; i < (rows.length - 1); i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        /* Check if the two rows should switch place,
        based on the direction, asc or desc: */
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        // Each time a switch is done, increase this count by 1:
        switchcount ++;
      } else {
        /* If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again. */
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }

}
sortByColumn(table, 2);
let rowLength= tableBody.rows.length;
console.log(rowLength);

for(let i=0;i<rowLength;i++){
  let nRow= tableBody.rows[i];
  let firstCellOfRow= nRow.insertCell(0);
  firstCellOfRow.innerHTML= i+1;
}
let firtstRow= tableBody.rows[0];
let firstCell= firtstRow.insertCell(0);
firstCell.innerHTML="1";







    







