pragma solidity ^0.5.16;

contract Election {
    struct Vote {
        uint voterId;     
        uint candidateId;  
        uint timestamp;    
        // bool isVerified;
    }

    uint public votecount = 0;
    Vote[] public votes;

}