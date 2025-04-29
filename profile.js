document.addEventListener("DOMContentLoaded", () => {
  const username = localStorage.getItem("loggedInUser") || "Unknown";
  const profileName = document.getElementById("profileName");
  const profilePic = document.getElementById("profilePic");
  const fileInput = document.getElementById("profilePicInput");
  const postsContainer = document.getElementById("userPostsContainer");

  profileName.textContent = username;
  profilePic.src = localStorage.getItem("profilePic") || "default-profile.svg";

  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  const myPosts = posts.filter(post => post.author === username);

  if (myPosts.length === 0) {
    postsContainer.innerHTML = "<p>You haven't created any posts yet.</p>";
  } else {
    myPosts.forEach(post => {
      const div = document.createElement("div");
      div.classList.add("post");
      div.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.content}</p>
        ${post.image ? `<img src="${post.image}" alt="Post Image">` : ""}
      `;
      postsContainer.appendChild(div);
    });
  }

  // 📷 Auto update profile picture when selected
  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (file) {
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/svg+xml"];
      if (!allowedTypes.includes(file.type)) {
        alert("Invalid file type. Please select a JPG, JPEG, PNG, or SVG image.");
        fileInput.value = ""; // Reset the input
        return;
      }
  
      const reader = new FileReader();
      reader.onload = () => {
        const imageData = reader.result;
        localStorage.setItem("profilePic", imageData);
        profilePic.src = imageData;
  
        // ✅ Update navbar profile pic
        const navPic = document.getElementById("navProfilePic");
        if (navPic) {
          navPic.src = imageData;
        }
      };
      reader.readAsDataURL(file);
    }
  });  
});
