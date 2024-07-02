import shell from "shelljs";
import { tracker } from "../index.js";

export async function gitCloneProcess(projectName, currentDir) {
  const url = "https://github.com/ocmodi21/Job-Post-Webapp.git";
  if (!shell.which("git")) {
    await tracker.trackEvent([{ npm: "npm not found" }, { OS: osName }]);
    shell.echo("Sorry, git is required for this step.");
    shell.exit(1);
  }

  shell.cd(currentDir);
  const cloneCommand = `git clone ${url} ${projectName}`;
  return shell.exec(cloneCommand, { silent: true });
}
