function myFunction() {
  let menuItems = document.querySelectorAll("#nav-res-ext1, #nav-res-ext2, #nav-res-ext3, #nav-res-ext4");
  let icon = document.getElementById("icon");
  let hiddenPortfolio = document.getElementById("hidden"); // "PORTFOLIO" heading

  let isOpen = menuItems[0].style.display === "block";

  menuItems.forEach(item => {
      item.style.display = isOpen ? "none" : "block";
  });

  hiddenPortfolio.style.display = isOpen ? "inline-flex" : "none";

  icon.innerHTML = isOpen 
      ? '<i class="fa-solid fa-bars-staggered"></i>'  // Show hamburger menu
      : '<i class="fa-solid fa-times"></i>';         // Show close icon
}

// **New Code: Reset Navbar Visibility When Resizing**
window.addEventListener("resize", function () {
  let menuItems = document.querySelectorAll("#nav-res-ext1, #nav-res-ext2, #nav-res-ext3, #nav-res-ext4");
  let hiddenPortfolio = document.getElementById("hidden");

  if (window.innerWidth > 750) {
      menuItems.forEach(item => {
          item.style.display = "block";  // Ensure they are visible on larger screens
      });
      hiddenPortfolio.style.display = "none"; // Hide "PORTFOLIO" heading
  } else {
      menuItems.forEach(item => {
          item.style.display = "none";  // Hide them again for smaller screens
      });
      hiddenPortfolio.style.display = "inline-flex"; // Show "PORTFOLIO" only in small screens
  }
});
