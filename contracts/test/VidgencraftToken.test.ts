import { expect } from 'chai';
import { ethers } from 'hardhat';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { VidgencraftToken } from '../typechain-types';

describe('VidgencraftToken', () => {
  let token: VidgencraftToken;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;

  beforeEach(async () => {
    const VidgencraftToken = await ethers.getContractFactory('VidgencraftToken');
    [owner, addr1, addr2] = await ethers.getSigners();
    token = await VidgencraftToken.deploy();
    await token.deployed();
  });

  describe('Deployment', () => {
    it('Should set the right owner', async () => {
      expect(await token.owner()).to.equal(owner.address);
    });

    it('Should assign the total supply of tokens to the owner', async () => {
      const ownerBalance = await token.balanceOf(owner.address);
      expect(await token.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe('Transactions', () => {
    it('Should transfer tokens between accounts', async () => {
      await token.transfer(addr1.address, 50);
      const addr1Balance = await token.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(50);

      await token.connect(addr1).transfer(addr2.address, 25);
      const addr2Balance = await token.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(25);
    });

    it('Should fail if sender does not have enough tokens', async () => {
      const initialOwnerBalance = await token.balanceOf(owner.address);
      await expect(
        token.connect(addr1).transfer(owner.address, 1)
      ).to.be.revertedWith('ERC20: transfer amount exceeds balance');
      expect(await token.balanceOf(owner.address)).to.equal(initialOwnerBalance);
    });
  });

  describe('Minting', () => {
    it('Should allow owner to mint tokens', async () => {
      await token.mint(addr1.address, 100);
      expect(await token.balanceOf(addr1.address)).to.equal(100);
    });

    it('Should fail if non-owner tries to mint tokens', async () => {
      await expect(
        token.connect(addr1).mint(addr2.address, 100)
      ).to.be.revertedWith('Ownable: caller is not the owner');
    });
  });

  describe('Burning', () => {
    it('Should allow users to burn their tokens', async () => {
      await token.transfer(addr1.address, 100);
      await token.connect(addr1).burn(50);
      expect(await token.balanceOf(addr1.address)).to.equal(50);
    });

    it('Should fail if user tries to burn more tokens than they have', async () => {
      await expect(token.burn(1000000000)).to.be.revertedWith(
        'ERC20: burn amount exceeds balance'
      );
    });
  });
}); 