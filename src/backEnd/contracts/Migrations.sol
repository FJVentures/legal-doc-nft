// SPDX-License-Identifier: MIT
pragma solidity 0.7.4;

contract Migrations {
  address public owner = msg.sender;
  uint public last_completed_migration;

  modifier restricted() {
    require(
      msg.sender == owner,
      "This function is restricted to the contract's owner"
    );
    _;
  }

  function setCompleted(uint completed) public restricted {
    last_completed_migration = completed;
  }
}

//Rinkeby address: 0xa43f8e754033325b5C341a6Ab2656F1cE6dbF6C0