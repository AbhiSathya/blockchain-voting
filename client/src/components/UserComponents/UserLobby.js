import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BlockchainContext } from "../../providers/BlockChainProvider";

const ElectionDetails = ({ name, description, onNavigate }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 text-center max-w-lg w-full">
      <h2 className="text-2xl font-bold text-gray-800">Election: {name}</h2>
      <p className="text-gray-600 mt-2">{description}</p>
      <button
        onClick={onNavigate}
        className="btn-primary mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-300"
      >
        Go to Voting Instructions
      </button>
    </div>
  );
};

const UserLobby = () => {
  const { contractInstance, initWeb3 } = useContext(BlockchainContext);
  const navigate = useNavigate();

  const [electionName, setElectionName] = useState(null);
  const [electionDescription, setElectionDescription] = useState(null);
  const [isElectionCreated, setIsElectionCreated] = useState(false);

  useEffect(() => {
    initWeb3(); // Ensures web3 is initialized when the component mounts
  }, []);

  useEffect(() => {
    const fetchElectionDetails = async () => {
      if (!contractInstance) return;

      try {
        const details = await contractInstance.methods.electionDetails().call();

        if (details.electionName) {
          setElectionName(details.electionName);
          setElectionDescription(details.description);
          setIsElectionCreated(true);
        } else {
          setIsElectionCreated(false);
        }
      } catch (error) {
        console.error("Error fetching election details:", error);
      }
    };
    if (contractInstance) fetchElectionDetails();
  }, [contractInstance]);

  return (
    <div className="position-absolute top-50 start-50 translate-middle w-100 bg-light">
      <div className="container">
        {isElectionCreated ? (
          <ElectionDetails
            name={electionName}
            description={electionDescription}
            onNavigate={() => navigate("/user_panel")}
          />
        ) : (
          <div className="shadow-lg rounded-lg p-1 text-center bg-white w-100">
            <h3 className="text-xl font-semibold text-gray-800">
              No active election found.
            </h3>
          </div>
        )}
      </div>
    </div>
  );
  
  
  
};

export default UserLobby;
