const getDate = new Date();
const day = getDate.toLocaleString('default', { weekday: 'long' });
const month = getDate.toLocaleString('default', { month: 'long' });
const year = getDate.getFullYear();
const newTask = document.getElementById('new');
const tasks = document.getElementById('tasks');
let left = document.getElementById('left');
let done = document.getElementById('done');
let checked = 0;
let completedTasks = 0;
let tasksLeft = 0;

document.getElementById('date').innerText = day + "/" + month + "/" + year;
done.innerText = completedTasks
left.innerText = tasksLeft;
function addTask(task) {
  if (document.getElementById(task) == null) {
    tasks.innerHTML +=
      `
      <div id="${task}div" class="task">
      <input type="checkbox" name="${task}" class="boxes" id="${task}"></span>
      <label for="${task}" id="${task}label">${task}</label>
      <img src="/trash.png" onclick="removeTask('${task}')">
      </div>
      `;
    localStorage.setItem(task, false);
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
  }
  document.getElementById(`${idd}div`).remove();
  localStorage.removeItem(idd);
  tasksLeft = document.getElementsByClassName('task').length + checked;
  left.innerText = tasksLeft;

}

// Events handlers
window.onload = () => {
  Object.keys(localStorage).forEach(key => {
    tasks.innerHTML +=
      `
      <div id="${key}div" class="task">
      <input type="checkbox" name="${key}" class="boxes" id="${key}"></span>
      <label for="${key}" id="${key}label">${key}</label>
      <img src="/trash.png" onclick="removeTask('${key}')">
      </div>
      `;

    if (localStorage.getItem(key) === 'true') {
      document.getElementById(key).setAttribute("checked", "true");;
      document.getElementById(`${key}label`).style.textDecoration = 'line-through';
      document.getElementById(`${key}label`).style.color = "gray";
      completedTasks++
      checked--
    }
    tasksLeft = document.getElementsByClassName('task').length + checked;
    left.innerText = tasksLeft;
  });
  newTask.addEventListener("keydown", (key) => {
    if (key.code === "Enter") {
      if (newTask.value == "") {
        return;
      } else {
        addTask(newTask.value);
        tasksLeft = document.getElementsByClassName('task').length + checked;
      }
    }
  });

  tasks.addEventListener('change', (event) => {
    if (event.target.classList.contains('boxes')) {
      const checkBox = event.target;
      const id = event.target.id;
      const label = document.getElementById(`${id}label`);

      if (checkBox.checked) {
        label.style.textDecoration = 'line-through';
        label.style.color = "gray";
        completedTasks++
        checked--
        localStorage.setItem(id, true)
      } else {
        label.style.textDecoration = 'none';
        label.style.color = "black";
        localStorage.setItem(id, false)
        completedTasks--
        checked++
      }
      done.innerText = completedTasks;
      tasksLeft = document.getElementsByClassName('task').length + checked;
      left.innerText = tasksLeft;
    }
  });
};

