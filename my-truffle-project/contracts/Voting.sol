pragma solidity ^0.8.0;

contract Voting {
    struct Voter {
        string voterid;
        string party;
    }

    mapping(address => Voter) public voters;

    function vote(string memory _voterid, string memory _party) public {
        require(bytes(voters[msg.sender].voterid).length == 0, "Voter has already voted");

        voters[msg.sender] = Voter(_voterid, _party);
    }

    function getVoter(address _voter) public view returns (string memory, string memory) {
        return (voters[_voter].voterid, voters[_voter].party);
    }
}
