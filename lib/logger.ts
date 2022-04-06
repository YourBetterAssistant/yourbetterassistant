import chalk from "chalk";
export default class Logger {
  private defaultFormat: string;
  private errorFormat: string;
  private infoFormat: string;
  private warnFormat: string;
  constructor(private command: string) {
    this.defaultFormat = `${chalk.blue(`[%commandname]`)} - ${chalk.green(
      "%message"
    )}`;
    this.command = command;
    this.log(`Logger initialized for ${command}`);
    this.errorFormat = `${chalk.blue(`[%commandname]`)} ${chalk.bold(
      `${chalk.red("- ERROR -")} ${chalk.redBright("%message")}`
    )}`;
    this.infoFormat = `${chalk.blue(`[%commandname] - INFO`)} - ${chalk.green(
      "%message"
    )}`;
    this.warnFormat = `${chalk.blue(`[%commandname] - WARN`)} - ${chalk.yellow(
      "%message"
    )}`;
  }
  public log(message: string, bold?: boolean, format?: string): void {
    if (!format) format = this.defaultFormat;
    if (bold) message = chalk.bold(message);
    format = format.replace("%commandname", this.command);
    format = format.replace("%message", message);
    console.log(format);
  }
  public error(message: string): void {
    let format = this.errorFormat;
    format = format
      .replace("%commandname", this.command)
      .replace("%message", message);
    console.error(format);
  }
  public warn(message: string): void {
    let format = this.warnFormat;
    format = format
      .replace("%commandname", this.command)
      .replace("%message", message);
    console.warn(format);
  }
  public info(message: string): void {
    let format = this.infoFormat;
    format = format
      .replace("%commandname", this.command)
      .replace("%message", message);
    console.info(format);
  }
}
