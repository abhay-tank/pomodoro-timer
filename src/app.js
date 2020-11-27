import { Todo } from "./components/todo.js";
import {
	startTimer,
	pauseTimer,
	setWorkBreakTime,
	updatepomodoroUI,
	hardResetPomodoro,
} from "./components/pomodoroTimer.js";
import { updateTaskSelect } from "./helper/updateTaskSelectMarkup.js";
import { updateTaskListMarkup } from "./helper/updateTaskListMarkup.js";
import { addTaskToActiveList } from "./helper/addTaskToActiveListMarkup.js";
import * as controlButtons from "./components/controlButtons.js";

const minsContainer = document.getElementById("mins");
const secsContainer = document.getElementById("secs");
let taskList = [];
let currentTask;
window.onload = () => {
	controlButtons.pausePomodoroTimerButton.classList.add("disable");
	controlButtons.resetPomodoroTimerButton.classList.add("disable");
	controlButtons.completedTaskButton.classList.add("disable");
	showWorkMins();
	showBreakMins();
	updatepomodoroUI();
};

const addTask = (event) => {
	event.preventDefault();
	try {
		let taskTitle = document.forms.todoListInputForm.taskTitleInput.value;
		let taskContent = document.forms.todoListInputForm.taskDescription.value;
		console.log(taskTitle, taskContent);
		if (taskTitle.length) {
			let task = new Todo({
				todoID:
					(Math.random() * (100 - 1) + 1).toString() + Date.now().toString(),
				todoTitle: taskTitle,
				todoContent: taskContent,
				todoCreatedAt: new Date(),
				todoCompleted: false,
			});
			taskList.push(task);
			updateTaskSelect();
			updateTaskListMarkup();
			document.getElementById("taskTitle").value = "";
			document.getElementById("taskDescInput").value = "";
		} else {
			throw new Error("Task should have a title 😒");
		}
	} catch (error) {
		console.error(error);
		alert(error);
	}
};

const startPomodoro = () => {
	try {
		let workMins = document.getElementById("workMinsInput").value;
		let breakMins = document.getElementById("breakMinsInput").value;
		let selectedTask = document.getElementById("selectTaskInput").value;
		console.log(selectedTask);
		if (
			workMins >= 20 &&
			workMins <= 30 &&
			breakMins >= 5 &&
			breakMins <= 30 &&
			selectedTask.length &&
			selectedTask != ""
		) {
			document.getElementById("taskSelect").style.display = "none";
			let task = taskList.find((task) => task.todoID == selectedTask);
			currentTask = task;
			addTaskToActiveList(currentTask);
			setWorkBreakTime(2, 1);
			startTimer();
		} else {
			throw new Error("Enter valid input");
		}
	} catch (error) {
		console.error(error);
		alert(error);
	}
};

const pausePomodoro = () => {
	pauseTimer();
};

const completedTask = () => {
	pauseTimer();
	controlButtons.completedTaskButton.classList.add("disable");
	document.getElementById("taskSelect").style.display = "flex";
	alert("Select New Task or Reset Pomodoro Timer");
	let taskIndex = taskList.findIndex((task) => task == currentTask);
	taskList.splice(taskIndex, 1);
	updateTaskSelect();
	updateTaskListMarkup();
	let activeTaskListContainer = document.getElementById("activeTask");
	if (activeTaskListContainer.hasChildNodes()) {
		activeTaskListContainer
			.querySelectorAll("*")
			.forEach((node) => node.remove());
	}
};

const resetPomodoroTimer = () => {
	hardResetPomodoro();
};

const showWorkMins = () => {
	let workMins = document.getElementById("workMinsInput").value;
	document.getElementById("workMins").innerHTML = workMins;
};

const showBreakMins = () => {
	let breakMins = document.getElementById("breakMinsInput").value;
	document.getElementById("breakMins").innerHTML = breakMins;
};

const closeInstructions = () => {
	document.getElementById("bannerSection").style.display = "none";
};

window.addTask = addTask;
window.startPomodoro = startPomodoro;
window.pausePomodoro = pausePomodoro;
window.resetTimer = resetPomodoroTimer;
window.completedTask = completedTask;
window.showWorkMins = showWorkMins;
window.showBreakMins = showBreakMins;
window.closeInstructions = closeInstructions;
export { taskList, currentTask };
