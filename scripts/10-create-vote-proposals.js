import sdk from "./1-initialize-sdk.js";
import { ethers } from "ethers";

// This is our governance contract.
const vote = sdk.getVote("0xA38A9bFBbbB8998F9b930c888ee667D4a96FF599");

// This is our ERC-20 contract.
const token = sdk.getToken("0x0bde835AFB2b23C0a4392842e81b1C95d5bdfeFe");

(async () => {
  try {
    // Create proposal to mint 420,000 new token to the treasury.
    const amount = 900;
    const description = "Should the community make freewill donations of $OBI "+ amount +" from community members toward providing grants to upgrade some outstanding tailors?";
    const executions = [
      {
        // Our token contract that actually executes the mint.
        toAddress: token.getAddress(),
        // Our nativeToken is ETH. nativeTokenValue is the amount of ETH we want
        // to send in this proposal. In this case, we're sending 0 ETH.
        // We're just minting new tokens to the treasury. So, set to 0.
        nativeTokenValue: 0,
        // We're doing a mint! And, we're minting to the vote, which is
        // acting as our treasury.
        // in this case, we need to use ethers.js to convert the amount
        // to the correct format. This is because the amount it requires is in wei.
        transactionData: token.encoder.encode(
          "transfer", [
          vote.getAddress(),
          ethers.utils.parseUnits(amount.toString(), 18),
        ]
        ),
      }
    ];

    await vote.propose(description, executions);

    console.log("✅ Successfully created proposal to provide grants for our outstanding tailors");
  } catch (error) {
    console.error("failed to create third proposal", error);
    process.exit(1);
  }

  try {
    // Create proposal to mint 420,000 new token to the treasury.
    const amount = 50;
    const description = "Should the client be provided with a 'tip' button to send $OBI"+ amount + " as tips to their tailors via our DAO?";
    const executions = [
      {
        // Our token contract that actually executes the mint.
        toAddress: token.getAddress(),
        // Our nativeToken is ETH. nativeTokenValue is the amount of ETH we want
        // to send in this proposal. In this case, we're sending 0 ETH.
        // We're just minting new tokens to the treasury. So, set to 0.
        nativeTokenValue: 0,
        // We're doing a mint! And, we're minting to the vote, which is
        // acting as our treasury.
        // in this case, we need to use ethers.js to convert the amount
        // to the correct format. This is because the amount it requires is in wei.
        transactionData: token.encoder.encode(
          "transfer", [
          vote.getAddress(),
          ethers.utils.parseUnits(amount.toString(), 18),
        ]
        ),
      }
    ];

    await vote.propose(description, executions);

    console.log("✅ Successfully created proposal to tip hardworking tailors");
  } catch (error) {
    console.error("failed to create forth proposal", error);
    // process.exit(1);
  }

  // try {
  //   // Create proposal to transfer ourselves 6,900 tokens for being awesome.
  //   const amount = 50;
  //   // const description = "Should ObiomaDAO transfer $OBI " + amount + " tokens from the treasury to " +
  //   //   process.env.WALLET_ADDRESS + " for being awesome?";
  //     const description = "Should ObiomaDAO give satisfied clients a button to use in tipping tailors with at least $OBI " + amount + "?";
  //   const executions = [
  //     {
  //       // Again, we're sending ourselves 0 ETH. Just sending our own token.
  //       nativeTokenValue: 0,
  //       transactionData: token.encoder.encode(
  //         // We're doing a transfer from the treasury to our wallet.
  //         "transfer",
  //         [
  //           process.env.WALLET_ADDRESS,
  //           ethers.utils.parseUnits(amount.toString(), 18),
  //         ]
  //       ),
  //       toAddress: token.getAddress(),
  //     },
  //   ];

  //   await vote.propose(description, executions);

  //   console.log(
  //     "✅ Successfully created proposal to reward ourselves from the treasury, let's hope people vote for it!"
  //   );
  // } catch (error) {
  //   console.error("failed to create second proposal", error);
  // }
})();