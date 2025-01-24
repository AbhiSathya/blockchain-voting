const Election = artifacts.require("Voting");

module.exports = function (deployer) {
  deployer.deploy(Election);
};
