document.addEventListener("DOMContentLoaded", () => {
  const loginPopup = document.getElementById("loginPopup");
  const loginBtn = document.getElementById("loginBtn");
  const profilePic = document.getElementById("navProfilePic");
  const profilePicInput = document.getElementById("profilePicInput");
  const dropdown = document.getElementById("profileDropdown");
  const logoutBtn = document.getElementById("logoutBtn");

  const isLoggedIn = localStorage.getItem("loggedInUser");

  // Get the current page name from URL
  const page = window.location.pathname.split("/").pop().toLowerCase();
  const isHomeOrContact = page === "index.html" || page === "contact.html" || page === "";

  // Show login popup only if not logged in and not on home/contact page
  if (!isLoggedIn && !isHomeOrContact) {
    if (loginPopup) loginPopup.style.display = "flex";

    if (loginBtn) {
      loginBtn.addEventListener("click", () => {
        const usernameInput = document.getElementById("usernameInput");
        const username = usernameInput.value.trim().toLowerCase();

        if (!username.endsWith("@iiitsonepat.ac.in")) {
          alert("Please use your @iiitsonepat.ac.in email address.");
          usernameInput.focus();
          return;
        }

        localStorage.setItem("loggedInUser", username);
        if (loginPopup) loginPopup.style.display = "none";
        location.reload(); // Optional
      });
    }
  } else {
    if (loginPopup) loginPopup.style.display = "none";
  }

  // Set profile pic from localStorage
  const savedPic = localStorage.getItem("profilePic");
  if (savedPic && profilePic) {
    profilePic.src = savedPic;
  }

  // Upload and save profile picture
  if (profilePicInput) {
    profilePicInput.addEventListener("change", () => {
      const file = profilePicInput.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        const imageData = reader.result;
        localStorage.setItem("profilePic", imageData);

        if (profilePic) {
          profilePic.src = imageData;
        }
      };
      reader.readAsDataURL(file);
    });
  }

  // Toggle dropdown menu
  if (profilePic && dropdown) {
    profilePic.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
    });

    window.addEventListener("click", (e) => {
      if (!e.target.closest(".profile-dropdown")) {
        dropdown.style.display = "none";
      }
    });
  }

  // Logout
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("loggedInUser");
      localStorage.removeItem("profilePic");
      location.reload();
    });
  }
});

// Form submission email domain check
function handleSubmit(e) {
  e.preventDefault();

  const emailInput = document.querySelector('input[type="email"]');
  const email = emailInput.value.trim().toLowerCase();

  if (!email.endsWith("@iiitsonepat.ac.in")) {
    alert("Please use your @iiitsonepat.ac.in email address.");
    emailInput.focus();
    return;
  }

  alert("Message sent!");
}
