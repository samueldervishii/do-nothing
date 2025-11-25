import chalk from "chalk";
import ora from "ora";
import cliProgress from "cli-progress";
import { sleep, randomDelay } from "../utils/delays.js";
import { getNASAFact } from "../utils/nasaApi.js";
import { wrapText } from "../utils/text.js";
import packages from "../data/packages.js";
import errors from "../data/errors.js";

async function connectToRegistry() {
  const connecting = ora(
    chalk.yellow("Connecting to package registry...")
  ).start();
  await randomDelay(1000, 1800);
  connecting.succeed(chalk.green("[OK] Connected to registry.npmjs.org"));
}

async function showSpaceFact() {
  const fetchingNASA = ora(
    chalk.yellow("Fetching space data from NASA...")
  ).start();
  const nasaFact = await getNASAFact();
  await randomDelay(500, 1000);
  fetchingNASA.succeed(chalk.green("[OK] NASA data retrieved"));

  console.log("");
  console.log(chalk.bold.magenta("Today's Space Fact:"));
  console.log(chalk.cyan(`   ${nasaFact.title} (${nasaFact.date})`));
  console.log(chalk.dim(wrapText(nasaFact.explanation)));
  console.log("");
}

async function resolveDependencies() {
  const resolving = ora(chalk.yellow("Resolving dependencies...")).start();
  await randomDelay(1500, 2000);

  const randomError = errors[Math.floor(Math.random() * errors.length)];
  resolving.fail(chalk.red("[FAILED] Dependency resolution failed"));
  console.log(chalk.red(`   [ERROR] ${randomError}`));
  await sleep(800);

  const fixing = ora(chalk.yellow("Attempting auto-fix...")).start();
  await randomDelay(1000, 2000);
  fixing.succeed(chalk.green("[OK] Auto-fix applied successfully"));

  const retrying = ora(
    chalk.yellow("Retrying dependency resolution...")
  ).start();
  await randomDelay(1000, 1500);
  retrying.succeed(
    chalk.green(`[OK] Found ${packages.length} packages to install`)
  );

  console.log("");
}

async function downloadPackages() {
  const progressBar = new cliProgress.SingleBar({
    format:
      chalk.cyan("Downloading |") +
      "{bar}" +
      chalk.cyan("| {percentage}% | {package}"),
    barCompleteChar: "\u2588",
    barIncompleteChar: "\u2591",
    hideCursor: true,
  });

  progressBar.start(100, 0, { package: "initializing..." });

  for (let i = 0; i < packages.length; i++) {
    const progress = Math.floor(((i + 1) / packages.length) * 100);
    progressBar.update(progress, { package: packages[i] });
    await randomDelay(300, 800);
  }

  progressBar.stop();
  console.log(chalk.green("[OK] All packages downloaded\n"));
}

async function verifyChecksums() {
  const verifying = ora(chalk.yellow("Verifying package checksums...")).start();
  await randomDelay(1000, 1500);

  if (Math.random() > 0.6) {
    verifying.fail(chalk.red("[FAILED] Checksum verification failed"));
    console.log(chalk.red("   [ERROR] Hash mismatch for lodash@4.17.21"));
    await sleep(600);

    const redownload = ora(
      chalk.yellow("Re-downloading corrupted package...")
    ).start();
    await randomDelay(800, 1200);
    redownload.succeed(chalk.green("[OK] Package re-downloaded"));

    const reverify = ora(chalk.yellow("Re-verifying checksums...")).start();
    await randomDelay(500, 1000);
    reverify.succeed(chalk.green("[OK] All checksums verified"));
  } else {
    verifying.succeed(chalk.green("[OK] All checksums verified"));
  }
}

async function installPackages() {
  console.log("");
  for (const pkg of packages.slice(0, 8)) {
    const installing = ora(chalk.yellow(`Installing ${pkg}...`)).start();
    await randomDelay(200, 600);
    installing.succeed(chalk.green(`[OK] Installed ${pkg}`));
  }
}

async function buildNativeModules() {
  const building = ora(chalk.yellow("Building native modules...")).start();
  await randomDelay(1500, 2000);

  if (Math.random() > 0.7) {
    building.fail(chalk.red("[FAILED] Build failed"));
    console.log(chalk.red("   [ERROR] Compiler error in bcrypt@5.1.1"));
    await sleep(500);

    const patching = ora(
      chalk.yellow("Applying compatibility patch...")
    ).start();
    await randomDelay(1000, 1500);
    patching.succeed(chalk.green("[OK] Patch applied"));

    const rebuilding = ora(chalk.yellow("Rebuilding modules...")).start();
    await randomDelay(1000, 1500);
    rebuilding.succeed(chalk.green("[OK] Successfully built native modules"));
  } else {
    building.succeed(chalk.green("[OK] Successfully built native modules"));
  }
}

async function runPostInstallScripts() {
  const scripts = ora(chalk.yellow("Running post-install scripts...")).start();
  await randomDelay(1000, 1500);
  scripts.succeed(chalk.green("[OK] Post-install scripts completed"));
}

async function optimizeBundle() {
  const optimizing = ora(chalk.yellow("Optimizing bundle...")).start();
  await randomDelay(1500, 2000);
  optimizing.succeed(chalk.green("[OK] Bundle optimized"));

  console.log("");
  console.log(chalk.bold.yellow("Generating production artifacts..."));

  const minifying = ora(chalk.yellow("Minifying JavaScript...")).start();
  await randomDelay(800, 1200);
  minifying.succeed(chalk.green("[OK] JavaScript minified (2.3MB -> 847KB)"));

  const compressing = ora(chalk.yellow("Compressing assets...")).start();
  await randomDelay(900, 1400);
  compressing.succeed(chalk.green("[OK] Assets compressed (gzip + brotli)"));

  const generating = ora(chalk.yellow("Generating source maps...")).start();
  await randomDelay(600, 1000);
  generating.succeed(chalk.green("[OK] Source maps generated"));

  const hashing = ora(chalk.yellow("Calculating file hashes...")).start();
  await randomDelay(500, 800);
  hashing.succeed(chalk.green("[OK] File hashes calculated"));
}

export {
  connectToRegistry,
  showSpaceFact,
  resolveDependencies,
  downloadPackages,
  verifyChecksums,
  installPackages,
  buildNativeModules,
  runPostInstallScripts,
  optimizeBundle,
};
