import chalk from "chalk";
import ora from "ora";
import { sleep, randomDelay } from "../utils/delays.js";
import kernelModules from "../data/kernelModules.js";

async function loadKernelModules() {
  console.log(chalk.bold.yellow("Loading kernel modules..."));

  for (let i = 0; i < kernelModules.length; i++) {
    const module = kernelModules[i];
    const loading = ora(chalk.yellow(`Loading ${module}...`)).start();
    await randomDelay(300, 700);

    if (i === 1) {
      loading.fail(chalk.red(`[FAILED] ${module}`));
      console.log(chalk.red(`   [ERROR] Symbol not found: init_${module}`));
      await sleep(600);

      const resolving = ora(
        chalk.yellow("Resolving symbol dependencies...")
      ).start();
      await randomDelay(800, 1200);
      resolving.succeed(chalk.green("[OK] Symbol dependencies resolved"));

      const retrying = ora(chalk.yellow(`Retrying ${module}...`)).start();
      await randomDelay(500, 800);
      retrying.succeed(chalk.green(`[OK] Loaded ${module}`));
    } else if (i === 3) {
      loading.fail(chalk.red(`[FAILED] ${module}`));
      console.log(
        chalk.red(`   [ERROR] Module version mismatch: expected 5.x, got 4.x`)
      );
      await sleep(600);

      const upgrading = ora(
        chalk.yellow("Upgrading module version...")
      ).start();
      await randomDelay(1000, 1500);
      upgrading.succeed(chalk.green("[OK] Module upgraded to 5.2"));

      const retrying = ora(chalk.yellow(`Loading ${module}...`)).start();
      await randomDelay(500, 800);
      retrying.succeed(chalk.green(`[OK] Loaded ${module}`));
    } else if (i === 4) {
      loading.warn(chalk.yellow(`[WARN] ${module} is deprecated`));
      await sleep(500);

      const checking = ora(
        chalk.yellow("Checking for alternative modules...")
      ).start();
      await randomDelay(700, 1000);
      checking.succeed(chalk.green("[OK] Using compatibility layer"));

      const finalLoad = ora(chalk.yellow(`Loading ${module}...`)).start();
      await randomDelay(400, 700);
      finalLoad.succeed(chalk.green(`[OK] Loaded ${module}`));
    } else {
      loading.succeed(chalk.green(`[OK] Loaded ${module}`));
    }
  }
  console.log("");
}

export { loadKernelModules };
