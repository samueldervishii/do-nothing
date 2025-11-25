import chalk from "chalk";
import ora from "ora";
import { sleep, randomDelay } from "../utils/delays.js";
import filesystems from "../data/filesystems.js";
import services from "../data/services.js";

async function mountFilesystems() {
  console.log(chalk.bold.yellow("Mounting filesystems..."));
  for (const fs of filesystems) {
    const mounting = ora(
      chalk.yellow(`Mounting ${fs.device} to ${fs.mount}...`)
    ).start();
    await randomDelay(400, 800);
    mounting.succeed(
      chalk.green(`[OK] Mounted ${fs.device} (${fs.type}) at ${fs.mount}`)
    );
  }
  console.log("");
}

async function startServices() {
  console.log(chalk.bold.yellow("Starting system services..."));

  for (let i = 0; i < services.length; i++) {
    const service = services[i];
    const starting = ora(chalk.yellow(`Starting ${service}...`)).start();
    await randomDelay(300, 600);

    if (i === 2) {
      starting.fail(chalk.red(`[FAILED] ${service}`));
      console.log(chalk.red(`   [ERROR] Port 8080 already in use`));
      await sleep(500);

      const finding = ora(chalk.yellow("Finding available port...")).start();
      await randomDelay(600, 900);
      finding.succeed(chalk.green("[OK] Found available port: 8081"));

      const restarting = ora(
        chalk.yellow(`Starting ${service} on port 8081...`)
      ).start();
      await randomDelay(400, 700);
      restarting.succeed(chalk.green(`[OK] Started ${service}`));
    } else if (i === 5) {
      starting.fail(chalk.red(`[FAILED] ${service}`));
      console.log(chalk.red(`   [ERROR] Missing configuration file`));
      await sleep(500);

      const creating = ora(
        chalk.yellow("Creating default configuration...")
      ).start();
      await randomDelay(800, 1200);
      creating.succeed(chalk.green("[OK] Configuration file created"));

      const restarting = ora(chalk.yellow(`Starting ${service}...`)).start();
      await randomDelay(400, 700);
      restarting.succeed(chalk.green(`[OK] Started ${service}`));
    } else if (i === 8) {
      starting.fail(chalk.red(`[FAILED] ${service}`));
      console.log(chalk.red(`   [ERROR] Database connection refused`));
      await sleep(500);

      const initializing = ora(
        chalk.yellow("Initializing local database instance...")
      ).start();
      await randomDelay(1000, 1500);
      initializing.succeed(chalk.green("[OK] Local database initialized"));

      const connecting = ora(
        chalk.yellow("Establishing database connection...")
      ).start();
      await randomDelay(600, 900);
      connecting.succeed(chalk.green("[OK] Database connected"));

      const restarting = ora(chalk.yellow(`Starting ${service}...`)).start();
      await randomDelay(400, 700);
      restarting.succeed(chalk.green(`[OK] Started ${service}`));
    } else if (i === 11) {
      starting.warn(
        chalk.yellow(`[WARN] ${service} requires elevated privileges`)
      );
      await sleep(500);

      const elevating = ora(
        chalk.yellow("Requesting elevated privileges...")
      ).start();
      await randomDelay(700, 1000);
      elevating.succeed(chalk.green("[OK] Privileges granted"));

      const restarting = ora(chalk.yellow(`Starting ${service}...`)).start();
      await randomDelay(400, 700);
      restarting.succeed(chalk.green(`[OK] Started ${service}`));
    } else {
      starting.succeed(chalk.green(`[OK] Started ${service}`));
    }
  }
  console.log("");
}

export { mountFilesystems, startServices };
