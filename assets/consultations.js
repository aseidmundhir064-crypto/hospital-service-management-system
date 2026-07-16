const token = localStorage.getItem("token");

document.getElementById("consultationForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const consultation = {
    patient: document.getElementById("patientId").value,
    symptoms: document.getElementById("symptoms").value,
    diagnosis: document.getElementById("diagnosis").value,
    notes: document.getElementById("notes").value,
    treatment_plan: document.getElementById("treatment").value
  };

  const response = await fetch("/api/consultations/", {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(consultation)
  });

  if (response.ok) {
    alert("Consultation saved successfully!");
    loadConsultations();
  } else {
    alert("Error saving consultation.");
  }
});

async function loadAppointments() {
  const response = await fetch("/api/appointments/", {
    headers: { "Authorization": `Bearer ${token}` }
  });
  const appointments = await response.json();
  const tbody = document.querySelector("#appointmentsTable tbody");
  tbody.innerHTML = "";
  appointments.forEach(a => {
    tbody.innerHTML += `<tr>
      <td>${a.id}</td>
      <td>${a.patient}</td>
      <td>${a.date}</td>
      <td>${a.time}</td>
      <td>${a.status}</td>
    </tr>`;
  });
}

async function loadConsultations() {
  const response = await fetch("/api/consultations/", {
    headers: { "Authorization": `Bearer ${token}` }
  });
  const consultations = await response.json();
  const tbody = document.querySelector("#consultationsTable tbody");
  tbody.innerHTML = "";
  consultations.forEach(c => {
    tbody.innerHTML += `<tr>
      <td>${c.id}</td>
      <td>${c.patient}</td>
      <td>${c.date}</td>
      <td>${c.diagnosis}</td>
    </tr>`;
  });
}

loadAppointments();
loadConsultations();
