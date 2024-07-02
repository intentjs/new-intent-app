import shell from "shelljs";
import { tracker } from "../index.js";

export async function npmInstallProcess(projectName) {
  if (!shell.which("npm")) {
    await tracker.trackEvent([{ npm: "npm not found" }, { OS: osName }]);
    shell.echo("Sorry, this script requires npm");
    shell.exit(1);
  }

  shell.cd(projectName);
  const npmInstallCommand = `npm i`;
  return shell.exec(npmInstallCommand, { silent: true });
}
