const NEFI_A = artifacts.require("NEFI");

module.exports = async () => {
    NEFI = await NEFI_A.at("0x48346D5EdA3558311a231BA169C48bE0D08c2861");
    await NEFI.setupLockerAddress("0x0734e221515C4506d69e824A0feE88F9cE68Baa0");
}