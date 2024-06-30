import { Listr } from "listr2";
import "dotenv/config";
import { tracker } from "./index.js";
import shell from "shelljs";

async function gitCloneProcess(projectName, currentDir) {
  const url = "https://github.com/ocmodi21/Job-Post-Webapp.git";
  if (!shell.which("git")) {
    await axiomProcess([{ Git: "Git not found" }, { OS: osName }]);
    shell.echo("Sorry, git is required for this step.");
    shell.exit(1);
  }

  shell.cd(currentDir);
  const cloneCommand = `git clone ${url} ${projectName}`;
  return shell.exec(cloneCommand, { silent: true });
}

async function npmInstallProcess(projectName) {
  if (!shell.which("npm")) {
    await tracker.trackEvent([{ npm: "npm not found" }, { OS: osName }]);
    shell.echo("Sorry, this script requires npm");
    shell.exit(1);
  }

  shell.cd(projectName);
  const npmInstallCommand = `npm i`;
  return shell.exec(npmInstallCommand, { silent: true });
}

export async function listrProcess(url, projectName, currentDir) {
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
