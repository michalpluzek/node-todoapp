import parseArgs from "minimist";
import handleCommand from "./handleCommand.js";

const command = parseArgs(process.argv.slice(2, 3));
delete command._;

handleCommand(command);
