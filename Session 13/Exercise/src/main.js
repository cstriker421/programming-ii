import chalk from "chalk";
import { generatePassword } from "./src/generatePassword.js";
import { loadConfig, saveConfig } from "./src/config.js";
import { logger } from "./src/logger.js";
import { parseArgs } from "./src/cli.js";

const argv = parseArgs();
const savedConfig = loadConfig();

const length = argv.length || savedConfig.length || 12;
const includeUppercase = argv.uppercase ?? savedConfig.uppercase ?? false;
const includeNumbers = argv.numbers ?? savedConfig.numbers ?? false;

if (argv.save) {
    saveConfig({ length, includeUppercase, includeNumbers });
}

const password = generatePassword(length, includeUppercase, includeNumbers);
console.log(chalk.green(`Generated Password: ${password}`));

logger.info(`Generated password with length=${length}, uppercase=${includeUppercase}, numbers=${includeNumbers}`);