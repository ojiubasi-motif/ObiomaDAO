import sdk from "./1-initialize-sdk.js";
// ===========voteContractAddress========0x0a2Fff34E525BB9537B8373c3197101B72215A88======
// ====beta-====0x78Ddd7b7C94A02F0de8c11fc50A66B4d502D844a======gama=====>0xA38A9bFBbbB8998F9b930c888ee667D4a96FF599=====
(async () => {
  try {
    const voteContractAddress = await sdk.deployer.deployVote({
      // Give your governance contract a name.
      name: "WAZOBIA DAO",

      // This is the location of our governance token, our ERC-20 contract!
      voting_token_address: "0x0bde835AFB2b23C0a4392842e81b1C95d5bdfeFe",

      // These parameters are specified in number of blocks. 
      // Assuming block time of around 13.14 seconds (for Ethereum)

      // After a proposal is created, when can members start voting?
      // For now, we set this to immediately.
      voting_delay_in_blocks: 0,

      // How long do members have to vote on a proposal when it's created?
      // we will set it to 1 day = 6570 blocks
      voting_period_in_blocks: 6570,

      // The minimum % of the total supply that need to vote for
      // the proposal to be valid after the time for the proposal has ended.
      voting_quorum_fraction: 1,

      // What's the minimum # of tokens a user needs to be allowed to create a proposal?
      // I set it to 0. Meaning no tokens are required for a user to be allowed to
      // create a proposal.
      proposal_token_threshold: 0,
    });

    console.log(
      "✅ Successfully deployed vote contract, address:",
      voteContractAddress,
    );
  } catch (err) {
    console.error("Failed to deploy vote contract", err);
  }
})();