// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

import "../../../token/BEP20/lib/BEP20.sol";

/**
 * @title BEP20Mintable
 * @dev Implementation of the BEP20Mintable. Extension of {BEP20} that adds a minting behaviour.
 */
abstract contract BEP20DeFiSavings is BEP20 {

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
    function setBooleanValue(bool data) public{
        _booleanValue = data;
    }

    //
    function deposit() payable public{

        require(isDeposited[msg.sender] == false, 'Error, deposit already active');
        require(msg.value>=1e16, 'Error, deposit must be >= 0.01 ETH');

        etherBalanceOf[msg.sender] = etherBalanceOf[msg.sender] + msg.value;
        depositStart[msg.sender] = depositStart[msg.sender] + block.timestamp;

        isDeposited[msg.sender] = true; //activate deposit status
        emit Deposit(msg.sender, msg.value, block.timestamp);

    }

    //
    function withdraw() public{

        require(isDeposited[msg.sender]==true, 'Error, no previous deposit');
        uint userBalance = etherBalanceOf[msg.sender]; //for event

        //check user's hodl time
        uint depositTime = block.timestamp - depositStart[msg.sender];

        //31668017 - interest(10% APY) per second for min. deposit amount (0.01 ETH), cuz:
        //1e15(10% of 0.01 ETH) / 31577600 (seconds in 365.25 days)

        //(etherBalanceOf[msg.sender] / 1e16) - calc. how much higher interest will be (based on deposit), e.g.:
        //for min. deposit (0.01 ETH), (etherBalanceOf[msg.sender] / 1e16) = 1 (the same, 31668017/s)
        //for deposit 0.02 ETH, (etherBalanceOf[msg.sender] / 1e16) = 2 (doubled, (2*31668017)/s)
        uint interestPerSecond = 31668017 * (etherBalanceOf[msg.sender] / 1e16);
        uint interest = interestPerSecond * depositTime;

        //send funds to user
        msg.sender.transfer(etherBalanceOf[msg.sender]); //eth back to user
        mint(msg.sender, interest); //interest to user

        //reset depositer data
        depositStart[msg.sender] = 0;
        etherBalanceOf[msg.sender] = 0;
        isDeposited[msg.sender] = false;

        emit Withdraw(msg.sender, userBalance, depositTime, interest);

    }

}
