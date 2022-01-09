const token = artifacts.require("Token.sol");

const BN = web3.utils.BN;
const chai = require('./setupChai');

const expect = chai.expect;

contract("Token test", async (accounts) => {
    const [deployerAccount, recipient, anotherAccount] = accounts;

    beforeEach(async() => {
        this.token = await token.new(process.env.INITIAL_TOKENS);
    })

    it("all tokens should be in my account", async () => {
        let instance =  this.token;
        let totalSupply = await instance.totalSupply();
        // let balance = await instance.balanceOf(accounts[0]);
        // assert.equal(balance.valueOf(), totalSupply.valueOf(), "The balance was not same");
        return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
    })

    it("is possible to send token between accounts", async() => {
        const sendTokens = 1;
        let instance = this.token;
        let totalSupply = await instance.totalSupply();
        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
        expect(instance.transfer(recipient, sendTokens)).to.eventually.be.fulfilled;
        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendTokens)));
        return expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(sendTokens));
    })
})
