import React, { Component } from "react";
import PropertiesContract from "./contracts/Properties.json";
import getWeb3 from "./utils/getWeb3";
import truffleContract from "truffle-contract";

import "./App.css";

class App extends Component {
  state = {
    headSize: 0,
    web3: null,
    accounts: null,
    contract: null,
    inputValue: null,
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const Contract = truffleContract(PropertiesContract);
      Contract.setProvider(web3.currentProvider);
      const instance = await Contract.deployed();

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.log(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    // console.log('about to set the head size');
    // await contract.setHeadSize(5, { from: accounts[0] });
    //
    // // Get the value from the contract to prove it worked.
    // const response = await contract.getHeadSize();
    //
    // // Update state with the result.
    // console.log("the response --> ", JSON.stringify(response));
    // this.setState({ headSize: response.toNumber() });
  };

  handleChange = (event) => {
    this.setState({ inputValue: event.target.value });
  }

  handleSetHeadSizeClick = async () => {
    const { accounts, contract, inputValue } = this.state;
    await contract.setHeadSize(inputValue, { from: accounts[0] });

    const response = await contract.getHeadSize();

    this.setState({ headSize: response.toNumber() });
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 37</strong> of App.js.
        </p>
        <div>The stored value is: {this.state.headSize}</div>
        <div onClick={this.handleSetHeadSizeClick}>
          Set New Head Size
        </div>
        <input
          type="text"
          onChange={this.handleChange}
        />
        <div>
          The current input value is {this.state.inputValue}.
        </div>
      </div>
    );
  }
}

export default App;
