import { Listr } from "listr2";
import "dotenv/config";
import { cloneTemplate } from "./actions/cloneRepo.js";
import {
  copyEnvironmentFile,
  resetGitHistory,
  installDependencies,
} from "./actions/index.js";

console.log(installDependencies);

export async function startProcess({
  projectName,
  currentDir,
  useAws,
  useRedis,
}) {
  const listr = new Listr(
    [
      {
        title: "Cloning repository",
        task: cloneTemplate({ projectName, currentDir }),
      },
      {
        title: "Installing dependencies",
        task: installDependencies({
          projectName,
          currentDir,
          useAws,
          useRedis,
        }),
      },
      { title: "Setting up .env", task: copyEnvironmentFile(projectName) },
      { title: "Reset git history", task: resetGitHistory(currentDir) },
    ],
    { concurrent: false }
  );

  await listr.run();
  // .then((ctx) => {
  //   if (ctx.error) {
  //     shell.echo("Error: Git clone or npm i nstall failed");
  //     shell.exit(1);
  //   } else {
  //     shell.echo(`Repository cloned and npm installed`);
  //   }
  // })
  // .catch((err) => {
  //   shell.echo("Error: Git clone or npm install failed");
  //   shell.exit(1);
  // });
}
