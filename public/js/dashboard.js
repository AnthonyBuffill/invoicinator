// function toggleStatusDropdown(dropdown) {
//   if(dropdown === undefined)
//     return;
//   // dropdown.classList.toggle("show");
// }

function updateStatus(statusElement, newStatus) {
  
  const statusLabel = statusElement.querySelectorAll(".invoice-status")[0];
  statusLabel.textContent = newStatus;

  // Hide the entire dropdown after selecting a status
  const dropdown = statusElement.querySelectorAll(".statusDropdown")[0];
  dropdown.style.display = "none";

  // Show the dropdown if clicking on the selected status
  // statusLabel.onclick = function() {
  //   dropdown.style.display = "block";
  // };
  // toggleStatusDropdown();

  // Update the menu items to show only the selected status
  setDropdown(dropdown, newStatus);
}
function setDropdown(dropdown, newStatus){
  const menuItems = dropdown.querySelectorAll("div");
  menuItems.forEach(item => {
    if (item.textContent.toLowerCase() === newStatus.toLowerCase()) {
      item.style.display = "none";  // Hide the selected status
    } else {
      item.style.display = "block";  // Show the other statuses
    }
  });
}

const dropdowns = document.getElementsByClassName('invoice-status-dropdown');
for(let i = 0;i<dropdowns.length;i++){
  const statusDropdown = dropdowns[i].getElementsByClassName("statusDropdown")[0];
  dropdowns[i].onclick = ()=>{
    console.log("click");
    statusDropdown.style.display = "block";
    // toggleStatusDropdown(statusDropdown);
  }
  setDropdown(dropdowns[i].querySelectorAll(".statusDropdown")[0], dropdowns[i].querySelectorAll(".invoice-status")[0].textContent)
  const options = statusDropdown.querySelectorAll("div");
  options.forEach(o =>{
    o.onclick = (event) =>{
      event.stopPropagation();
      updateStatus(dropdowns[i], o.textContent);
    }
  });
}
