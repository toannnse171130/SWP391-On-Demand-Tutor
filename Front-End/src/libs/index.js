export function combineStrings(input) {
  if (typeof input === "string") {
    return input;
  } else if (Array.isArray(input)) {
    return input.join("\n");
  } else if (typeof input === "object" && input !== null) {
    let errorMessage = "";
    for (const key in input) {
      if (Array.isArray(input[key])) {
        errorMessage += `${input[key].join("\n")} \n`;
      }
    }
    return errorMessage.trim();
  } else {
    return "";
  }
}

export function getValueFromKey(value, list, key = "value") {
  const response = list?.find((day) => day[key] === value);
  return response;
}
