#!/usr/bin/env node

import initialSetupQuestions from "./bin/initalSetup.js";
import { startProcess } from "./bin/startProcess.js";

async function main() {
  try {
    const { projectName, currentDir, useAws, useRedis } =
      await initialSetupQuestions();
    await startProcess({ projectName, currentDir, useAws, useRedis });
  } catch (err) {
    console.log(err);
    console.log(err["message"]);
    process.exit();
  }
}

main();
