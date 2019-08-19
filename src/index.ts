import path from "path";
import { execSync } from "child_process";
import chalk from "chalk";
import { sync as which } from "which";
import { cwd } from "process";
import { parse } from "./options";
const linkText = chalk.white.bold.underline;
const boldText = chalk.white.bold;

const checkLatestVersion = (packageName: string) => {
  const latest = execSync(`npm show ${packageName} version`, {
    encoding: "utf8"
  });
  return latest.trim();
};

const listVersions = (packageName: string) => {
  const latest = execSync(`npm show ${packageName} versions`, {
    encoding: "utf8"
  });
  return latest.trim();
};

const main = (argv: string[]) => {
  const options = parse(argv);
  console.log(options.args);
  return;
  const packageName = "foo";
  if (packageName !== "foo") {
    console.log(checkLatestVersion(packageName));
    process.exit(0);
  }
  try {
    which("peco");
  } catch (error) {
    console.log(
      `${boldText("peco not found.")} \nThis tool requires ${boldText(
        "peco"
      )}, which can be found at ${linkText("https://github.com/peco/peco")}`
    );
    process.exit(1);
  }

  try {
    const pkg = require(path.join(cwd(), "package.json"));
    if (!pkg) {
    }
    let packages: string[] = [];
    if (pkg.dependencies) {
      packages = packages.concat(Object.keys(pkg.dependencies));
    }
    if (pkg.devDependencies) {
      packages = packages.concat(Object.keys(pkg.devDependencies));
    }
    if (pkg.peerDependencies) {
      packages = packages.concat(Object.keys(pkg.peerDependencies));
    }
    const targetPackage = execSync(`echo \"${packages.join("\n")}\" | peco`);
    const targetPackageString = targetPackage.toString().trim();
    console.log(checkLatestVersion(targetPackageString));
  } catch (error) {
    if (error.message.includes("Cannot find module")) {
      console.error(
        `${boldText("package.json not found.")} \nMake sure ${boldText(
          "package.json"
        )} is included in your current working directory.`
      );
      process.exit(1);
    }
    console.error(error.message);
    process.exit(1);
  }

  process.exit(0);
};

module.exports = main;
