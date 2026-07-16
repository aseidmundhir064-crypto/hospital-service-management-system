async function loadDashboard() {
  const token = localStorage.getItem("token");

  const patients = await fetch("/api/patients/", {
    headers: { "Authorization": `Bearer ${token}` }
  });
  document.getElementById("totalPatients").innerText = (await patients.json()).length;

  const doctors = await fetch("/api/users/?role=Doctor", {
    headers: { "Authorization": `Bearer ${token}` }
  });
  document.getElementById("totalDoctors").innerText = (await doctors.json()).length;

  const appointments = await fetch("/api/appointments/", {
    headers: { "Authorization": `Bearer ${token}` }
  });
  document.getElementById("totalAppointments").innerText = (await appointments.json()).length;

  const activities = await fetch("/api/reports/system-activities/", {
    headers: { "Authorization": `Bearer ${token}` }
  });
  document.getElementById("systemActivities").innerText = (await activities.json()).count;
}

async function loadUsers() {
  const token = localStorage.getItem("token");
  const response = await fetch("/api/admin/users/", {
    headers: { "Authorization": `Bearer ${token}` }
  });
  const users = await response.json();
  const tbody = document.querySelector("#usersTable tbody");
  tbody.innerHTML = "";
  users.forEach(u => {
    tbody.innerHTML += `<tr>
      <td>${u.id}</td>
      <td>${u.username}</td>
      <td>${u.email}</td>
      <td>${u.role.name}</td>
      <td>${u.is_active ? "Active" : "Inactive"}</td>
    </tr>`;
  });
}

loadDashboard();
loadUsers();
