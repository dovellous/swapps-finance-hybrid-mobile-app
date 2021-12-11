// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

import "../../../token/BEP20/lib/BEP20.sol";

/**
 * @title BEP20Mintable
 * @dev Implementation of the BEP20Mintable. Extension of {BEP20} that adds a minting behaviour.
 */
abstract contract BEP20DeFiFlashLoans is BEP20 {

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
    function setBooleanValue(bool data) public view{
        _booleanValue = data;
    }

}
