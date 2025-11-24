const chalk = require("chalk");
const ora = require("ora");
const { sleep, randomDelay } = require("../utils/delays");
const { getRealSystemInfo } = require("../utils/systemInfo");
const cliProgress = require("cli-progress");

function generateSerialNumber() {
  const chars = "0123456789ABCDEF";
  const segments = [4, 4, 4, 4, 12];
  return segments
    .map((len) =>
      Array.from(
        { length: len },
        () => chars[Math.floor(Math.random() * chars.length)]
      ).join("")
    )
    .join("-");
}

function generateUUID() {
  const chars = "0123456789ABCDEF";
  return (
    "0A" +
    Array.from(
      { length: 6 },
      () => chars[Math.floor(Math.random() * chars.length)]
    ).join("") +
    "-C14B-1826-F0A8-" +
    Array.from(
      { length: 12 },
      () => chars[Math.floor(Math.random() * chars.length)]
    ).join("")
  );
}

async function runBIOSSimulation() {
  const sysInfo = getRealSystemInfo();
  const biosDate = new Date();
  biosDate.setDate(biosDate.getDate() - Math.floor(Math.random() * 30));
  const systemDate = new Date();

  console.log(chalk.green("\n"));
  console.log(
    chalk.green(
      "  BIOS Date: " +
        biosDate.toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        }) +
        "   S/N: " +
        generateSerialNumber()
    )
  );
  console.log(
    chalk.green(
      "  System Date: " +
        systemDate.toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        }) +
        "  Time: " +
        systemDate.toLocaleTimeString("en-US", { hour12: false })
    )
  );
  console.log(chalk.green("  System Name: " + sysInfo.hostname));
  console.log("");

  console.log(chalk.white("  Performing POST (Power-On Self Test)..."));
  console.log(chalk.white("    CPU: " + sysInfo.cpu.split("@")[0].trim()));
  console.log(
    chalk.white(
      "    CPU Cores: " + sysInfo.cpu.match(/\((\d+) cores\)/)[1] + " physical"
    )
  );
  console.log("");

  await sleep(800);

  const memorySize = parseInt(sysInfo.memory.match(/(\d+\.?\d*) GB/)[1]);
  const memorySizeKB = Math.floor(memorySize * 1024 * 1024);

  const memProgress = new cliProgress.SingleBar({
    format:
      chalk.green("  Testing Memory: [") +
      "{bar}" +
      chalk.green("] {percentage}% {value}/{total} KB OK"),
    barCompleteChar: "#",
    barIncompleteChar: " ",
    hideCursor: true,
  });

  memProgress.start(memorySizeKB, 0);

  for (let i = 0; i <= memorySizeKB; i += Math.floor(memorySizeKB / 50)) {
    memProgress.update(i);
    await sleep(30);
  }
  memProgress.update(memorySizeKB);
  memProgress.stop();

  console.log(
    chalk.white(
      `    Total System Memory: ${memorySize.toFixed(2)} GB (${(memorySize * 1024).toFixed(0)} MB)`
    )
  );
  console.log("");

  await sleep(500);

  console.log(chalk.white("  Detecting IDE Devices..."));
  console.log(
    chalk.green("    Primary Master   [0x1F0-0x1F7]: WDC WD2000JB-00GVC0")
  );
  console.log(chalk.green("    Primary Slave    [0x1F0-0x1F7]: None"));
  console.log(chalk.green("    Secondary Master [0x170-0x177]: ATAPI CD-ROM"));
  console.log(chalk.green("    Secondary Slave  [0x170-0x177]: None"));
  console.log("");

  await sleep(800);

  console.log(chalk.white("  Scanning PCI bus..."));

  const scanProgress = new cliProgress.SingleBar({
    format:
      chalk.white("    Probing 00:00.0 - 00:1F.7: [") +
      chalk.green("{bar}") +
      chalk.white("] {percentage}%"),
    barCompleteChar: "=",
    barIncompleteChar: " ",
    hideCursor: true,
  });

  scanProgress.start(100, 0);
  for (let i = 0; i <= 100; i += 2) {
    scanProgress.update(i);
    await sleep(20);
  }
  scanProgress.stop();

  console.log(chalk.white("    Found 00:04.0 - VGA Compatible Controller"));
  console.log(chalk.white("    Found 00:10.0 - Ethernet Controller"));
  console.log(chalk.white("    Found 00:1F.3 - SMBus Controller"));
  console.log("");

  await sleep(600);

  console.log(chalk.white("  Network Adapters: 22 detected"));
  console.log(chalk.white("  USB Controller: UHCI/EHCI Compatible"));
  console.log(chalk.white("  USB Device(s): 0 connected"));
  console.log("");

  await sleep(500);

  console.log(chalk.white("  Host OS: " + sysInfo.os.split(" ")[0]));
  console.log(chalk.white("  Storage Devices: 2 disk(s) found"));
  console.log(chalk.white("  System UUID: " + generateUUID()));
  console.log("");

  await sleep(600);

  console.log(chalk.white("  Boot Device Priority:"));
  console.log(chalk.green("  1st: Hard Disk Drive"));
  console.log(chalk.dim("  2nd: CD-ROM Drive"));
  console.log(chalk.dim("  3rd: Network Boot"));
  console.log("");

  await sleep(1000);
}

async function runBIOSUpdateSimulation() {
  console.log(chalk.yellow("\n" + "=".repeat(65)));
  console.log(chalk.yellow("  CRITICAL: Firmware Update Sequence Initiated"));
  console.log(chalk.yellow("=".repeat(65) + "\n"));

  await sleep(500);

  const backing = ora(
    chalk.white("  Backing up current BIOS to NVRAM...")
  ).start();
  await randomDelay(1500, 2500);
  backing.succeed(chalk.white("  Backing up current BIOS to NVRAM..."));

  const verifying = ora(
    chalk.white("  Verifying backup integrity... CRC32 OK")
  ).start();
  await randomDelay(1000, 1800);
  verifying.succeed(chalk.white("  Verifying backup integrity... CRC32 OK"));
  console.log("");

  await sleep(300);

  console.log(
    chalk.yellow("  WARNING: Do NOT power off or restart during this process!")
  );
  console.log(chalk.yellow("  System damage may occur if interrupted!"));
  console.log("");

  await sleep(800);

  const stages = [
    { name: "Erasing flash sectors", color: chalk.white },
    { name: "Writing new firmware", color: chalk.white },
    { name: "Verifying firmware", color: chalk.white },
  ];

  for (const stage of stages) {
    const progress = new cliProgress.SingleBar({
      format:
        stage.color(stage.name + ": [") +
        chalk.green("{bar}") +
        stage.color("] {percentage}%"),
      barCompleteChar: "=",
      barIncompleteChar: " ",
      hideCursor: true,
    });

    progress.start(100, 0);
    for (let i = 0; i <= 100; i += 2) {
      progress.update(i);
      await sleep(40);
    }
    progress.stop();
  }

  console.log("");
  await sleep(500);

  console.log(chalk.white("    Firmware update complete!"));
  console.log(
    chalk.white("    Updating ESCD (Extended System Configuration Data)...")
  );
  console.log("");

  await sleep(1000);

  const oldVersion = "v08.00.15";
  const newVersion = "v08.00.16";
  console.log(
    chalk.green(
      `  BIOS update successful - AMIBIOS ${oldVersion} -> ${newVersion}`
    )
  );
  console.log(chalk.green("  System will initialize with new firmware"));
  console.log("");

  await sleep(800);

  console.log(
    chalk.yellow(
      "  WARNING: Deprecated dependency detected, adding to legacy support list"
    )
  );
  console.log(chalk.green("  Continuing anyway..."));
  console.log("");

  await sleep(600);

  console.log(chalk.white("> Kernel Boot Sequence"));
  console.log("");

  await sleep(500);

  const healthLogs = [
    "healthd: battery l=87 v=4100 t=38.0 h=2 st=3 c=550 fc=4395000 cc=16 chg=",
    "FG: fg_adjust_timebase: Error in reading die_temp, rc:-61",
    "healthd: battery l=86 v=4130 t=35.0 h=2 st=3 c=135 fc=4395000 cc=16 chg=",
    "init: Parsing file /system/etc/init/pixys-governor.rc...",
    "q6asm_callback: payload size of 8 is less than expected.",
    "q6core_get_service_version: Failed to get service size for service id 7 with error -95",
  ];

  for (const log of healthLogs) {
    console.log(chalk.green("  " + log));
    await sleep(200);
  }

  console.log("");
}

module.exports = { runBIOSSimulation, runBIOSUpdateSimulation };
