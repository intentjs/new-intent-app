import shell from "shelljs";

const awsDependencies = [
  "@aws-sdk/client-s3",
  "@aws-sdk/client-sqs",
  "@aws-sdk/credential-providers",
  "@aws-sdk/s3-request-presigner",
];

const redisDependencies = ["ioredis"];

export const copyEnvironmentFile = (projectName) => () => {
  try {
    shell.exec("cp .env.example .env");
  } catch (error) {
    shell.echo("Error: Failed trying to reset git history");
    shell.exit(1);
  }
};

export const installDependencies =
  ({ projectName, useAws, useRedis }) =>
  () => {
    console.log("config  ====>", useAws, useRedis);
    try {
      if (!shell.which("npm")) {
        shell.echo("Sorry, this script requires npm");
        shell.exit(1);
      }

      shell.cd(projectName);
      const npmInstallCommand = `npm i`;
      shell.exec(npmInstallCommand, { silent: true });

      if (useAws) {
        shell.exec(`npm i ${awsDependencies.join(" ")} --save`);
      }

      if (useRedis) {
        shell.exec(`npm i ${redisDependencies.join(" ")} --save`);
      }
    } catch (error) {
      shell.echo("Error: npm install failed");
      shell.exit(1);
    }
  };

export const resetGitHistory = (projectName) => () => {
  try {
    shell.exec("rm -rf .git");
    shell.exec("git init");
  } catch (error) {
    shell.echo("Error: Failed trying to reset git history");
    shell.exit(1);
  }
};
