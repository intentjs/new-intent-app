import shell from "shelljs";

export const installDependenciesNpm = ({ projectName, useAws, useRedis }) => {
  console.log(useAws, useRedis);
  if (!shell.which("npm")) {
    shell.echo("Sorry, this script requires npm");
    shell.exit(1);
  }

  shell.cd(projectName);
  const npmInstallCommand = `npm i`;
  return shell.exec(npmInstallCommand, { silent: true });
};
