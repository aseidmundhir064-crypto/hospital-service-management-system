const token = localStorage.getItem("token");

async function loadMedicines() {
  const response = await fetch("/api/pharmacy/medicines/", {
    headers: { "Authorization": `Bearer ${token}` }
  });
  const medicines = await response.json();
  const tbody = document.querySelector("#medicinesTable tbody");
  tbody.innerHTML = "";
  medicines.forEach(m => {
    const lowStock = m.stock < 10 ? "⚠️ Low Stock" : "";
    tbody.innerHTML += `<tr>
      <td>${m.id}</td>
      <td>${m.name}</td>
      <td>${m.category}</td>
      <td>${m.stock} ${lowStock}</td>
      <td>${m.expiry_date}</td>
      <td>${m.price}</td>
    </tr>`;
  });
}

async function loadPrescriptions() {
  const response = await fetch("/api/pharmacy/prescriptions/", {
    headers: { "Authorization": `Bearer ${token}` }
  });
  const prescriptions = await response.json();
  const tbody = document.querySelector("#prescriptionsTable tbody");
  tbody.innerHTML = "";
  prescriptions.forEach(p => {
    const items = p.items.map(i => `${i.medicine} x ${i.quantity}`).join(", ");
    tbody.innerHTML += `<tr>
      <td>${p.id}</td>
      <td>${p.patient}</td>
      <td>${p.doctor}</td>
      <td>${p.date}</td>
      <td>${items}</td>
    </tr>`;
  });
}

loadMedicines();
loadPrescriptions();
