import program from "commander";

program
  .description("display version info of given npm package")
  .arguments("<package>")
  .option("-a, --all", "output all versions");

export type Options = {
  all?: boolean;
  args: string[];
};

export const parse = (args: string[]): Options =>
  program.parse(args) as Options;
