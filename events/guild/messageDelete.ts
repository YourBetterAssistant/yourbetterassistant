const GhostPing = require("../../Constructors/ghostPing");
const { checkAutoMod } = require("../../Utils/checkAutoMod");
module.exports = async (client, message) => {
  await checkAutoMod(message).then(async (found) => {
    console.log(found);
    if (found.strictmode === "true") {
      GhostPing.messageDelete(message);
    } else if (found.strictmode === "false") {
      GhostPing.messageDelete(message);
    }
  });
};
