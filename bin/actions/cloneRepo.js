import shell from "shelljs";

export async function gitCloneProcess(projectName, currentDir) {
  const url = "https://github.com/intentjs/new-app-starter";
  if (!shell.which("git")) {
    shell.echo("Sorry, git is required for this step.");
    shell.exit(1);
  }

  shell.cd(currentDir);
  const cloneCommand = `git clone ${url} ${projectName}`;
  return shell.exec(cloneCommand, { silent: true });
}

export const cloneTemplate =
  ({ projectName, currentDir }) =>
  () => {
    try {
      gitCloneProcess(projectName, currentDir);
    } catch (error) {
      shell.echo("Error: Git clone failed");
      shell.exit(1);
    }
  };
