const token = localStorage.getItem("token");

async function loadReport() {
  const period = document.getElementById("period").value;
  const response = await fetch(`/api/reports/summary/?period=${period}`, {
    headers: { "Authorization": `Bearer ${token}` }
  });
  const data = await response.json();

  document.getElementById("patientsCount").innerText = data.patients;
  document.getElementById("appointmentsCount").innerText = data.appointments;
  document.getElementById("consultationsCount").innerText = data.consultations;
  document.getElementById("labRequestsCount").innerText = data.lab_requests;
  document.getElementById("labResultsCount").innerText = data.lab_results;
  document.getElementById("prescriptionsCount").innerText = data.prescriptions;
  document.getElementById("lowStockCount").innerText = data.medicines_low_stock;
}

function exportPDF() {
  window.print(); // Simple browser-based PDF export
}
