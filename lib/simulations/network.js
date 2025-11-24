const chalk = require("chalk");
const ora = require("ora");
const { sleep, randomDelay } = require("../utils/delays");
const wifiNetworks = require("../data/wifiNetworks");

async function scanWifiNetworks() {
  console.log(chalk.bold.yellow("Scanning for wireless networks..."));
  const scanning = ora(chalk.yellow("Initializing WiFi adapter...")).start();
  await randomDelay(800, 1200);
  scanning.succeed(chalk.green("[OK] WiFi adapter ready"));

  console.log(chalk.cyan(`\n   Found ${wifiNetworks.length} networks:\n`));
  for (const network of wifiNetworks) {
    console.log(
      chalk.gray("   ") +
        chalk.cyan(network.ssid.padEnd(35)) +
        chalk.gray(`${network.signal} dBm  `) +
        chalk.yellow(network.security)
    );
    await sleep(150);
  }

  console.log("");
  const hacking = ora(
    chalk.yellow('Attempting to connect to "FBI Surveillance Van #3"...')
  ).start();
  await randomDelay(1500, 2500);
  hacking.fail(chalk.red("[FAILED] Connection failed: Password protected"));
  await sleep(500);

  const cracking = ora(
    chalk.yellow("Running password dictionary attack...")
  ).start();
  await randomDelay(2000, 3000);
  cracking.fail(chalk.red("[FAILED] Attack failed: Password is '********'"));
  console.log(
    chalk.gray("   Note: Just kidding! We don't actually hack networks")
  );
  console.log("");
}

module.exports = { scanWifiNetworks };
