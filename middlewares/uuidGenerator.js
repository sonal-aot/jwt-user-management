const crypto = require("crypto")
const { v4: uuidv4 } = require("uuid");

const uuidNumber = () => {
  const uuid = uuidv4();
  let uuidNum = (parseInt(uuid.replace(/-/g, ""), 16) % 80000) + 1;
  return crypto.randomInt(uuidNum);
};

module.exports = uuidNumber;