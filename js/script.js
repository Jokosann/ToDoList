const containerTask = document.querySelector(".container-task");
const btnAdd = document.querySelector(".btn-add");

document.addEventListener("keyup", function (event) {
	if (event.key === "Enter") {
		const input = document.getElementById("text");
		if (input.value.length > 0) {
			containerTask.innerHTML += getTask(input.value);

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
				<li class="section-taks">
					<label for="1" class="checkbox-wrapper-11">
						<input id="1" type="checkbox" name="r" value="2" />
						<span class="task-content">${n}</span>
					</label>
					<div class="delete">
            <i class="uil uil-trash delete-icon"></i>
					</div>
				</li>`;
}
