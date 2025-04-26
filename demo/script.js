let processIdCounter = 1;
function addProcess() {
  const arrival = document.getElementById('arrivalTime').value;
  const burst = document.getElementById('burstTime').value;
  if (arrival && burst) {
    const table = document.getElementById('processTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    newRow.innerHTML = `<td>P${processIdCounter}</td><td>${arrival}</td><td>${burst}</td>`;
    newRow.id = `P${processIdCounter}`;
    newRow.className = `bar-p${processIdCounter%4}`
    processIdCounter++;
  }
}

function runAlgorithm() {
  const gantt = document.getElementById('ganttChart');
  gantt.innerHTML = '';

  let rows = Array.from(document.querySelectorAll('tbody tr')).map(row => {
    const cells = row.getElementsByTagName('td');
    return {
      id: row.id,
      arrival: parseInt(cells[1].textContent),
      burst: parseInt(cells[2].textContent),
      className: row.className
    };
  });

  // Sort by arrival time (FCFS)
  rows.sort((a, b) => a.arrival - b.arrival);

  let currentTime = 0;
  let totalWaitingTime = 0;
  let totalTurnaroundTime = 0;

  rows.forEach(proc => {
    // If CPU is idle
    if (currentTime < proc.arrival) {
      currentTime = proc.arrival;
    }

    const startTime = currentTime;
    const finishTime = startTime + proc.burst;
    const waitingTime = startTime - proc.arrival;
    const turnaroundTime = finishTime - proc.arrival;

    totalWaitingTime += waitingTime;
    totalTurnaroundTime += turnaroundTime;

    // Draw Gantt chart
    const div = document.createElement('div');
    div.className = `bar ${proc.className}`;
    div.textContent = proc.id;
    div.style.width = (proc.burst * 30) + 'px'; // 30px per unit time (adjustable)
    gantt.appendChild(div);

    currentTime = finishTime;
  });

  const n = rows.length;
  document.getElementById('avgWaiting').innerText = (totalWaitingTime / n).toFixed(2);
  document.getElementById('avgTurnaround').innerText = (totalTurnaroundTime / n).toFixed(2);
  document.getElementById('totalExec').innerText = currentTime;
}
