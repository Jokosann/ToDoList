// variable DOM
const taskInput = document.querySelector("#text"),
	taskBox = document.querySelector(".container-task"),
	filterSpan = document.querySelectorAll(".filters span"),
	clearAll = document.querySelector(".btn-clear");

// variable global
let editId;
let isEditTask = false;
//! menyimpan hasil input user dilocalstorage berupa JSON
let todos = JSON.parse(localStorage.getItem("todo-list"));

// event ketika user input
taskInput.addEventListener("keyup", function (event) {
	if (event.key === "Enter") {
		// input value
		let usertask = taskInput.value;
		if (taskInput.value.length > 0) {
			// jika edit true
			if (!isEditTask) {
				// delete inpur user
				taskInput.value = "";
				// check if !todos
				if (!todos) {
					todos = [];
				}
				// todo: todos
				let taskInfo = {
					name: usertask,
					status: "pending",
				};
				todos.push(taskInfo);
			} else {
				// jika edit false
				isEditTask = false;
				todos[editId].name = usertask;
			}
			// set item in json localstorage
			localStorage.setItem("todo-list", JSON.stringify(todos));
			// function showtodo()
			showTodo(document.querySelector("span.active").id);
		} else {
			// add class in input user
			taskInput.classList.add("eror");
			// remove class
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
		// delete class active in span
		document.querySelector("span.active").classList.remove("active");
		// add class active
		btn.classList.add("active");
		// show task => parameter btn.id in todos
		showTodo(btn.id);
	});
});

// delete task ALL
clearAll.addEventListener("click", () => {
	// hapus semua task
	todos.splice(0, todos.length);

	// set item json localstorage
	localStorage.setItem("todo-list", JSON.stringify(todos));
	showTodo();
});

// function update status in json localstorage
function updateStatus(selectedTask) {
	// var input.id
	const taskId = selectedTask.id;
	// every click/check => status->complate
	todos[taskId].status = selectedTask.checked ? "completed" : "pending";
	localStorage.setItem("todo-list", JSON.stringify(todos));
}

// function delete task
function deleteTask(deleted) {
	todos.splice(deleted, 1);
	localStorage.setItem("todo-list", JSON.stringify(todos));
	showTodo(document.querySelector("span.active").id);
}

function editTask(taskId, taskName) {
	/*
		output: index of todos, name of task eventClick
	*/
	isEditTask = true;
	editId = taskId;
	// input user
	taskInput.value = taskName;
}

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
									<div class="delete" >
										<i onclick="editTask(${id}, '${todo.name}')" class="uil uil-pen"></i>
										<i onclick="deleteTask(${id})" class="uil uil-trash delete-icon"></i>
									</div>
								</li>`;
			}
		});
		taskBox.innerHTML = litag || `<span class="clear">You don't have any task here</span>`;
		// for scroll-Y of container-task if height > 202.67px
		taskBox.offsetHeight > 202.67
			? taskBox.classList.add("overflow")
			: taskBox.classList.remove("overflow");
	}
}
showTodo("all");
