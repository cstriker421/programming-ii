import readline from "readline";
import { addTask, listTasks, completeTask, deleteTask, editTask, viewTaskDetails } from "./todo.js";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function showMenu() {
    console.log(`
        -- TODO Manager --
        1️ - Add Task
        2️ - List Tasks (Sorted by Due Date)
        3️ - View Task Details
        4️ - Complete Task
        5️ - Edit Task
        6️ - Delete Task
        7️ - Exit
    `);
    rl.question("Choose an option: ", (choice) => {
        switch (choice) {
            case "1":
                rl.question("Enter title: ", (title) => {
                    rl.question("Enter description: ", (description) => {
                        function askDueDate() {
                            rl.question("Enter due date (YYYY-MM-DD) or press Enter to skip: ", (dueDate) => {
                                if (dueDate && !isValidDate(dueDate)) {
                                    console.log("Invalid date format. Please try again.");
                                    askDueDate();
                                } else {
                                    rl.question("Enter priority (Low, Medium, High): ", (priority) => {
                                        addTask(title, description, dueDate, priority);
                                        showMenu();
                                    });
                                }
                            });
                        }
                        askDueDate();
                    });
                });
            break;

            case "2":
                const tasks = listTasks();
                if (tasks.length === 0) {
                    console.log("\nYour task list is empty.");
                } else {
                    console.log("\nYour Tasks (Sorted by Due Date):");
                    tasks.forEach((task) => {
                        console.log(
                            `${task.id} - ${task.title} [${task.priority}] - Due: ${task.dueDate || "No Due Date"} ${
                                task.dueStatus ? task.dueStatus : ""
                            } - ${task.completed ? "Completed" : "Pending"}`
                        );
                    });
                }
                showMenu();
            break;

            case "3":
                rl.question("Enter task ID to view details: ", (id) => {
                    viewTaskDetails(Number(id));
                    showMenu();
                });
            break;

            case "4":
                rl.question("Enter task ID to complete: ", (id) => {
                    completeTask(Number(id));
                    showMenu();
                });
            break;

            case "5":
                rl.question("Enter task ID to edit: ", (id) => {
                    rl.question("New title (leave blank to keep current): ", (newTitle) => {
                        rl.question("New description (leave blank to keep current): ", (newDescription) => {
                            function askNewDueDate() {
                                rl.question("New due date (YYYY-MM-DD, leave blank to keep current): ", (newDueDate) => {
                                    if (newDueDate && !isValidDate(newDueDate)) {
                                        console.log("Invalid date format. Please try again.");
                                        askNewDueDate();
                                    } else {
                                        rl.question("New priority (Low, Medium, High, leave blank to keep current): ", (newPriority) => {
                                            editTask(Number(id), newTitle, newDescription, newDueDate, newPriority);
                                            showMenu();
                                        });
                                    }
                                });
                            }
                            askNewDueDate();
                        });
                    });
                });
            break;

            case "6":
                rl.question("Enter task ID to delete: ", (id) => {
                deleteTask(Number(id));
                showMenu();
            });
            break;

            case "7":
                console.log("Goodbye!");
                rl.close();
            break;

            default:
                console.log("Invalid option. Try again.");
                showMenu();
        }
    });
}

showMenu();