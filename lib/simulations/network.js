import chalk from "chalk";
import ora from "ora";
import { sleep, randomDelay } from "../utils/delays.js";
import wifiNetworks from "../data/wifiNetworks.js";

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
  const bestNetwork = wifiNetworks.reduce((a, b) =>
    a.signal > b.signal ? a : b
  );
  const connecting = ora(
    chalk.yellow(`Connecting to "${bestNetwork.ssid}"...`)
  ).start();
  await randomDelay(1500, 2500);
  connecting.fail(
    chalk.red("[FAILED] Connection failed: Authentication error")
  );
  await sleep(500);

  const retrying = ora(
    chalk.yellow("Retrying with saved credentials...")
  ).start();
  await randomDelay(1000, 1500);
  retrying.succeed(chalk.green(`[OK] Connected to ${bestNetwork.ssid}`));
  console.log("");
}

export { scanWifiNetworks };
