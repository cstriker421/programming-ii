import yargs from "yargs";
import { hideBin } from "yargs/helpers";

export function parseArgs() {
    return yargs(hideBin(process.argv))
        .option("length", {
            alias: "l",
            type: "number",
            description: "Length of the password",
            default: 12
        })
        .option("uppercase", {
            alias: "u",
            type: "boolean",
            description: "Include uppercase letters"
        })
        .option("numbers", {
            alias: "n",
            type: "boolean",
            description: "Include numbers"
        })
        .option("save", {
            alias: "s",
            type: "boolean",
            description: "Save current options as default"
        })
        .help()
        .alias("help", "h")
        .argv;
}