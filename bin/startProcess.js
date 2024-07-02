import { Listr } from "listr2";
import "dotenv/config";
import shell from "shelljs";
import { gitCloneProcess } from "./actions/cloneRepo.js";
import { npmInstallProcess } from "./actions/installDependencies.js";

export async function startProcess(projectName, currentDir) {
  const listr = new Listr([
    {
      title: "Cloning repository",
      task: () => {
        try {
          gitCloneProcess(projectName, currentDir);
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
          npmInstallProcess(projectName);
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
        shell.echo("Error: Git clone or npm i nstall failed");
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
