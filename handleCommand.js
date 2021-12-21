import colors from "colors";
import handleData from "./handleData.js";

const handleCommand = ({ add, list, remove }) => {
  if (add) {
    if (typeof add !== "string")
      return console.log("Wpisz nazwę dodawanego zadania (tekst!!!)".red);
    else if (add.length < 4)
      return console.log("Nazwa zadania musi mieć wiecej niż 3 znaki".red);
    handleData(1, add);
  } else if (remove) {
    if (typeof remove !== "string" || remove.length < 4)
      return console.log("Wpisz nazwę usuwanego zadania".red);
    handleData(2, remove);
  } else if (list || list === "") {
    handleData(3, null);
  } else
    console.log(
      'Nie rozpoznano polecenia. Użyj --add="nazwa zadania", --remove="nazwa zadania", --list'
        .red
    );
};

export default handleCommand;
