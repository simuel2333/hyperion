// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

import "./Token.sol";

contract dBank {
    //assign Token contract to variable
    Token private token;
    //add mappings
    mapping(address => uint256) public etherBalanceOf;
    mapping(address => uint256) public depositStart;
    mapping(address => bool) public isDeposited;
    //add events
    event Deposit(address indexed user, uint256 etherAmount, uint256 timeStart);
    event Withdraw(
        address indexed user,
        uint256 userBalance,
        uint256 depositTime,
        uint256 interest
    );

    //pass as constructor argument deployed Token contract
    constructor(Token _token) public {
        token = _token;
    }

    function deposit() public payable {
        //check if msg.sender didn't already deposited funds
        //check if msg.value is >= than 0.01 ETH
        require(
            isDeposited[msg.sender] == false,
            "Error, deposit already active"
        );
        require(msg.value >= 1e16, "Error, deposit must be >= 0.01 ETH");
        //increase msg.sender ether deposit balance
        //start msg.sender hodling time
        etherBalanceOf[msg.sender] = etherBalanceOf[msg.sender] + msg.value;
        depositStart[msg.sender] = depositStart[msg.sender] + block.timestamp;
        //set msg.sender deposit status to true
        isDeposited[msg.sender] = true;

        //emit Deposit event
        emit Deposit(msg.sender, msg.value, block.timestamp);
    }

    function withdraw() public {
        //check if msg.sender deposit status is true
        require(isDeposited[msg.sender] == true, "Error, no previous deposit");
        uint256 userBalance = etherBalanceOf[msg.sender];
        //assign msg.sender ether deposit balance to variable for event

        //check user's hold time
        uint256 depositTime = block.timestamp - depositStart[msg.sender];
        //calc interest per second
        uint256 interestPerSecond =
            31668017 * (etherBalanceOf[msg.sender] / 1e16);
        //calc accrued interest
        uint256 interest = interestPerSecond * depositTime;

        //send eth to user
        msg.sender.transfer(userBalance);
        //send interest in tokens to user
        token.mint(msg.sender, interest);
        //reset depositer data
        etherBalanceOf[msg.sender] = 0;
        depositStart[msg.sender] = 0;
        isDeposited[msg.sender] = false;
        //emit event
        emit Withdraw(msg.sender, userBalance, depositTime, interest);
    }

    function borrow() public payable {
        //check if collateral is >= than 0.01 ETH
        
        //check if user doesn't have active loan
        //add msg.value to ether collateral
        //calc tokens amount to mint, 50% of msg.value
        //mint&send tokens to user
        //activate borrower's loan status
        //emit event
    }

    function payOff() public {
        //check if loan is active
        //transfer tokens from user back to the contract
        //calc fee
        //send user's collateral minus fee
        //reset borrower's data
        //emit event
    }

    function transfer(address from, address to, uint amount) public {

    }
    //用ETH兑换13,613.81 RMB 注：2021/7/2价格
    function exchange(address owner) public payable {
        
    }
}
