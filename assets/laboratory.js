const token = localStorage.getItem("token");

document.getElementById("resultForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const result = {
    lab_request: document.getElementById("requestId").value,
    result_details: document.getElementById("resultDetails").value
  };

  const response = await fetch("/api/laboratory/results/", {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(result)
  });

  if (response.ok) {
    alert("Result saved successfully!");
    loadResults();
  } else {
    alert("Error saving result.");
  }
});

async function loadRequests() {
  const response = await fetch("/api/laboratory/requests/", {
    headers: { "Authorization": `Bearer ${token}` }
  });
  const requests = await response.json();
  const tbody = document.querySelector("#requestsTable tbody");
  tbody.innerHTML = "";
  requests.forEach(r => {
    tbody.innerHTML += `<tr>
      <td>${r.id}</td>
      <td>${r.patient}</td>
      <td>${r.doctor}</td>
      <td>${r.test_name}</td>
      <td>${r.status}</td>
    </tr>`;
  });
}

async function loadResults() {
  const response = await fetch("/api/laboratory/results/", {
    headers: { "Authorization": `Bearer ${token}` }
  });
  const results = await response.json();
  const tbody = document.querySelector("#resultsTable tbody");
  tbody.innerHTML = "";
  results.forEach(res => {
    tbody.innerHTML += `<tr>
      <td>${res.id}</td>
      <td>${res.lab_request}</td>
      <td>${res.lab_request.patient}</td>
      <td>${res.result_details}</td>
      <td>${res.result_date}</td>
    </tr>`;
  });
}

loadRequests();
loadResults();
