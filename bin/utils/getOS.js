import os from "os";

export const getOSName = () => {
  const type = os.type();
  switch (type) {
    case "Darwin":
      return "MacOS";
    case "Linux":
      return "Linux";
    case "Windows_NT":
      return "Windows";

    default:
      console.log("other operating system");
  }
};
