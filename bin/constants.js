export const SETUP_QUESTIONS = [
  {
    type: "input",
    name: "projectName",
    message: "What's your *Intent* to name this project?",
    default: "my-app",
  },
  {
    type: "list",
    name: "setup",
    message: "With which configuration you want to continue?",
    choices: ["Default-AWS", "Default-AZURE", "Custom"],
    default: "Default",
  },
];

export const CONFIGURATION_QUESTIONS = [
  {
    type: "list",
    name: "cloud",
    message: "Do you plan to use Cloud service?",
    choices: ["AWS", "AZURE", "None"],
    default: "None",
  },
  {
    type: "list",
    name: "database",
    message: "Do you plan to use DataBase service?",
    choices: ["Mysql", "Postgres", "MongoDb", "None"],
    default: "None",
  },
  {
    type: "list",
    name: "cache",
    message: "Do you plan to use Cache service?",
    choices: ["Redis", "None"],
    default: "None",
  },
  {
    type: "list",
    name: "queue",
    message: "Do you plan to use DataBase service?",
    choices: ["SQS", "RabbitMQ", "Kafka", "None"],
    default: "None",
  },
  {
    type: "list",
    name: "storage",
    message: "Do you plan to use DataBase service?",
    choices: ["S3", "None"],
    default: "None",
  },
];
