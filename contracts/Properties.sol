pragma solidity ^0.4.24;

contract Properties {
  uint headSize;

  function setHeadSize(uint inputValue) public returns (uint) {
    headSize = inputValue;
    return headSize;
  }

  function getHeadSize() public view returns (uint) {
    return headSize;
  }
}
