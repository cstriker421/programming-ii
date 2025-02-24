import fs from "fs";

const FILE_PATH = "./tasks.json";

/**
 * Loads tasks from a JSON file.
 * @returns {Array} - List of tasks.
 */
export function loadTasks() {
    if (!fs.existsSync(FILE_PATH)) return [];
    const data = fs.readFileSync(FILE_PATH, "utf8");
    return data ? JSON.parse(data) : [];
}

/**
 * Saves tasks to a JSON file.
 * @param {Array} tasks - List of tasks.
 */
export function saveTasks(tasks) {
    fs.writeFileSync(FILE_PATH, JSON.stringify(tasks, null, 2));
}