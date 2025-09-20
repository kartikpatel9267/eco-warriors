let users = [];
let currentUser = null;

function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
  document.getElementById(pageId).classList.remove('hidden');
  if (pageId === "municipality") {
    updateLeaderboard();
  }
}

document.getElementById("userForm").addEventListener("submit", function(e) {
  e.preventDefault();
  let name = document.getElementById("name").value;
  let area = document.getElementById("area").value;

  currentUser = {
    id: Date.now(),
    name,
    area,
    points: 0,
    wasteSubmissions: []
  };

  users.push(currentUser);
  alert("Profile Created for " + name);
  document.getElementById("userForm").reset();
  updateLeaderboard();
});

function addWaste() {
  if (!currentUser) {
    alert("Please create a profile first.");
    return;
  }
  let wasteType = prompt("Enter Waste Type (Biodegradable/Non-Biodegradable):");
  if (wasteType) {
    currentUser.points += 10;
    currentUser.wasteSubmissions.push({
      type: wasteType,
      date: new Date().toLocaleString()
    });
    alert("Waste added! Points: " + currentUser.points);
    updateLeaderboard();
  }
}

function showDashboard() {
  if (!currentUser) {
    alert("No profile found. Please create one first.");
    return;
  }

  let dashboard = `
    <h3>User Profile</h3>
    <p><b>Name:</b> ${currentUser.name}</p>
    <p><b>Area:</b> ${currentUser.area}</p>
    <p><b>Points:</b> ${currentUser.points}</p>

    <h3>Waste Submissions</h3>
    <table>
      <tr>
        <th>Type</th>
        <th>Date</th>
      </tr>
      ${currentUser.wasteSubmissions.map(w => `
        <tr>
          <td>${w.type}</td>
          <td>${w.date}</td>
        </tr>
      `).join("")}
    </table>
  `;

  document.getElementById("dashboardContent").innerHTML = dashboard;
  showPage("dashboard");
}

// Leaderboard function
function updateLeaderboard() {
  let table = document.getElementById("leaderboardTable");
  table.innerHTML = `
    <tr>
      <th>Rank</th>
      <th>Name</th>
      <th>Area</th>
      <th>Points</th>
    </tr>
  `;

  let sortedUsers = [...users].sort((a, b) => b.points - a.points);
  sortedUsers.forEach((u, index) => {
    let row = `
      <tr>
        <td>${index + 1}</td>
        <td>${u.name}</td>
        <td>${u.area}</td>
        <td>${u.points}</td>
      </tr>
    `;
    table.innerHTML += row;
  });
}
