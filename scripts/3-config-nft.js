import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const editionDrop = sdk.getEditionDrop("0x2f565eF5Abf25B47d8120b9E751Dcd26d7863b51");

(async () => {
  try {
    await editionDrop.createBatch([
      {
        name: "Ankara gown",
        description: "This NFT will give you access to ObiomaDAO!",
        image: readFileSync("scripts/assets/obioma.png"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})();