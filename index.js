const helpers = require("./helpers");
const cli = process.argv;

function main(cli) {
  switch (cli[2]) {
    case "add":
      helpers.addTodo(cli);
      break;
    case "edit":
      helpers.editTodo(cli);
      break;
    case "delete":
      helpers.removeTodo(cli);
      break;
    case "checked":
      helpers.checkTodo(cli);
      break;
    case "unchecked":
      helpers.uncheckTodo(cli);
      break;
    case "list":
      helpers.listTodo(cli);
      break;
    case "completed":
      helpers.listCompletedTodo(cli);
      break;
    case "uncompleted":
      helpers.listUnCompletedTodo(cli);
      break;
    default:
      console.log("please enter a todo command");
      break;
  }
}
main(cli)