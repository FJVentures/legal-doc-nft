import { tokens, ether, ETHER_ADDRESS, expectRevert, expectEvent } from './helpers'

console.log("Testing")

const LegalDoc = artifacts.require('./LegalDoc')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('LegalDoc', ([acc1, acc2]) => {
  let legalDoc

  beforeEach(async () => {
    legalDoc = await LegalDoc.new()
  })

  describe('deploy and test...', () => {
    it('...name', async () => {
      expect(await legalDoc.name()).to.be.eq('LegalDocRepo')
    })

    it('...symbol', async () => {
      expect(await legalDoc.symbol()).to.be.eq('LDOC')
    })

    it('...owner address', async () => {
      expect(await legalDoc._owner()).to.be.eq(acc1)
    })
  })

  describe('deploy, mint and test...', () => {

    beforeEach(async () => {
      await legalDoc.mint('token_uri_1', ether(0.01))
      await legalDoc.mint('token_uri_2', ether(0.02))
      await legalDoc.mint('token_uri_3', ether(0.03))
    })

    it('...total supply', async () => {
      expect(Number(await legalDoc.totalSupply())).to.be.eq(3)
    })

    it("...URI's", async () => {
      expect(await legalDoc.tokenURI('1')).to.be.eq('token_uri_1')
      expect(await legalDoc.tokenURI('2')).to.be.eq('token_uri_2')
      expect(await legalDoc.tokenURI('3')).to.be.eq('token_uri_3')
    })

    it("...prices", async () => {
      expect(Number(await legalDoc.price('1'))).to.be.eq(Number(ether(0.01)))
      expect(Number(await legalDoc.price('2'))).to.be.eq(Number(ether(0.02)))
      expect(Number(await legalDoc.price('3'))).to.be.eq(Number(ether(0.03)))
    })

    it("+ test if rejects minting by non-owner", async () => {
      expectRevert(legalDoc.mint('token_uri_4', ether(0.04), { from: acc2 }), "Ownable: caller is not the owner")
    })
  })

  describe('deploy, mint, buy and test...', () => {
    let result

    beforeEach(async () => {
      await legalDoc.mint('token_uri_1', ether(0.01))
      await legalDoc.mint('token_uri_2', ether(0.02))
      result = await legalDoc.buy('1', {from: acc2, value: ether(0.01)})
    })

    it('...new owner', async () => {
      expect(await legalDoc.ownerOf('1')).to.be.eq(acc2)
    })

    it("...sold status", async () => {
      expect(await legalDoc.sold('1')).to.eq(true)
    })

    it("...event values", () => {
      expectEvent.inLogs(result.logs, 'Purchase', {
        owner: acc2,
        price: ether(0.01),
        id: '1',
        uri: 'token_uri_1'
      })
    })

    it("...sold status", async () => {
      expect(await legalDoc.sold('1')).to.eq(true)
    })

    it("+ test if rejects buying for invalid id, msg.value and status", async () => {
      expectRevert(legalDoc.buy('1', {from: acc2, value: ether(0.01)}), "Error, wrong Token id")
      expectRevert(legalDoc.buy('2', {from: acc2, value: ether(0.01)}), "Error, Token costs more")
      expectRevert(legalDoc.buy('3', {from: acc2, value: ether(0.02)}), "Error, Token is sold")
    })
  })
})