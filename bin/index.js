import initialSetupQuestions from "./initalSetup.js";
import { startProcess } from "./startProcess.js";
import Tracker from "./tracker.js";
import { getOSName } from "./utils/getOS.js";

const tracker = new Tracker();

async function main() {
  try {
    const { projectName, currentDir } = await initialSetupQuestions();
    await startProcess(projectName, currentDir);
    await tracker.trackEvent([{ success: true }, { OS: osName }]);
  } catch (err) {
    const os = getOSName();
    await tracker.trackEvent([{ error: err }, { OS: os }]);
    process.exit();
  }
}

main();
export { tracker };
