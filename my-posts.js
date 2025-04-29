document.addEventListener("DOMContentLoaded", () => {
    const user = localStorage.getItem("loggedInUser");
    const postsContainer = document.getElementById("userPostsContainer");
  
    if (!user) {
      alert("Please log in to view your posts.");
      window.location.href = "index.html";
      return;
    }
  
    const allPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const userPosts = allPosts.filter(post => post.username === user);
  
    if (userPosts.length === 0) {
      postsContainer.innerHTML = "<p>You have not created any posts yet.</p>";
    } else {
      userPosts.forEach(post => {
        const postDiv = document.createElement("div");
        postDiv.classList.add("post");
  
        postDiv.innerHTML = `
          <h3>${post.title}</h3>
          <p><strong>Category:</strong> ${post.category}</p>
          <p>${post.content}</p>
          ${post.image ? `<img src="${post.image}" alt="Post Image" />` : ""}
        `;
  
        postsContainer.appendChild(postDiv);
      });
    }
  
    // Profile pic logic (optional)
    const profilePic = document.getElementById("navProfilePic");
    const savedPic = localStorage.getItem("profilePic");
    if (savedPic && profilePic) {
      profilePic.src = savedPic;
    }
  
    const dropdown = document.getElementById("profileDropdown");
  
    if (profilePic && dropdown) {
      profilePic.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
      });
  
      window.addEventListener("click", (e) => {
        if (!e.target.closest(".profile-dropdown-wrapper")) {
          dropdown.style.display = "none";
        }
      });
    }
  
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("loggedInUser");
        localStorage.removeItem("profilePic");
        window.location.href = "index.html";
      });
    }
  });
  