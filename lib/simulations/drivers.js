import chalk from "chalk";
import ora from "ora";
import { sleep, randomDelay } from "../utils/delays.js";
import drivers from "../data/drivers.js";

async function installDrivers() {
  console.log(chalk.bold.yellow("Installing drivers..."));
  for (let i = 0; i < drivers.length; i++) {
    const driver = drivers[i];
    const installing = ora(
      chalk.yellow(`Installing ${driver.name} v${driver.version}...`)
    ).start();
    await randomDelay(400, 900);

    if (i === 0) {
      installing.warn(chalk.yellow(`[WARN] Unsigned driver detected`));
      await sleep(600);
      const verifying = ora(
        chalk.yellow("Verifying driver signature...")
      ).start();
      await randomDelay(800, 1200);
      verifying.succeed(chalk.green("[OK] Signature verified (trust mode)"));
      const finalInstall = ora(
        chalk.yellow(`Installing ${driver.name} v${driver.version}...`)
      ).start();
      await randomDelay(500, 800);
      finalInstall.succeed(
        chalk.green(`[OK] Installed ${driver.name} v${driver.version}`)
      );
    } else if (i === 2) {
      installing.warn(
        chalk.yellow("[WARN] Driver may not be compatible with this system")
      );
      await sleep(600);
      const forcing = ora(
        chalk.yellow("Forcing compatibility mode...")
      ).start();
      await randomDelay(700, 1000);
      forcing.succeed(chalk.green("[OK] Compatibility mode enabled"));
      const finalInstall = ora(
        chalk.yellow(`Installing ${driver.name} v${driver.version}...`)
      ).start();
      await randomDelay(500, 800);
      finalInstall.succeed(
        chalk.green(`[OK] Installed ${driver.name} v${driver.version}`)
      );
    } else {
      installing.succeed(
        chalk.green(`[OK] Installed ${driver.name} v${driver.version}`)
      );
    }
  }
  console.log("");
}

export { installDrivers };
