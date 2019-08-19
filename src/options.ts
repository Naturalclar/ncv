import program from "commander";

program
  .description("display version info of given npm package")
  .arguments("<package>")
  .option("-a, --all", "output all versions");

export const parse = (args: string[]) => program.parse(args);
