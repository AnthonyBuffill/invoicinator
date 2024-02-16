function toggleStatusDropdown() {
  const dropdown = document.getElementById("statusDropdown");
  dropdown.classList.toggle("show");
}

function updateStatus(newStatus) {
  const statusLabel = document.getElementById("statusLabel");
  statusLabel.textContent = newStatus;

  // Hide the entire dropdown after selecting a status
  const dropdown = document.getElementById("statusDropdown");
  dropdown.style.display = "none";

  // Show the dropdown if clicking on the selected status
  statusLabel.onclick = function() {
    dropdown.style.display = "block";
  };
  toggleStatusDropdown();

  // Update the menu items to show only the selected status
  const menuItems = document.querySelectorAll(".invoice-status-dropdown-menu div");
  menuItems.forEach(item => {
    if (item.textContent.toLowerCase() === newStatus) {
      item.style.display = "none";  // Hide the selected status
    } else {
      item.style.display = "block";  // Show the other statuses
    }
  });
}
