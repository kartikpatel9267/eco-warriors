function showPage(pageId) {
  document.querySelectorAll(".page").forEach(page => page.classList.add("hidden"));
  document.getElementById(pageId).classList.remove("hidden");
}

function registerUser() {
  const name = document.getElementById("name").value;
  const area = document.getElementById("area").value;
  if (!name || !area) {
    alert("Please enter all details");
    return;
  }

  const userId = Date.now();
  document.getElementById("userId").innerText = userId;
  document.getElementById("userName").innerText = name;
  document.getElementById("userArea").innerText = area;

  document.getElementById("register-form").classList.add("hidden");
  document.getElementById("user-profile").classList.remove("hidden");
}
