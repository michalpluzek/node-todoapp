import colors from "colors";
import fs from "fs";

const handleWriteFile = (tasks, text) => {
  const dataJSON = JSON.stringify(tasks);
  fs.writeFile("data.json", dataJSON, (err) => {
    if (err) throw err;
    console.log(text);
  });
};

const handleReIdList = (tasks) => {
  const properIdList = tasks.map((task, index) => ({
    id: index + 1,
    title: task.title,
  }));
  return properIdList;
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

        tasks = handleReIdList(tasks);

        tasks.push({ id, title });

        handleWriteFile(tasks, textAdd);
        break;

      case 2:
        const index = tasks.findIndex((task) => task.title === title);
        const textRemove = `Usunięto zadanie: ${title}`.white.bgRed;
        tasks.splice(index, 1);

        tasks = handleReIdList(tasks);

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

export default handleData;
