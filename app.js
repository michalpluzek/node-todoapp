import parseArgs from "minimist";
import colors from "colors";

const command = parseArgs(process.argv.slice(2, 3));
delete command._;

const handleCommand = ({ add, list, remove }) => {
  if (add) {
    if (typeof add !== "string")
      return console.log("Wpisz nazwę dodawanego zadania (tekst!!!)".red);
    else if (add.length < 4)
      return console.log("Nazwa zadania musi mieć wiecej niż 3 znaki".red);
    handleData();
    console.log("dodaj zadanie");
  } else if (list || list === "") {
    console.log("lista zadań");
  } else if (remove) {
    if (typeof remove !== "string" || add.length < 4)
      return console.log("Wpisz nazwę usuwanego zadania".red);
    handleData();
    console.log("usuń zadanie");
  } else
    console.log(
      'Nie rozpoznano polecenia. Użyj --add="nazwa zadania", --remove="nazwa zadania", --list'
    );
};

const handleData = () => {};

handleCommand(command);
