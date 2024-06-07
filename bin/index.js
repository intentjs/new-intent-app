#!/usr/bin/env node
// Function to log your details in the terminal
import inquirer from "inquirer";
import shell from "shelljs";
import { Listr } from "listr2";

const questions1 = [
  {
    type: "input",
    name: "projectName",
    message: "What do you want to call this project?",
    default: "my-app",
  },
  {
    type: "list",
    name: "setup",
    message: "With which configuration you want to continue?",
    choices: ["Default", "Custome"],
    default: "Default",
  },
];

const questions2 = [
  {
    type: "list",
    name: "database",
    message: "Do you plan to use DataBase service like SQL or NO-SQL",
    choices: ["Mysql", "Postgres", "MongoDb", "None"],
    default: "None",
  },
];

function main() {
  initialQuestions();
}

function initialQuestions() {
  inquirer.prompt(questions1).then((answers) => {
    const url = "https://github.com/ocmodi21/Job-Post-Webapp.git";
    const projectName = answers["projectName"];
    const currentDir = shell.pwd().stdout;

    if (answers.setup === "Custome") {
      setupQuestions(url, projectName, currentDir);
    } else {
      if (!shell.which("git")) {
        shell.echo("Sorry, this script requires git");
        shell.exit(1);
      }

      listrProcess(url, projectName, currentDir);
    }
  });
}

function setupQuestions(url, projectName, currentDir) {
  inquirer.prompt(questions2).then(() => {
    if (!shell.which("git")) {
      shell.echo("Sorry, this script requires git");
      shell.exit(1);
    }

    listrProcess(url, projectName, currentDir);
  });
}

function listrProcess(url, projectName, currentDir) {
  const listr = new Listr([
    {
      title: "Cloning repository",
      task: () => {
        shell.cd(currentDir);
        const cloneCommand = `git clone ${url} ${projectName}`;
        return shell.exec(cloneCommand, { silent: true });
      },
      skip: (ctx) => ctx.error,
    },
    {
      title: "Installing dependencies",
      task: () => {
        shell.cd(projectName);
        const npmInstallCommand = `npm i`;
        return shell.exec(npmInstallCommand, { silent: true });
      },
      skip: (ctx) => ctx.error,
    },
  ]);

  listr
    .run()
    .then((ctx) => {
      if (ctx.error) {
        shell.echo("Error: Git clone or npm install failed");
        shell.exit(1);
      } else {
        shell.echo(`Repository cloned and npm installed`);
      }
    })
    .catch((err) => {
      shell.echo("Error: Git clone or npm install failed");
      shell.exit(1);
    });
}

main();
