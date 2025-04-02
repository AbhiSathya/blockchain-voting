import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Card, Alert, Spinner } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import { BlockchainContext } from "../../providers/BlockChainProvider";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// ✅ Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const LiveMonitoring = () => {
  const { contractInstance } = useContext(BlockchainContext); // Get smart contract instance
  const [electionName, setElectionName] = useState("");
  const [electionDesc, setElectionDesc] = useState("");
  const [electionInitialized, setElectionInitialized] = useState(false);
  const [totalVoters, setTotalVoters] = useState(0);
  const [registeredVoters, setRegisteredVoters] = useState(0);
  const [verifiedVoters, setVerifiedVoters] = useState(0);
  const [votedVoters, setVotedVoters] = useState(0);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchElectionDetails = async () => {
      if (!contractInstance) {
        setError("Smart contract not connected. Please check your connection.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Fetching election details
        const summary = await contractInstance.methods.electionDetails().call();
        
        // Check if election is initialized (Assuming empty name means not initialized)
        if (!summary[0] || summary[0] === "") {
          setElectionInitialized(false);
          setLoading(false);
          return;
        } else {
          setElectionInitialized(true);
        }

        const totalVotersCount = await contractInstance.methods.getTotalVoter().call();
        const registeredCount = await contractInstance.methods.getRegisteredVoterCount().call();
        const verifiedCount = await contractInstance.methods.getVerifiedVoterCount().call();
        const votedCount = await contractInstance.methods.getVotedVoterCount().call();
        const candidatesData = await contractInstance.methods.getCandidates().call();

        // Update state
        setElectionName(summary[0]);
        setElectionDesc(summary[1]);
        setTotalVoters(parseInt(totalVotersCount));
        setRegisteredVoters(parseInt(registeredCount));
        setVerifiedVoters(parseInt(verifiedCount));
        setVotedVoters(parseInt(votedCount));

        setCandidates(
          candidatesData.map((candidate) => ({
            name: candidate.candidateName,
            votes: parseInt(candidate.voteCount),
          }))
        );

      } catch (err) {
        console.error("Error fetching election details:", err);
        setError("Failed to load election data. Please check your network or try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchElectionDetails();
    const interval = setInterval(fetchElectionDetails, 10000); // Auto-refresh every 10 seconds
    return () => clearInterval(interval);
  }, [contractInstance]);

  const data = {
    labels: candidates.map((c) => c.name),
    datasets: [
      {
        label: "Vote Counts",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
        hoverBackgroundColor: "rgba(54, 162, 235, 0.7)",
        hoverBorderColor: "rgba(54, 162, 235, 1)",
        data: candidates.map((c) => c.votes),
      },
    ],
  };

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100">
      {loading && (
        <Spinner animation="border" role="status" className="mb-3">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}

      {error && (
        <Alert variant="danger" className="w-75 text-center">
          {error}
        </Alert>
      )}

      {!loading && !error && !electionInitialized && (
        <Alert variant="warning" className="w-75 text-center">
          🚨 Election not initialized. Please create an election.
        </Alert>
      )}

      {!loading && !error && electionInitialized && (
        <>
          <Row className="w-100 justify-content-center">
            <Col md={10} className="text-center">
              <Card className="shadow-lg p-4 mb-4 bg-white rounded">
                <Card.Body>
                  <h2 className="text-primary">{electionName}</h2>
                  <p className="text-muted">{electionDesc}</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Voter Statistics */}
          <Row className="w-100 justify-content-center">
            <Col md={3}>
              <Card className="shadow-sm p-3 bg-light rounded text-center">
                <Card.Body>
                  <h5>Registered Voters</h5>
                  <h3>{registeredVoters}</h3>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="shadow-sm p-3 bg-light rounded text-center">
                <Card.Body>
                  <h5>Verified Voters</h5>
                  <h3>{verifiedVoters}</h3>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="shadow-sm p-3 bg-light rounded text-center">
                <Card.Body>
                  <h5>People Who Voted</h5>
                  <h3>{votedVoters}</h3>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Live Vote Monitoring */}
          <Row className="w-100 justify-content-center mt-4">
            <Col md={8}>
              {candidates.length > 0 ? (
                <Card className="shadow-lg p-4 bg-white rounded">
                  <Card.Body>
                    <Bar data={data} key={JSON.stringify(data)} />
                  </Card.Body>
                </Card>
              ) : (
                <Card className="text-center shadow-lg p-4 bg-light rounded">
                  <Card.Body>
                    <Card.Title>No candidates available</Card.Title>
                    <Card.Text>Please add candidates to the election.</Card.Text>
                  </Card.Body>
                </Card>
              )}
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default LiveMonitoring;
