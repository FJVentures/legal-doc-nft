const LegalDoc = artifacts.require("LegalDoc");

module.exports = async(deployer) => {
  await deployer.deploy(LegalDoc);
};