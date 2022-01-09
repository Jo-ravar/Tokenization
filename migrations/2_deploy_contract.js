var myToken = artifacts.require("Token.sol");
var tokenSale = artifacts.require("TokenSale");
var kycContract = artifacts.require("KycContract");
require("dotenv").config({path: "../.env"});

module.exports = async function(deployer) {
    let addr = await web3.eth.getAccounts();
    await deployer.deploy(myToken, process.env.INITIAL_TOKENS);
    await deployer.deploy(kycContract);
    await deployer.deploy(tokenSale, 1, addr[0], myToken.address, kycContract.address);
    let instance = await myToken.deployed();
    await instance.transfer(tokenSale.address, process.env.INITIAL_TOKENS);
}