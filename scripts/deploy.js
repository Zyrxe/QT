const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying contracts with account:", deployer.address);

    const treasury = "0x095C20E1046805d33c5f1cCe7640F1DD4b693a49";
    const specialWallet = "0xE0FB20c169d6EE15Bb7A55b5F71199099aD4464F";

    const BiawakToken = await hre.ethers.getContractFactory("BiawakTokenV3");
    const token = await hre.upgrades.deployProxy(BiawakToken, [treasury, specialWallet], { initializer: 'initialize' });
    await token.deployed();

    console.log("BIAWAK V3 deployed to:", token.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
