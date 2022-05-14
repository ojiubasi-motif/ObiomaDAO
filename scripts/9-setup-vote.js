import sdk from "./1-initialize-sdk.js";

// This is our governance contract.
const vote = sdk.getVote("0xA38A9bFBbbB8998F9b930c888ee667D4a96FF599");

// This is our ERC-20 contract.
const token = sdk.getToken("0x0bde835AFB2b23C0a4392842e81b1C95d5bdfeFe");

(async () => {
  try {
    // Give our treasury the power to mint additional token if needed.
    await token.roles.grant("minter", vote.getAddress());

    console.log(
      "Successfully gave vote contract permissions to act on token contract"
    );
  } catch (error) {
    console.error(
      "failed to grant vote contract permissions on token contract",
      error
    );
    process.exit(1);
  }

  try {
    // Grab our wallet's token balance, remember -- we hold basically the entire supply right now!
    const ownedTokenBalance = await token.balanceOf(
      process.env.WALLET_ADDRESS
    );

    // Grab 90% of the supply that we hold.
    const ownedAmount = ownedTokenBalance.displayValue;
    const percent95 = Number(ownedAmount) / 100 * 95;

    // Transfer 95% of the supply to our voting contract.
    await token.transfer(
      vote.getAddress(),
      percent95
    ); 

    console.log("✅ Successfully transferred " + percent95 + " tokens to vote contract");
  } catch (err) {
    console.error("failed to transfer tokens to vote contract", err);
  }
})();