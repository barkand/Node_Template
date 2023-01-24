function clearAndUpper(text: any) {
  return text.replace(/-/, "").toUpperCase();
}

function toPascalCase(text: any) {
  return text.replace(/(^\w|-\w)/g, clearAndUpper);
}

export { toPascalCase };
