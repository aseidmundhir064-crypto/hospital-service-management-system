const token = localStorage.getItem("token");

document.getElementById("vitalsForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const vitals = {
    patient: document.getElementById("patientId").value,
    blood_pressure: document.getElementById("bloodPressure").value,
    temperature: document.getElementById("temperature").value,
    weight: document.getElementById("weight").value,
    notes: document.getElementById("notes").value
  };

  const response = await fetch("/api/vitals/", {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(vitals)
  });

  if (response.ok) {
    alert("Vitals recorded successfully!");
    loadVitals();
  } else {
    alert("Error recording vitals.");
  }
});

async function loadVitals() {
  const response = await fetch("/api/vitals/", {
    headers: { "Authorization": `Bearer ${token}` }
  });
  const vitals = await response.json();
  const tbody = document.querySelector("#vitalsTable tbody");
  tbody.innerHTML = "";
  vitals.forEach(v => {
    tbody.innerHTML += `<tr>
      <td>${v.id}</td>
      <td>${v.patient}</td>
      <td>${v.date}</td>
      <td>${v.blood_pressure}</td>
      <td>${v.temperature} °C</td>
      <td>${v.weight} kg</td>
    </tr>`;
  });
}

loadVitals();
