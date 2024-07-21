import initialSetupQuestions from "./initalSetup.js";
import { startProcess } from "./startProcess.js";

async function main() {
  try {
    const { projectName, currentDir, useAws, useRedis } =
      await initialSetupQuestions();
    console.log(projectName, currentDir, useAws, useRedis);
    await startProcess({ projectName, currentDir, useAws, useRedis });
  } catch (err) {
    console.log(err);
    console.log(err["message"]);
    process.exit();
  }
}

main();
