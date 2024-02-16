const getDate = new Date();
const day = getDate.toLocaleString('default', { weekday: 'long' });
const month = getDate.toLocaleString('default', { month: 'long' });
const year = getDate.getFullYear();
const newTask = document.getElementById('new');
const tasks = document.getElementById('tasks');
const left = document.getElementById('left');
const done = document.getElementById('done');
const type = document.getElementById('dropbtn')

let checked = 0;
let completedTasks = 0;
let tasksLeft = 0;

document.getElementById('date').innerText = day + "/" + month + "/" + year;
done.innerText = completedTasks
left.innerText = tasksLeft;
function addTask(task, type) {
  if (type === 'Task type') {
    type = 'Personal';
  }
  if (document.getElementById(task) == null) {
    tasks.innerHTML +=
      `
      <div id="${task}div" class="task ${type}">
      <input type="checkbox" name="${task}" class="boxes" id="${task}"></span>
      <label for="${task}" id="${task}label">${task}</label>
      <span class="taskDate">Created: now.</span>
      <img src="/trash.png" onclick="removeTask('${task}')">
      </div>
      `;
    let currentHour = new Date();
    let am_pm = currentHour.toLocaleTimeString();
    localStorage.setItem(task, JSON.stringify({
      taskType: type,
      checked: false,
      date: {
        hour: getDate.toLocaleTimeString(),
        day: getDate.toLocaleString('default', { weekday: 'short' }),
        month: getDate.toLocaleString('default', { month: 'short' }),
        year: getDate.getFullYear()
      }
    }));

    tasksLeft = document.getElementsByClassName('task').length + checked
    left.innerText = tasksLeft;
  } else if (document.getElementById(task).id == task) {
    alert('This task already exists.')
  }
  document.getElementById('new').value = "";
}

function removeTask(idd) {
  if (document.getElementById(idd).checked) {
    checked++
    completedTasks--
  }
  document.getElementById(`${idd}div`).remove();
  localStorage.removeItem(idd);
  tasksLeft = document.getElementsByClassName('task').length + checked;
  left.innerText = tasksLeft;
  done.innerText = completedTasks;

}
// Events handlers
window.onload = () => {
  Object.keys(localStorage).forEach(key => {
    const taskData = JSON.parse(localStorage.getItem(key))
    tasks.innerHTML +=
      `
      <div id="${key}div" class="task ${taskData.taskType}">
        <input type="checkbox" name="${key}" class="boxes" id="${key}"></span>
        <label for="${key}" id="${key}label">${key}</label>
        <span class="taskDate">
            <span style="font-weight:bold;">
              Created on:
            </span>
        ${taskData.date.hour}, ${taskData.date.day}/${taskData.date.month}/${taskData.date.year} 
        </span>
        <img src="/trash.png" onclick="removeTask('${key}')">
      </div>
      `;
    if (taskData.checked === true) {
      document.getElementById(key).setAttribute("checked", "true");;
      document.getElementById(`${key}label`).style.textDecoration = 'line-through';
      document.getElementById(`${key}label`).style.color = "gray";
      completedTasks++
      checked--
    }
    tasksLeft = document.getElementsByClassName('task').length + checked;
    left.innerText = tasksLeft;
    done.innerText = completedTasks
  });
  newTask.addEventListener("keydown", (key) => {
    if (key.code === "Enter") {
      if (newTask.value == "") {
        return;
      } else {
        addTask(newTask.value, document.getElementById('dropbtn').innerText);
        tasksLeft = document.getElementsByClassName('task').length + checked;
      }
    }
  });

  tasks.addEventListener('change', (event) => {
    if (event.target.classList.contains('boxes')) {
      const checkBox = event.target;
      const id = event.target.id;
      const label = document.getElementById(`${id}label`);
      const taskData = JSON.parse(localStorage.getItem(id))
      if (checkBox.checked) {
        label.style.textDecoration = 'line-through';
        label.style.color = "gray";
        completedTasks++
        checked--
        taskData.checked = true;
        localStorage.setItem(id, JSON.stringify(taskData));
      } else {
        label.style.textDecoration = 'none';
        label.style.color = "black";
        taskData.checked = false;
        localStorage.setItem(id, JSON.stringify(taskData));
        completedTasks--
        checked++
      }
      done.innerText = completedTasks;
      tasksLeft = document.getElementsByClassName('task').length + checked;
      left.innerText = tasksLeft;
    }
  });
};

