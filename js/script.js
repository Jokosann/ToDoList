// variable DOM
const taskInput = document.querySelector("#text"),
	taskBox = document.querySelector(".container-task"),
	filterSpan = document.querySelectorAll(".filters span"),
	clearAll = document.querySelector(".btn-clear");

// variable global
let editId;
let isEditTask = false;
//! menyimpan hasil input user dilocalstorage berupa JSON
let todos = JSON.parse(localStorage.getItem("todo-list")) || [];

// show task in client
function showTodo(filter) {
	let litag = "";
	if (todos) {
		todos.forEach((todo, id) => {
			if (filter == todo.status || filter == "all") {
				litag += /*html*/ `<li class="section-taks">
									<label for="${id}" class="checkbox-wrapper-11">
										<input onclick="updateStatus(this)" id="${id}" type="checkbox" name="r" value="2" ${
					todo.status === "completed" ? "checked" : ""
				} />
										<span class="task-content">${todo.name}</span>
									</label>
									<div class="settings" >
										<div onclick="editTask(${id}, '${todo.name}')" class="edit" ${
					todo.status === "completed" ? 'style="visibility: hidden"' : ""
				}  >
											<i class="uil uil-pen"></i>
										</div>
										<div onclick="deleteTask(${id}, '${filter}')" class="delete">
											<i class="uil uil-trash delete-icon"></i>
										</div>
									</div>
								</li>`;
			}
		});
		taskBox.innerHTML = litag || `<span class="clear">You don't have any task here</span>`;
		// for scroll-Y of container-task if height > 202.67px
		taskBox.classList.toggle("overflow", taskBox.offsetHeight > 204);
	}
}
showTodo("all");

// event ketika user input
taskInput.addEventListener("keyup", function (event) {
	if (event.key === "Enter") {
		let usertask = taskInput.value.trim();
		if (taskInput.value.length > 0) {
			taskInput.value = "";
			// editTask = true ? jika false makan akan menambah list task
			if (!isEditTask) {
				// todo: todos
				let taskInfo = {
					name: usertask,
					status: "pending",
				};
				todos.push(taskInfo);
			} else {
				isEditTask = false;
				todos[editId].name = usertask;
			}

			localStorage.setItem("todo-list", JSON.stringify(todos));
			showTodo(document.querySelector("span.active").id);
		} else {
			taskInput.classList.add("eror");
			setTimeout(() => {
				this.classList.remove("eror");
			}, 600);
		}
	}
});

// looping controls
filterSpan.forEach((btn) => {
	// eventlistener in every <span/>
	btn.addEventListener("click", function () {
		document.querySelector("span.active").classList.remove("active");
		btn.classList.add("active");
		showTodo(btn.id);
	});
});

// delete task ALL
clearAll.addEventListener("click", () => {
	isEditTask = false;
	todos.splice(0, todos.length);
	localStorage.setItem("todo-list", JSON.stringify(todos));
	showTodo();
});

// function update status in json localstorage
function updateStatus(selectedTask) {
	// var input.id
	const taskId = selectedTask.id;
	todos[taskId].status = selectedTask.checked ? "completed" : "pending";
	const setting = document.querySelectorAll(".edit")[taskId];
	if (todos[taskId].status == "completed") {
		setting.style.visibility = "hidden";
	} else {
		setting.style.visibility = "visible";
	}
	localStorage.setItem("todo-list", JSON.stringify(todos));
}

// function delete task
function deleteTask(deleted, filter) {
	isEditTask = false;
	todos.splice(deleted, 1);
	localStorage.setItem("todo-list", JSON.stringify(todos));
	showTodo(filter);
}

function editTask(taskId, taskName) {
	/*
		output: index of todos, name of task eventClick
	*/
	isEditTask = true;
	editId = taskId;
	// input user
	taskInput.value = taskName;
	taskInput.focus();
	showTodo(document.querySelector("span.active").id);
}
