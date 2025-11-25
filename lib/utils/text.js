function wrapText(text, maxWidth = 70) {
  const words = text.split(" ");
  const lines = [];
  let currentLine = "   ";

  for (const word of words) {
    if ((currentLine + word).length > maxWidth) {
      lines.push(currentLine);
      currentLine = "   " + word + " ";
    } else {
      currentLine += word + " ";
    }
  }
  if (currentLine.trim().length > 0) {
    lines.push(currentLine);
  }

  return lines.join("\n");
}

export { wrapText };
