const SwappsToken = artifacts.require('SwappsBEP20')

module.exports = async function (deployer, network, accounts) {
    try {

        /*

        let lendingPoolAddressesProviderAddress;

        switch(network) {
            case "mainnet":
            case "mainnet-fork":
            case "development": // For Ganache mainnet forks
                lendingPoolAddressesProviderAddress = "0x24a42fD28C976A61Df5D00D0599C34c4f90748c8"; break;
            case "ropsten":
            case "ropsten-fork":
                lendingPoolAddressesProviderAddress = "0x1c8756FD2B28e9426CDBDcC7E3c4d64fa9A54728"; break;
            case "kovan":
            case "kovan-fork":
                lendingPoolAddressesProviderAddress = "0x506B0B2CF20FAA8f38a4E2B524EE43e1f4458Cc5"; break;
            default:
                throw Error(`Are you deploying to the correct network? (network selected: ${network})`)
        }

        // Deploy Mock DAI Token
        await deployer.deploy(DaiToken)
        const daiToken = await DaiToken.deployed()

        // Deploy Dapp Token
        await deployer.deploy(DappToken)
        const dappToken = await DappToken.deployed()

        // Deploy TokenFarm
        await deployer.deploy(TokenFarm, dappToken.address, daiToken.address)
        const tokenFarm = await TokenFarm.deployed()

        await deployer.deploy(FlashloanV2, lendingPoolAddressesProviderAddress);

        */

        const _SwappsToken = await deployer.deploy(SwappsToken,  "V1", "V2");

        console.log(":: DEPLOYED SwappsToken ::", SwappsToken);

    } catch (e) {

        console.log(`Error in migration: ${e.message}`);

    }

};
