import initialSetupQuestions from "./initalSetup.js";
import { listrProcess } from "./startProcess.js";
import Tracker from "./tracker.js";
import { getOSName } from "./utils/getOS.js";

const tracker = new Tracker();

async function main() {
  try {
    setTimeout(() => {}, 6000);
    console.log("start1");
    const { projectName, currentDir } = await initialSetupQuestions();
    console.log("start2");
    listrProcess(projectName, currentDir);
    console.log("start3");
  } catch (err) {
    const os = getOSName();
    tracker.trackEvent({ os, error: err });
    process.exit();
  }
}

main();
export { tracker };
