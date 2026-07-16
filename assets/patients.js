const token = localStorage.getItem("token");

document.getElementById("patientForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const patient = {
    first_name: document.getElementById("firstName").value,
    last_name: document.getElementById("lastName").value,
    dob: document.getElementById("dob").value,
    gender: document.getElementById("gender").value,
    contact: document.getElementById("contact").value,
    address: document.getElementById("address").value
  };

  const response = await fetch("/api/patients/", {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(patient)
  });

  if (response.ok) {
    alert("Patient registered successfully!");
    loadPatients();
  } else {
    alert("Error registering patient.");
  }
});

async function loadPatients() {
  const response = await fetch("/api/patients/", {
    headers: { "Authorization": `Bearer ${token}` }
  });
  const patients = await response.json();
  const tbody = document.querySelector("#patientsTable tbody");
  tbody.innerHTML = "";
  patients.forEach(p => {
    tbody.innerHTML += `<tr>
      <td>${p.id}</td>
      <td>${p.first_name} ${p.last_name}</td>
      <td>${p.dob}</td>
      <td>${p.gender}</td>
      <td>${p.contact}</td>
    </tr>`;
  });
}

loadPatients();
