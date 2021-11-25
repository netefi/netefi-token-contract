const assert = require("assert");
const { time } = require("@openzeppelin/test-helpers");

const NEFI_A = artifacts.require("NEFI");

//nefi = 0x48346D5EdA3558311a231BA169C48bE0D08c2861
//timelock = 0x0734e221515C4506d69e824A0feE88F9cE68Baa0

contract("NEFI", (accounts) => {
  let NEFI;

  it("Init", async () => {
    NEFI = await NEFI_A.at("0x48346D5EdA3558311a231BA169C48bE0D08c2861");
  });

  it("init mint ", async () => {
    const result = await NEFI.totalSupply.call();
    console.log(result.toString());
  });

  it("setup partner", async () => {
    const result = await NEFI.setupPartnerAddress(accounts[8], {
      from: accounts[0],
    });
  });

  it("setup gov", async () => {
    const result = await NEFI.setupGovAddress(accounts[9], {
      from: accounts[0],
    });
  });

  it(" partner unlock", async () => {
    const result = await NEFI.unlockFromPartner({
      from: accounts[8],
    });
  });

  it(" owner unlock", async () => {
    const result = await NEFI.unlockFromOwner({
      from: accounts[0],
    });
  });

  it("check mint", async () => {
    await NEFI.mint(accounts[1], web3.utils.toWei("1", "ether"), {
      from: accounts[9],
    });
  });

  it("check mintFromLocker", async () => {
    await NEFI.mintFromLocker(accounts[1], web3.utils.toWei("1", "ether"), {
      from: accounts[9],
    });
  });

  it("pass 32", async () => {
    await time.increase(time.duration.days(32));
  });

  it("check mintFromLocker", async () => {
    await NEFI.mintFromLocker(accounts[1], web3.utils.toWei("1", "ether"), {
      from: accounts[9],
    });
  });

  it("setup locker", async () => {
    const result = await NEFI.setupLockerAddress(accounts[7], {
      from: accounts[0],
    });
  });

  it("check mintFromLocker a", async () => {
    await NEFI.mintFromLocker(
      accounts[1],
      web3.utils.toWei("28500000", "ether"),
      {
        from: accounts[7],
      }
    );
  });

  it("check mintFromLocker b", async () => {
    await NEFI.mintFromLocker(
      accounts[1],
      web3.utils.toWei("0.00000000000000001", "ether"),
      {
        from: accounts[7],
      }
    );
  });

  it("detegate to account 1", async () => {
    await NEFI.delegate(accounts[1], {
      from: accounts[1],
    });
  });

  // it("transfer to account 1", async () => {
  //   await NEFI.transfer(accounts[1], web3.utils.toWei("1", "ether"), {
  //     from: accounts[0],
  //   });
  //   console.log(await NEFI.getPastEvents());
  // });

  it("balance of account 1", async () => {
    const result = await NEFI.balanceOf.call(accounts[1]);
    console.log(result.toString());
  });

  it("getVotes account 1", async () => {
    const result = await NEFI.getVotes.call(accounts[1]);
    console.log(result.toString());
  });

  it("numCheckpoints account 1", async () => {
    const result = await NEFI.numCheckpoints.call(accounts[1]);
    console.log(result.toString());
  });

  it("block run", async () => {
    for (let i = 0; i < 100; i++) {
      await time.increase(time.duration.seconds(3));
    }
  });

  it(" getPastVotes from account 1 ", async () => {
    const result = await NEFI.getPastVotes.call(
      accounts[1],
      (await web3.eth.getBlockNumber()) - 1
    );
    console.log(result.toString());
  });
});
