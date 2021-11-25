//const NEFI = artifacts.require("NEFI");
//const NEFI2 = artifacts.require("NEFI2");
const NefiTimelockController = artifacts.require("NefiTimelockController");

module.exports = async function (deployer) {
  //await deployer.deploy(NEFI);
  //await deployer.deploy(NEFI2);
  await deployer.deploy(NefiTimelockController,3600,["0x85641F72a23145834FaA600dD1B64aE45EdeC1dB"],["0x85641F72a23145834FaA600dD1B64aE45EdeC1dB"]);

  console.log(NefiTimelockController.address);
};
