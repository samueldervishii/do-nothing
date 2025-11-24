const os = require("os");

function formatUptime(seconds) {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  const parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);

  return parts.join(" ") || "< 1m";
}

function getRealSystemInfo() {
  const platform = os.platform();
  const arch = os.arch();
  const cpus = os.cpus();
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const usedMem = totalMem - freeMem;
  const hostname = os.hostname();
  const osRelease = os.release();

  const cpuModel = cpus[0].model;
  const cpuSpeed = (cpus[0].speed / 1000).toFixed(2);
  const cpuCores = cpus.length;

  const totalMemGB = (totalMem / 1024 / 1024 / 1024).toFixed(2);
  const usedMemGB = (usedMem / 1024 / 1024 / 1024).toFixed(2);
  const freeMemGB = (freeMem / 1024 / 1024 / 1024).toFixed(2);

  let osName, kernelInfo;
  if (platform === "win32") {
    osName = `Windows ${osRelease}`;
    kernelInfo = `Windows NT ${osRelease}`;
  } else if (platform === "darwin") {
    osName = `macOS ${osRelease}`;
    kernelInfo = `Darwin ${osRelease}`;
  } else {
    osName = `Linux ${osRelease}`;
    kernelInfo = `Linux ${osRelease}`;
  }

  return {
    hostname: hostname,
    os: osName,
    kernel: kernelInfo,
    arch: arch,
    cpu: `${cpuModel} @ ${cpuSpeed} GHz (${cpuCores} cores)`,
    memory: `${totalMemGB} GB RAM (${usedMemGB} GB used, ${freeMemGB} GB free)`,
    uptime: formatUptime(os.uptime()),
  };
}

module.exports = { getRealSystemInfo, formatUptime };
