import fs from "fs";
import { logger } from "./logger.js";

const CONFIG_FILE = ".pw-config.json";

export function loadConfig() {
    if (fs.existsSync(CONFIG_FILE)) {
        try {
            return JSON.parse(fs.readFileSync(CONFIG_FILE, "utf8"));
        } catch (error) {
            logger.error("Error reading config file. Using defaults.");
            return {};
        }
    }
    return {};
}

export function saveConfig(config) {
    try {
        fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
        logger.info("Configuration saved.");
    } catch (error) {
        logger.error("Failed to save configuration.");
    }
}