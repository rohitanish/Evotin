document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM fully loaded and parsed');

    if (typeof Web3 !== 'undefined') {
        web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
        console.log('Web3 is loaded');
    } else {
        console.error('Web3 not found. Please install MetaMask or another Web3 provider.');
        return;
    }

    const currentElections = [
        { title: 'BJP vs Congress', description: 'Vote for your preferred party', endDate: '2024-11-01' }
    ];

    const upcomingElections = [
        { title: 'Election 3', description: 'Description for election 3', startDate: '2024-12-15' }
    ];

    const pastElections = [
        { title: 'Election 4', description: 'Description for election 4', result: 'Result of election 4' }
    ];

    const notifications = [
        { message: 'Don’t forget to vote in the current election!' },
        { message: 'Upcoming election starts soon!' }
    ];

    const currentElectionsList = document.querySelector('#current-elections ul');
    const upcomingElectionsList = document.querySelector('#upcoming-elections ul');
    const pastElectionsList = document.querySelector('#past-elections ul');
    const notificationsList = document.querySelector('#notifications ul');

    currentElections.forEach(election => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="election-item">
                <img src="bjp.png" alt="BJP Logo" class="party-logo">
                <img src="congress.png" alt="Congress Logo" class="party-logo">
                <div class="election-details">
                    <h3>${election.title}</h3>
                    <p>${election.description}</p>
                    <button class="vote-button" onclick="vote('BJP')">Vote BJP</button>
                    <button class="vote-button" onclick="vote('CONGRESS')">Vote Congress</button>
                </div>
            </div>
        `;
        currentElectionsList.appendChild(li);
    });

    upcomingElections.forEach(election => {
        const li = document.createElement('li');
        li.textContent = `${election.title}: ${election.description} (Starts on: ${election.startDate})`;
        upcomingElectionsList.appendChild(li);
    });

    pastElections.forEach(election => {
        const li = document.createElement('li');
        li.textContent = `${election.title}: ${election.description} (Result: ${election.result})`;
        pastElectionsList.appendChild(li);
    });

    notifications.forEach(notification => {
        const li = document.createElement('li');
        li.textContent = notification.message;
        notificationsList.appendChild(li);
    });

    const userName = sessionStorage.getItem('username');
    console.log(userName);
    document.getElementById('user-name').innerHTML = userName;
    const state = sessionStorage.getItem('state');
    console.log(state);
});

async function vote(party) {
    const voterId = sessionStorage.getItem('voter-id');
    console.log('Retrieved Voter ID:', voterId); // Log the retrieved voter ID

    if (!voterId) {
        alert('User information is missing. Please log in again.');
        return;
    }

    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];

    console.log(`Voting for ${party} by voter ID ${voterId}`);

    // Initialize the Voting contract
    const contractABI = [
        {
            "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "voters",
      "outputs": [
        {
          "internalType": "string",
          "name": "voterid",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "party",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_voterid",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_party",
          "type": "string"
        }
      ],
      "name": "vote",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_voter",
          "type": "address"
        }
      ],
      "name": "getVoter",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ];

    const contractAddress = '0xE5311d0cfA45e2ECb3B23d288A1adD6d25CAE726'; 
    const Voting = new web3.eth.Contract(contractABI, contractAddress);

    try {
        const voter = await Voting.methods.getVoter(account).call();
        if (voter[0]) {
            alert('You have already voted.');
            return;
        }

        await Voting.methods.vote(voterId, party).send({ from: account, gas: 3000000 });
        alert(`You voted for ${party}!`);
        console.log("vote transferred")
    } catch (error) {
        console.error('Error submitting vote:', error);
        alert('There was an error submitting your vote. Please try again.');
    }
}