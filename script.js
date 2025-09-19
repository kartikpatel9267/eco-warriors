let currentUser = null;
let users = [
  { id: 101, name: "Rahul", area: "Area A", points: 120 },
  { id: 102, name: "Sneha", area: "Area B", points: 95 },
  { id: 103, name: "Amit", area: "Area C", points: 70 },
];

let areas = [
  { name: "Area A", x: 50, y: 60 },
  { name: "Area B", x: 200, y: 100 },
  { name: "Area C", x: 120, y: 200 },
];

function showPage(pageId) {
  document.querySelectorAll(".page").forEach(page => page.classList.add("hidden"));
  document.getElementById(pageId).classList.remove("hidden");

  if (pageId === "user" && currentUser) updateLeaderboard();
  if (pageId === "municipality") updateMunicipalityTable();
  if (pageId === "map") drawMap();
}

function registerUser() {
  const name = document.getElementById("name").value;
  const area = document.getElementById("area").value;
  if (!name || !area) {
    alert("Please enter all details");
    return;
  }

  const userId = Date.now();
  currentUser = { id: userId, name, area, points: 0 };
  users.push(currentUser);

  document.getElementById("userId").innerText = userId;
  document.getElementById("userName").innerText = name;
  document.getElementById("userArea").innerText = area;
  document.getElementById("userPoints").innerText = currentUser.points;

  document.getElementById("register-form").classList.add("hidden");
  document.getElementById("user-profile").classList.remove("hidden");

  updateLeaderboard();
}

function addPoints() {
  if (!currentUser) return;
  currentUser.points += 10;
  document.getElementById("userPoints").innerText = currentUser.points;
  updateLeaderboard();
  updateMunicipalityTable();
}

function updateLeaderboard() {
  const leaderboard = document.getElementById("leaderboard");
  leaderboard.innerHTML = "";

  const sorted = [...users].sort((a, b) => b.points - a.points);
  sorted.forEach(u => {
    const li = document.createElement("li");
    li.textContent = `${u.name} (${u.area}) - ${u.points} points`;
    leaderboard.appendChild(li);
  });
}

function updateMunicipalityTable() {
  const table = document.getElementById("municipalityTable");
  table.innerHTML = `
    <tr><th>User ID</th><th>Name</th><th>Area</th><th>Points</th></tr>
  `;

  users.forEach(u => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${u.id}</td><td>${u.name}</td><td>${u.area}</td><td>${u.points}</td>`;
    table.appendChild(row);
  });
}

function drawMap() {
  const container = document.getElementById("mapContainer");
  container.innerHTML = "";

  areas.forEach(area => {
    // Calculate avg points of this area
    const areaUsers = users.filter(u => u.area === area.name);
    let avgPoints = 0;
    if (areaUsers.length > 0) {
      avgPoints = areaUsers.reduce((sum, u) => sum + u.points, 0) / areaUsers.length;
    }

    // Green if segregation good (>=100 points), Red if bad
    const color = avgPoints >= 100 ? "green" : "red";

    const circle = document.createElement("div");
    circle.className = "areaCircle";
    circle.style.left = area.x + "px";
    circle.style.top = area.y + "px";
    circle.style.backgroundColor = color;
    circle.title = `${area.name} - Avg Points: ${avgPoints}`;
    container.appendChild(circle);
  });
}
