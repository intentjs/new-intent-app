#!/usr/bin/env node
// Function to log your details in the terminal
import inquirer from "inquirer";
import shell from "shelljs";
import { Listr } from "listr2";
import { Axiom } from "@axiomhq/js";
import "dotenv/config";
import os from "os";

const Initial_Questions = [
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

const Setup_Questions = [
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

var type = os.type();
var osName;

switch (type) {
  case "Darwin":
    osName = "MacOS";
    break;
  case "Linux":
    osName = "Linux";
    break;
  case "Windows_NT":
    osName = "Windows";
    break;
  default:
    console.log("other operating system");
}

const axiom = new Axiom({
  token: process.env.AXIOM_TOKEN,
  orgId: process.env.AXIOM_ORGID,
});

async function axiomProcess(data) {
  await axiom.ingest(process.env.AXIOM_DATASET, data);
  await axiom.flush();
}

async function gitCloneProcess(url, projectName, currentDir) {
  if (!shell.which("git")) {
    await axiomProcess([{ Git: "Git not found" }, { OS: osName }]);
    shell.echo("Sorry, this script requires git");
    shell.exit(1);
  }

  shell.cd(currentDir);
  const cloneCommand = `git clone ${url} ${projectName}`;
  return shell.exec(cloneCommand, { silent: true });
}

async function npmInstallProcess(projectName) {
  if (!shell.which("npm")) {
    await axiomProcess([{ npm: "npm not found" }, { OS: osName }]);
    shell.echo("Sorry, this script requires npm");
    shell.exit(1);
  }

  shell.cd(projectName);
  const npmInstallCommand = `npm i`;
  return shell.exec(npmInstallCommand, { silent: true });
}

function main() {
  initialQuestions();
}

function initialQuestions() {
  inquirer.prompt(Initial_Questions).then(async (answers) => {
    const url = "https://github.com/ocmodi21/Job-Post-Webapp.git";
    const projectName = answers["projectName"];
    const currentDir = shell.pwd().stdout;

    if (shell.test("-d", currentDir + "/" + projectName)) {
      console.log(osName);
      await axiomProcess([{ Dir: "Directory already exists" }, { OS: osName }]);
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
  inquirer.prompt(Setup_Questions).then(async () => {
    listrProcess(url, projectName, currentDir);
  });
}

async function listrProcess(url, projectName, currentDir) {
  const listr = new Listr([
    {
      title: "Cloning repository",
      task: () => {
        try {
          gitCloneProcess(url, projectName, currentDir);
        } catch (error) {
          shell.echo("Error: Git clone failed");
          shell.exit(1);
        }
      },
    },
    {
      title: "Installing dependencies",
      task: () => {
        try {
          npmInstallProcess(url, projectName, currentDir);
        } catch (error) {
          shell.echo("Error: npm install failed");
          shell.exit(1);
        }
      },
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
