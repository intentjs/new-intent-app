import { CONFIGURATION_QUESTIONS, SETUP_QUESTIONS } from "./constants.js";
import { getOSName } from "./utils/getOS.js";
import inquirer from "inquirer";
import shell from "shelljs";

const initialSetupQuestions = () =>
  new Promise((resolve, reject) => {
    const systemOS = getOSName();
    inquirer.prompt(SETUP_QUESTIONS).then(async (answers) => {
      const projectName = answers["projectName"];
      const useAws = answers["useAws"];
      const useRedis = answers["useRedis"];
      const currentDir = shell.pwd().stdout;

      if (shell.test("-d", currentDir + "/" + projectName)) {
        shell.echo(projectName + " exists in the current directory");
        reject("Directory already exists");
      }

      resolve({
        projectName,
        currentDir,
        useAws,
        useRedis,
      });

      // if (answers.setup === "Custom") {
      //   setupQuestions(projectName, currentDir);
      // } else if (
      //   answers.setup === "Default-AWS" ||
      //   answers.setup === "Default-AZURE"
      // ) {
      //   resolve({
      //     projectName,
      //     currentDir,
      //   });
      // }
    });
  });

// function setupQuestions(projectName, currentDir) {
//   inquirer.prompt(CONFIGURATION_QUESTIONS).then(async () => {
//     listrProcess(projectName, currentDir);
//   });
// }

export default initialSetupQuestions;
