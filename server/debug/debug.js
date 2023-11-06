const printObject = (obj) => {
  const stringValuesObj = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "string") {
      stringValuesObj[key] = value;
    }
  }
  return stringValuesObj;
};

module.exports = printObject;
