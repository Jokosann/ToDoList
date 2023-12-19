// const containerTask = document.querySelector(".container-task");
// const btnAdd = document.querySelector(".btn-add");

// document.addEventListener("keyup", function (event) {
// 	if (event.key === "Enter") {
// 		const input = document.getElementById("text");
// 		if (input.value.length > 0) {
// 			containerTask.innerHTML += getTask(input.value);

// 			input.value = "";
// 		} else {
// 			input.classList.add("eror");
// 			setTimeout(function () {
// 				input.classList.remove("eror");
// 			}, 600);
// 		}
// 	}
// });

// document.addEventListener("click", function (e) {
// 	if (e.target.classList.contains("delete-icon")) {
// 		e.target.parentElement.parentElement.style.display = "none";
// 	}
// });

// function getTask(n) {
// 	return /*html*/ `
// 				<li class="section-taks">
// 					<label for="1" class="checkbox-wrapper-11">
// 						<input id="1" type="checkbox" name="r" value="2" />
// 						<span class="task-content">${n}</span>
// 					</label>
// 					<div class="delete">
//             <i class="uil uil-trash delete-icon"></i>
// 					</div>
// 				</li>`;
// }

const taskInput = document.querySelector("#text"),
	taskBox = document.querySelector(".container-task");

//! menyimpan hasil input user dilocalstorage berupa JSON
let todos = JSON.parse(localStorage.getItem("todo-list"));

// event ketika user input
taskInput.addEventListener("keyup", function (event) {
	if (event.key === "Enter") {
		// input value
		let usertask = taskInput.value;
		if (taskInput.value.length > 0) {
			if (!todos) {
				todos = [];
			}
			taskInput.value = "";
			let taskInfo = {
				name: usertask,
				status: "pending",
			};
			todos.push(taskInfo);
			localStorage.setItem("todo-list", JSON.stringify(todos));
			showTodo();
		} else {
			taskInput.classList.add("eror");
			setTimeout(() => {
				this.classList.remove("eror");
			}, 600);
		}
	}
});

function showTodo() {
	let litag = "";
	if (todos) {
		todos.forEach((todo, id) => {
			litag += `<li class="section-taks">
									<label for="${id}" class="checkbox-wrapper-11">
										<input id="${id}" type="checkbox" name="r" value="2" />
										<span class="task-content">${todo.name}</span>
									</label>
									<div class="delete">
										<i class="uil uil-trash delete-icon"></i>
									</div>
								</li>`;
		});
	}
	taskBox.innerHTML = litag;
}
