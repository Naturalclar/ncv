import path from "path";
import { execSync } from "child_process";
import chalk from "chalk";
import { sync as which } from "which";
import { cwd } from "process";
import { parse, Options } from "./options";
const linkText = chalk.white.bold.underline;
const boldText = chalk.white.bold;

const checkLatestVersion = (packageName: string) => {
  console.log(packageName);
  const latest = execSync(`npm show ${packageName} version`, {
    encoding: "utf8",
  });
  return latest.trim();
};

const listVersions = (packageName: string) => {
  console.log(packageName);
  const latest = execSync(`npm show ${packageName} versions`, {
    encoding: "utf8",
  });
  return latest.trim();
};

const chooseFromPackage = (options: Options) => {
  // check if peco exists. Throw error if peco does not exist
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

  // Display packages in package.json
  try {
    const pkg = require(path.join(cwd(), "package.json"));
    // if package.json does not exist, throw error
    if (!pkg) {
      console.error(`${boldText("package.json not found.")}`);
      process.exit(1);
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
    if (options.all) {
      // Display all versions of selected package
      console.log(listVersions(targetPackageString));
    } else {
      // Display the latest vesrion of selected package
      console.log(checkLatestVersion(targetPackageString));
    }
  } catch (error) {
    if (!(error instanceof Error)) {
      process.exit(1);
    }
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
};

const main = (argv: string[]) => {
  const options = parse(argv);

  if (options.args.length === 0) {
    chooseFromPackage(options);
    process.exit(0);
  }

  const packageName = options.args[0];
  if (options.all) {
    console.log(listVersions(packageName));
    process.exit(0);
  }

  if (packageName !== "") {
    console.log(checkLatestVersion(packageName));
    process.exit(0);
  }
};

module.exports = main;
