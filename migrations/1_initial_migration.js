const NEFI = artifacts.require("NEFI");

module.exports = function (deployer) {
  deployer.deploy(NEFI);
};
