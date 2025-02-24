import { loadTasks, saveTasks } from "./storage.js";

/**
 * Represents a single task.
 */
class ToDo {
    constructor(title, description, dueDate, priority = "Medium") {
        this.id = Date.now();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
    }
}

/**
 * Adds a new task.
 */
export function addTask(title, description, dueDate, priority) {
    if (!description.trim()) {
        console.log("Warning: You are adding a task with an empty description.");
    }

    if (dueDate && !isValidDate(dueDate)) {
        console.log("Invalid date format. Task not added.");
        return;
    }

    const tasks = loadTasks();
    const newTask = new ToDo(title, description, dueDate, priority);
    tasks.push(newTask);
    saveTasks(tasks);
    console.log("Task added successfully!");
}

/**
 * Validates a date string (YYYY-MM-DD format).
 */
function isValidDate(dateString) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) return false;

    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
}

/**
 * Lists all tasks sorted by due date.
 */
export function listTasks() {
    const tasks = loadTasks();
    const today = new Date().toISOString().split("T")[0];

    tasks.forEach((task) => {
        if (task.dueDate === today) {
            task.dueStatus = " Due Today!";
        } else if (task.dueDate && task.dueDate < today) {
            task.dueStatus = " Overdue!";
        } else {
            task.dueStatus = "";
        }
    });

    return tasks.sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
    });
}

/**
 * Displays full details of a specific task.
 */
    export function viewTaskDetails(taskId) {
    const tasks = loadTasks();
    const task = tasks.find((t) => t.id === taskId);

    if (!task) {
        console.log("Task not found.");
        return;
    }

    console.log(`
        |Task Details|
        ID: ${task.id}
        Title: ${task.title}
        Description: ${task.description || "No description provided."}
        Due Date: ${task.dueDate} ${task.dueStatus || ""}
        Priority: ${task.priority}
        Status: ${task.completed ? "Completed" : "Pending"}
    `);
}

/**
 * Marks a task as completed.
 */
export function completeTask(taskId) {
    let tasks = loadTasks();
    if (tasks.length === 0) {
        console.log("No tasks available to complete.");
        return;
    }

    const task = tasks.find((t) => t.id === taskId);
    if (task) {
        task.completed = true;
        saveTasks(tasks);
        console.log("Task marked as completed!");
    } else {
        console.log("Task not found.");
    }
}

/**
 * Deletes a task.
 */
export function deleteTask(taskId) {
    let tasks = loadTasks();
    if (tasks.length === 0) {
        console.log("No tasks available to delete.");
        return;
    }

    const newTasks = tasks.filter((task) => task.id !== taskId);
    if (tasks.length === newTasks.length) {
        console.log("Task not found.");
    } else {
        saveTasks(newTasks);
        console.log("Task deleted successfully!");
    }
}

/**
 * Edits a task.
 */
export function editTask(taskId, newTitle, newDescription, newDueDate, newPriority) {
    let tasks = loadTasks();
    if (tasks.length === 0) {
        console.log("No tasks available to edit.");
        return;
    }

    const task = tasks.find((t) => t.id === taskId);
    if (!task) {
        console.log("Task not found.");
        return;
    }

    if (newDueDate && !isValidDate(newDueDate)) {
        console.log("Invalid date format. Task update failed.");
        return;
    }

    task.title = newTitle || task.title;
    task.description = newDescription || task.description;
    task.dueDate = newDueDate || task.dueDate;
    task.priority = newPriority || task.priority;

    saveTasks(tasks);
    console.log("Task updated successfully!");
}