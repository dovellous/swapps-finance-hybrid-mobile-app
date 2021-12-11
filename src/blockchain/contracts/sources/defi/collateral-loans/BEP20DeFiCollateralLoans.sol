// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

import "../../../token/BEP20/lib/BEP20.sol";

/**
 * @title BEP20Mintable
 * @dev Implementation of the BEP20Mintable. Extension of {BEP20} that adds a minting behaviour.
 */
abstract contract BEP20DeFiCollateralLoans is BEP20 {

    mapping(address => uint) public depositStart;
    mapping(address => uint) public etherBalanceOf;
    mapping(address => uint) public collateralEther;

    mapping(address => bool) public isDeposited;
    mapping(address => bool) public isBorrowed;

    event Deposit(address indexed user, uint etherAmount, uint timeStart);
    event Withdraw(address indexed user, uint etherAmount, uint depositTime, uint interest);
    event Borrow(address indexed user, uint collateralEtherAmount, uint borrowedTokenAmount);
    event PayOff(address indexed user, uint fee);

    // indicates if minting is finished
    bool private _booleanValue = false;

    //
    function getBooleanValue() public view returns (bool) {
        return _booleanValue;
    }

    //
    function setBooleanValue(bool data) public {
        _booleanValue = data;
    }

    //
    function borrow() payable public{

        require(msg.value>=1e16, 'Error, collateral must be >= 0.01 ETH');
        require(isBorrowed[msg.sender] == false, 'Error, loan already taken');

        //this Ether will be locked till user payOff the loan
        collateralEther[msg.sender] = collateralEther[msg.sender] + msg.value;

        //calc tokens amount to mint, 50% of msg.value
        uint tokensToMint = collateralEther[msg.sender] / 2;

        //mint&send tokens to user
        mint(msg.sender, tokensToMint);

        //activate borrower's loan status
        isBorrowed[msg.sender] = true;

        emit Borrow(msg.sender, collateralEther[msg.sender], tokensToMint);

    }

    //
    function payOff() public{

        require(isBorrowed[msg.sender] == true, 'Error, loan not active');
        require(transferFrom(msg.sender, address(this), collateralEther[msg.sender]/2), "Error, can't receive tokens"); //must approve dBank 1st

        uint fee = collateralEther[msg.sender]/10; //calc 10% fee

        //send user's collateral minus fee
        msg.sender.transfer(collateralEther[msg.sender]-fee);

        //reset borrower's data
        collateralEther[msg.sender] = 0;
        isBorrowed[msg.sender] = false;

        emit PayOff(msg.sender, fee);

    }

}
