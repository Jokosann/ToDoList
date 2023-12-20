const taskInput = document.querySelector("#text"),
	taskBox = document.querySelector(".container-task"),
	filterSpan = document.querySelectorAll(".filters span"),
	clearAll = document.querySelector(".btn-clear");

//! menyimpan hasil input user dilocalstorage berupa JSON
let todos = JSON.parse(localStorage.getItem("todo-list"));
if (!todos) {
	todos = [];
}

// event ketika user input
taskInput.addEventListener("keyup", function (event) {
	if (event.key === "Enter") {
		// input value
		let usertask = taskInput.value;
		if (taskInput.value.length > 0) {
			taskInput.value = "";
			let taskInfo = {
				name: usertask,
				status: "pending",
			};
			todos.push(taskInfo);
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

filterSpan.forEach((btn) => {
	btn.addEventListener("click", function () {
		document.querySelector("span.active").classList.remove("active");
		btn.classList.add("active");
		showTodo(btn.id);
	});
});

clearAll.addEventListener("click", () => {
	todos.splice(0, todos.length);
	localStorage.setItem("todo-list", JSON.stringify(todos));
	showTodo();
});

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
									<div class="delete" onclick="deleteTask(${id}, ${filter})">
										<i class="uil uil-trash delete-icon"></i>
									</div>
								</li>`;
			}
		});
	}
	taskBox.innerHTML = litag || `<span class="clear">You don't have any task here</span>`;
}
showTodo("all");

function updateStatus(selectedTask) {
	const taskId = selectedTask.id;
	todos[taskId].status = selectedTask.checked ? "completed" : "pending";
	localStorage.setItem("todo-list", JSON.stringify(todos));
}

function deleteTask(deleted, filter) {
	todos.splice(deleted, 1);
	localStorage.setItem("todo-list", JSON.stringify(todos));
	showTodo(filter);
}
