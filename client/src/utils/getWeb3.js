import Web3 from "web3";

const getWeb3 = () => {
  return new Promise((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener("load", () => {
      let web3 = window.web3;
      const alreadyInjected = typeof web3 !== "undefined";

      if (alreadyInjected) {
        web3 = new Web3(web3.currentProvider);
        console.log("Injected web3 detected.");
        resolve(web3);
      } else {
        const provider = new Web3.providers.HttpProvider("http://127.0.0.1:9545");
        web3 = new Web3(provider);
        console.log("No web3 instance injected, using local web3.");
        resolve(web3);
      }
    });
  });
}

export default getWeb3;
