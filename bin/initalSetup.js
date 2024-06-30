import { CONFIGURATION_QUESTIONS, SETUP_QUESTIONS } from "./constants.js";
import { listrProcess } from "./startProcess.js";
import { getOSName } from "./utils/getOS.js";
import inquirer from "inquirer";
import shell from "shelljs";

const initialSetupQuestions = () =>
  new Promise((resolve, reject) => {
    const systemOS = getOSName();
    console.log(systemOS);
    inquirer.prompt(SETUP_QUESTIONS).then(async (answers) => {
      console.log("entered");
      const projectName = answers["projectName"];
      const currentDir = shell.pwd().stdout;

      if (shell.test("-d", currentDir + "/" + projectName)) {
        console.log(systemOS);
        shell.echo(projectName + " exists in the current directory");
        reject("Directory already exists");
      }

      if (answers.setup === "Custom") {
        setupQuestions(projectName, currentDir);
      } else if (
        answers.setup === "Default-AWS" ||
        answers.setup === "Default-AZURE"
      ) {
        resolve({
          projectName,
          currentDir,
        });
      }
    });
  });

function setupQuestions(projectName, currentDir) {
  inquirer.prompt(CONFIGURATION_QUESTIONS).then(async () => {
    listrProcess(projectName, currentDir);
  });
}

export default initialSetupQuestions;
