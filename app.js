import parseArgs from "minimist";
import colors from "colors";
import fs from "fs";

const command = parseArgs(process.argv.slice(2, 3));
delete command._;

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

const handleData = (type, title) => {
  fs.readFile("data.json", (err, file) => {
    let tasks = JSON.parse(file);

    if (type === 1 || type === 2) {
      const isExisted = tasks.find((task) => task.title === title)
        ? true
        : false;
      if (type === 1 && isExisted)
        return console.log("Takie zadanie już istnieje".red);
      if (type === 2 && !isExisted)
        return console.log("Takie zadanie nie istnieje".red);
    }

    switch (type) {
      case 1:
        const id = tasks.length + 1;
        const textAdd = `Dodano zadanie: ${title}`.white.bgBlue;

        tasks = reidList(tasks);

        tasks.push({ id, title });

        handleWriteFile(tasks, textAdd);
        break;

      case 2:
        const index = tasks.findIndex((task) => task.title === title);
        const textRemove = `Usunięto zadanie: ${title}`.white.bgRed;
        tasks.splice(index, 1);

        tasks = reidList(tasks);

        handleWriteFile(tasks, textRemove);
        break;

      case 3:
        console.log(
          `Lista zadań do zrobienia obejmuje: ${tasks.length} ${
            tasks.length === 0
              ? "pozycji"
              : tasks.length === 1
              ? "pozycja"
              : "pozycje"
          }. ${tasks.length > 0 ? "Do zrobienia zostało: " : ""}`
        );
        if (tasks.length) {
          tasks.forEach((task, index) => {
            if (index % 2) return console.log(task.title.blue);
            return console.log(task.title.yellow);
          });
        }
        break;

      default:
        break;
    }
  });
};

const handleWriteFile = (tasks, text) => {
  const dataJSON = JSON.stringify(tasks);
  fs.writeFile("data.json", dataJSON, (err) => {
    if (err) throw err;
    console.log(text);
  });
};

const reidList = (tasks) => {
  const properIdList = tasks.map((task, index) => ({
    id: index + 1,
    title: task.title,
  }));
  return properIdList;
};

handleCommand(command);
