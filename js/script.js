const containerTask = document.querySelector(".container-task");
const btnAdd = document.querySelector(".btn-add");

document.addEventListener("keyup", function (event) {
	if (event.key === "Enter") {
		const input = document.getElementById("text");
		if (input.value.length > 0) {
			containerTask.innerHTML += getTask(input.value);

			const check = document.querySelectorAll(".check");
			check.forEach((e) => {
				e.addEventListener("click", function () {
					e.parentElement.parentElement.classList.toggle("active");
				});
				e.parentElement.parentElement.classList.remove("active");
			});

			input.value = "";
		} else {
			input.classList.add("eror");
			setTimeout(function () {
				input.classList.remove("eror");
			}, 600);
		}
	}
});

document.addEventListener("click", function (e) {
	if (e.target.classList.contains("delete-icon")) {
		e.target.parentElement.parentElement.style.display = "none";
	}
});

function getTask(n) {
	return /*html*/ `
	<div class="section-taks">
		<div class="label">
			<input type="checkbox" name="check" id="check" class="check" />
			<div class="task-content">
				<span>${n}</span>
			</div>
		</div>
		<div class="delete">
			<i class="fa-solid fa-trash-can delete-icon"></i>
		</div>
	</div>`;
}
