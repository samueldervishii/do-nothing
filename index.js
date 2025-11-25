#!/usr/bin/env node

import chalk from "chalk";
import ora from "ora";
import { randomDelay } from "./lib/utils/delays.js";
import { getRealSystemInfo } from "./lib/utils/systemInfo.js";
import {
  runBIOSSimulation,
  runBIOSUpdateSimulation,
} from "./lib/simulations/bios.js";
import { loadKernelModules } from "./lib/simulations/kernel.js";
import { installDrivers } from "./lib/simulations/drivers.js";
import { scanWifiNetworks } from "./lib/simulations/network.js";
import {
  mountFilesystems,
  startServices,
} from "./lib/simulations/filesystem.js";
import {
  connectToRegistry,
  showSpaceFact,
  resolveDependencies,
  downloadPackages,
  verifyChecksums,
  installPackages,
  buildNativeModules,
  runPostInstallScripts,
  optimizeBundle,
} from "./lib/simulations/packages.js";
import packages from "./lib/data/packages.js";

async function main() {
  console.log(chalk.bold.cyan("\n" + "=".repeat(65)));
  console.log(chalk.bold.cyan("     DO-NOTHING PACKAGE INSTALLER"));
  console.log(chalk.bold.cyan("=".repeat(65) + "\n"));

  const systemCheck = ora(
    chalk.yellow("Checking system requirements...")
  ).start();
  await randomDelay(1000, 2000);
  systemCheck.succeed(chalk.green("[OK] System requirements met"));

  const sysInfo = getRealSystemInfo();
  console.log("");
  console.log(chalk.bold.blue("System Information:"));
  console.log(chalk.gray("   Hostname: ") + chalk.white(sysInfo.hostname));
  console.log(chalk.gray("   OS: ") + chalk.white(sysInfo.os));
  console.log(chalk.gray("   Kernel: ") + chalk.white(sysInfo.kernel));
  console.log(chalk.gray("   Architecture: ") + chalk.white(sysInfo.arch));
  console.log(chalk.gray("   CPU: ") + chalk.white(sysInfo.cpu));
  console.log(chalk.gray("   Memory: ") + chalk.white(sysInfo.memory));
  console.log(chalk.gray("   Uptime: ") + chalk.white(sysInfo.uptime));
  console.log("");

  await runBIOSSimulation();

  await runBIOSUpdateSimulation();

  await loadKernelModules();

  await installDrivers();

  await scanWifiNetworks();

  await mountFilesystems();

  await startServices();

  await connectToRegistry();

  await showSpaceFact();

  await resolveDependencies();

  await downloadPackages();

  await verifyChecksums();

  await installPackages();

  await buildNativeModules();

  await runPostInstallScripts();

  await optimizeBundle();

  console.log("");
  console.log(chalk.bold.green("=".repeat(65)));
  console.log(chalk.bold.green("     Installation Complete!"));
  console.log(chalk.bold.green("=".repeat(65)));
  console.log("");
  console.log(
    chalk.gray("Packages installed: ") + chalk.white(packages.length)
  );
  console.log(chalk.gray("Time wasted: ") + chalk.white("Just right"));
  console.log(
    chalk.gray("Actual work done: ") + chalk.white("Absolutely nothing!")
  );
  console.log(chalk.gray("Space facts learned: ") + chalk.white("1"));
  console.log("");
  console.log(chalk.dim("Thank you for using do-nothing!\n"));
}

process.on("SIGINT", () => {
  console.log(chalk.red("\n\nInstallation cancelled"));
  console.log(chalk.gray("(Don't worry, nothing was installed anyway)\n"));
  process.exit(0);
});

main().catch((err) => {
  console.error(chalk.red("Error:"), err);
  process.exit(1);
});
