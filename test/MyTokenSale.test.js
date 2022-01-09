const tokenSale = artifacts.require("TokenSale.sol");
const token = artifacts.require("Token.sol");


const BN = web3.utils.BN;
const chai = require('./setupChai');

const expect = chai.expect;

contract("TokenSale test", async (accounts) => {
    const [deployerAccount, recipient, anotherAccount] = accounts;

    it('should not have token in deployerAccount', async () => {
        let instance = await token.deployed();
        return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(new BN(0));
    });
})
