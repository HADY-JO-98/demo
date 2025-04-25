let processIdCounter = 5;

function addProcess() {
  const arrival = document.getElementById('arrivalTime').value;
  const burst = document.getElementById('burstTime').value;
  if (arrival && burst) {
    const table = document.getElementById('processTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    newRow.innerHTML = `<td>P${processIdCounter}</td><td>${arrival}</td><td>${burst}</td>`;
    processIdCounter++;
  }
}

function runAlgorithm() {
  const gantt = document.getElementById('ganttChart');
  gantt.innerHTML = '';
  // Just a placeholder - logic needs to be added
  const sampleBars = [
    { id: 'P1', class: 'bar-p1' },
    { id: 'P2', class: 'bar-p2' },
    { id: 'P3', class: 'bar-p3' },
    { id: 'P4', class: 'bar-p4' },
  ];
  sampleBars.forEach(proc => {
    const div = document.createElement('div');
    div.className = `bar ${proc.class}`;
    div.textContent = proc.id;
    div.style.width = '60px';
    gantt.appendChild(div);
  });

  document.getElementById('avgWaiting').innerText = '3.0';
  document.getElementById('avgTurnaround').innerText = '7.5';
  document.getElementById('totalExec').innerText = '16';
}
