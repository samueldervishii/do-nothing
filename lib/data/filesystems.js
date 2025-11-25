export default [
  { device: "/dev/nvme0n1p1", mount: "/boot/efi", type: "vfat" },
  { device: "/dev/nvme0n1p2", mount: "/", type: "ext4" },
  { device: "/dev/sda1", mount: "/home", type: "ext4" },
  { device: "/dev/sdb1", mount: "/mnt/data", type: "btrfs" },
  { device: "tmpfs", mount: "/tmp", type: "tmpfs" },
];
