const assert = require("assert");
const { time } = require("@openzeppelin/test-helpers");

const TimelockController = artifacts.require("TimelockController");
const NEFI2 = artifacts.require("NEFI2");

let timelockController;
let nefi2;
contract("TimelockController", (accounts) => {
  it("deploy", async () => {
    timelockController = await TimelockController.new(
      3600,
      [accounts[0]],
      [accounts[0]]
    );
    nefi2 = await NEFI2.deployed();
  });

  it("setup partner", async () => {
    await nefi2.setupPartnerAddress(accounts[1]);
  });
  it(" partner unlock", async () => {
    await nefi2.unlockFromPartner({
      from: accounts[1],
    });
  });
  it(" owner unlock", async () => {
    await nefi2.unlockFromOwner({
      from: accounts[0],
    });
  });

  it("setup locker", async () => {
    await nefi2.setupLockerAddress(timelockController.address, {
      from: accounts[0],
    });
  });



  it("add 31 days", async () => {
    await time.increase(time.duration.days(31));
  });

  let ppid;

  it("schedule mint", async () => {
    ppid = await timelockController.schedule(
      nefi2.address,
      "0",
      web3.eth.abi.encodeFunctionCall(
        {
          inputs: [
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "mintFromLocker",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        [accounts[7], web3.utils.toWei("28500000", "ether")]
      ),
      web3.utils.utf8ToHex(""),
      web3.utils.utf8ToHex("HelloSalt"),
      86400*2
    );

    ppid = ppid.logs[0].args["0"];
  });

  it("schedule state", async () => {
    console.log(await timelockController.isOperationReady(ppid));
    console.log(await timelockController.isOperationPending(ppid));
    console.log(await timelockController.isOperationDone(ppid));
  });

  it("add more time 1", async () => {
    await time.increase(time.duration.days(1));
  });

  it("schedule state", async () => {
    console.log(await timelockController.isOperationReady(ppid));
    console.log(await timelockController.isOperationPending(ppid));
    console.log(await timelockController.isOperationDone(ppid));
  });

  it("add more time 2", async () => {
    await time.increase(time.duration.hours(23));
  });


  it("balance of account 7 a", async () => {
    console.log((await nefi2.balanceOf.call(accounts[7])).toString());
  });

  it("execute", async () => {
    await timelockController.execute(
      nefi2.address,
      "0",
      web3.eth.abi.encodeFunctionCall(
        {
          inputs: [
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "mintFromLocker",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        [accounts[7], web3.utils.toWei("28500000", "ether")]
      ),
      web3.utils.utf8ToHex(""),
      web3.utils.utf8ToHex("HelloSalt")
    );
  });

  it("schedule state", async () => {
    console.log(await timelockController.isOperationReady(ppid));
    console.log(await timelockController.isOperationPending(ppid));
    console.log(await timelockController.isOperationDone(ppid));
  });

  it("balance of account 7 b", async () => {
    console.log((await nefi2.balanceOf.call(accounts[7])).toString());
  });
});
