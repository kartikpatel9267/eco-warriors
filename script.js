let currentUser = null;
let users = [
  { id: 101, name: "Rahul", area: "Area A", points: 120 },
  { id: 102, name: "Sneha", area: "Area B", points: 95 },
  { id: 103, name: "Amit", area: "Area C", points: 70 },
];

// Example town areas with coordinates (Nagpur city demo)
let areas = [
  { name: "Area A", coords: [21.1458, 79.0882] }, // Nagpur center
  { name: "Area B", coords: [21.1700, 79.1000] }, // north side
  { name: "Area C", coords: [21.1300, 79.0500] }  // south-west side
];

let map;

function showPage(pageId) {
  document.querySelectorAll(".page").forEach(page => page.classList.add("hidden"));
  document.getElementById(pageId).classList.remove("hidden");

  if (pageId === "user" && currentUser) updateLeaderboard();
  if (pageId === "municipality") updateMunicipalityTable();
  if (pageId === "map") initMap();
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

function initMap() {
  if (!map) {
    map = L.map("realMap").setView([21.1458, 79.0882], 12); // Nagpur city center
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);
  }

  // Clear old markers
  map.eachLayer(layer => {
    if (layer instanceof L.Marker || layer instanceof L.CircleMarker) map.removeLayer(layer);
  });

  // Add markers for areas
  areas.forEach(area => {
    const areaUsers = users.filter(u => u.area === area.name);
    let avgPoints = 0;
    if (areaUsers.length > 0) {
      avgPoints = areaUsers.reduce((sum, u) => sum + u.points, 0) / areaUsers.length;
    }

    const color = avgPoints >= 100 ? "green" : "red";
    const marker = L.circleMarker(area.coords, {
      radius: 15,
      color: color,
      fillColor: color,
      fillOpacity: 0.7
    }).addTo(map);

    marker.bindPopup(`<b>${area.name}</b><br>Avg Points: ${avgPoints}`);
  });
}
