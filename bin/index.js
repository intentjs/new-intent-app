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
    choices: ["Default-AWS", "Default-AZURE", "Custom"],
    default: "Default",
  },
];

const questions2 = [
  {
    type: "list",
    name: "cloud",
    message: "Do you plan to use Cloud service?",
    choices: ["AWS", "AZURE", "None"],
    default: "None",
  },
  {
    type: "list",
    name: "database",
    message: "Do you plan to use DataBase service?",
    choices: ["Mysql", "Postgres", "MongoDb", "None"],
    default: "None",
  },
  {
    type: "list",
    name: "cache",
    message: "Do you plan to use Cache service?",
    choices: ["Redis", "None"],
    default: "None",
  },
  {
    type: "list",
    name: "queue",
    message: "Do you plan to use DataBase service?",
    choices: ["SQS", "RabbitMQ", "Kafka", "None"],
    default: "None",
  },
  {
    type: "list",
    name: "storage",
    message: "Do you plan to use DataBase service?",
    choices: ["S3", "None"],
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

    if (sh.test("-d", currentDir + "/" + projectName)) {
      shell.echo(projectName + " exists in the current directory");
      shell.exit(1);
    }

    if (answers.setup === "Custom") {
      setupQuestions(url, projectName, currentDir);
    } else if (
      answers.setup === "Default-AWS" ||
      answers.setup === "Default-AZURE"
    ) {
      listrProcess(url, projectName, currentDir);
    }
  });
}

function setupQuestions(url, projectName, currentDir) {
  inquirer.prompt(questions2).then(() => {
    listrProcess(url, projectName, currentDir);
  });
}

function listrProcess(url, projectName, currentDir) {
  const listr = new Listr([
    {
      title: "Cloning repository",
      task: () => {
        if (!shell.which("git")) {
          shell.echo("Sorry, this script requires git");
          shell.exit(1);
        }

        shell.cd(currentDir);
        const cloneCommand = `git clone ${url} ${projectName}`;
        return shell.exec(cloneCommand, { silent: true });
      },
      skip: (ctx) => ctx.error,
    },
    {
      title: "Installing dependencies",
      task: () => {
        if (!shell.which("npm")) {
          shell.echo("Sorry, this script requires npm");
          shell.exit(1);
        }

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
