#!/usr/bin/env node
// Function to log your details in the terminal
import inquirer from "inquirer";
import simpleGit from "simple-git";

const git = simpleGit();

const questions = [
  {
    type: "input",
    name: "Project name",
    message: "What do you want to call this project?",
    default: "my-app",
  },
  {
    type: "list",
    name: "Cloud",
    message: "Do you plan to use cloud services like AWS or Azure?",
    choices: ["AWS", "AZURE", "BOTH", "NONE"],
    default: "NONE",
  },
];

inquirer.prompt(questions).then((answers) => {
  const url = `https://github.com/ocmodi21/FilmFusion-backend.git`;
  const projectName = answers.projectName;

  git
    .clone(url, projectName)
    .then(() => {
      console.log(`Repository cloned into ${projectName} directory.`);
    })
    .catch((err) => {
      console.error("Failed to clone the repository:", err);
    });
});
