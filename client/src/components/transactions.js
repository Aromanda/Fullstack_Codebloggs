import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const TransactionForm = () => {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState(0);
  const [selectedAgent, setSelectedAgent] = useState("");
  const [agents, setAgents] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5050/record/")
      .then((response) => response.json())
      .then((data) => setAgents(data))
      .catch((error) => console.error(error));

    fetchLast10Transactions();
  }, []);

  const fetchLast10Transactions = () => {
    fetch("http://localhost:5050/transaction-data")
      .then((response) => response.json())
      .then((data) => setTransactions(data))
      .catch((error) => console.error(error));
  };

  const handleAgentSelect = (event) => {
    const selectedAgentId = event.target.value;
    setSelectedAgent(selectedAgentId);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowModal(true);
  };

  const handleConfirm = () => {
    if (!amount || !selectedAgent) return;

    const agent = agents.find((agent) => agent._id === selectedAgent);

    const newTransaction = {
      amount: amount,
      agentId: agent._id,
      agentEmail: agent.email,
    };

    fetch("http://localhost:5050/transaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTransaction),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        fetchLast10Transactions();
        setAmount(0);
        setSelectedAgent("");
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setShowModal(false);
  };

  const handleClose = () => setShowModal(false);

  return (
    <div>
      <h2>Last 10 Transactions</h2>
      <ul>
        {transactions.map((transaction, index) => {
          const agent = agents.find(agent => agent._id === transaction.agentId);
          return (
            <li key={index}>
              Transaction {index + 1}: {transaction.amount} by 
              <br/> Agent's Email: {agent ? agent.email : 'Agent not found'}
            </li>
          );
        })}
      </ul>

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="transactionAmount">
          <Form.Label>Transaction amount:</Form.Label>
          <Form.Control
            type="number"
            min="0.01"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
          />
        </Form.Group>

        <Form.Group controlId="selectAgent">
          <Form.Label>Select Agent:</Form.Label>
          <Form.Control
            as="select"
            value={selectedAgent}
            onChange={handleAgentSelect}
          >
            <option value="">--Select an agent--</option>
            {agents.map((agent) => (
              <option key={agent._id} value={agent._id}>
                ID: {agent._id} - Email: {agent.email} - Sales: {agent.sales}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to create a transaction?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TransactionForm;
