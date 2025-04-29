// post.js
const currentUser = localStorage.getItem("loggedInUser") || "Anonymous";
const postForm = document.getElementById("postForm");
const postsContainer = document.getElementById("postsContainer");

window.onload = function () {
  const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
  savedPosts.forEach(showPost);
};

postForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const title = document.getElementById("postTitle").value;
  const content = document.getElementById("postContent").value;
  const category = document.getElementById("postCategory").value;
  const imageInput = document.getElementById("postImage");
  const reader = new FileReader();

  reader.onload = function () {
    const imageData = reader.result;
    savePost({ title, content, username: currentUser, category, image: imageData });

  };

  if (imageInput.files.length > 0) {
    reader.readAsDataURL(imageInput.files[0]);
  } else {
    savePost({ title, content, author: currentUser, category, image: null });
  }
});

function savePost(post) {
  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  posts.push(post);
  localStorage.setItem("posts", JSON.stringify(posts));
  showPost(post);
  document.getElementById("postConfirmation").innerText = "✅ Post created successfully!";
  postForm.reset();
}

function showPost(post) {
  const postElement = document.createElement("div");
  postElement.className = "post";
  postElement.innerHTML = `
    <h3>${post.title}</h3>
    <p><strong>By:</strong> ${post.username} | <strong>Category:</strong> ${post.category}</p>
    <p>${post.content}</p>
    ${post.image ? `<img src="${post.image}" alt="Post Image" />` : ""}
    <div class="post-actions">
      <button onclick="editPost(this)">Edit</button>
      <button onclick="deletePost(this)">Delete</button>
    </div>
  `;
  postsContainer.prepend(postElement);
}

function editPost(button) {
  const postDiv = button.parentElement.parentElement;
  const title = prompt("Edit Title", postDiv.querySelector("h3").innerText);
  const content = prompt("Edit Content", postDiv.querySelectorAll("p")[1].innerText);
  if (title && content) {
    postDiv.querySelector("h3").innerText = title;
    postDiv.querySelectorAll("p")[1].innerText = content;
    updateLocalStorage();
  }
}

function deletePost(button) {
  const postDiv = button.parentElement.parentElement;
  postDiv.remove();
  updateLocalStorage();
}

function updateLocalStorage() {
  const posts = [];
  document.querySelectorAll(".post").forEach(postDiv => {
    const title = postDiv.querySelector("h3").innerText;
    const authorLine = postDiv.querySelector("p").innerText; F
    const content = postDiv.querySelectorAll("p")[1].innerText;
    const image = postDiv.querySelector("img")?.src || null;
    const [username, category] = authorLine.match(/By: (.*?) \| Category: (.*)/).slice(1);
    posts.push({ title, content, username, category, image });
  });
  localStorage.setItem("posts", JSON.stringify(posts));
}
