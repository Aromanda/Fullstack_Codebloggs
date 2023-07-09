import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";

// Component for displaying a single record in the table
const Record = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  function onEdit(e) {
    e.preventDefault();
    setShowModal(true);
  }

  function onDelete(e) {
    e.preventDefault();
    setShowDeleteModal(true);
  }

  function confirmEdit() {
    window.location = `/admin/edit/${props.record._id}`;
  }

  return (
    <tr>
      <td>{props.record.first_name}</td>
      <td>{props.record.last_name}</td>
      <td>{props.record.region}</td>
      <td>{props.record.rating}</td>
      <td>{props.record.fee}</td>
      <td>{props.record.sales}</td>
      <td>
        {/* Edit link */}
        <Button variant="link" onClick={onEdit}>Edit</Button> |
        {/* Delete button */}
        <Button variant="link" onClick={onDelete}>Delete</Button>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Action</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to edit this record?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              No/Back
            </Button>
            <Button variant="primary" onClick={() => { confirmEdit(); setShowModal(false); }}>
              Yes/Confirm
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Action</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this record?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
              No/Back
            </Button>
            <Button variant="primary" onClick={() => { props.deleteRecord(props.record._id); setShowDeleteModal(false); }}>
              Yes/Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      </td>
    </tr>
  );
};

export default function RecordList() {
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();

  // Fetch records from the database when the component mounts
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5050/record/`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      setRecords(records);
    }

    getRecords();

    // Clean up function (no dependencies)
    return;
  }, [records.length]);

  // Delete a record
  async function deleteRecord(id) {
    await fetch(`http://localhost:5050/record/${id}`, {
      method: "DELETE"
    });

    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  // Map the records to the table rows
  function recordList() {
    return records.map((record) => {
      return (
        <Record
          record={record}
          deleteRecord={(id) => deleteRecord(id)}
          key={record._id}
        />
      );
    });
  }

  // This following section will display the table with the records of individuals.
  return (
    <div>
      <h3 style={{ fontStyle: 'italic', color: '#0a65a0', fontSize: '30px' }}>list of agents</h3>
      <button onClick={() => navigate('/create')} className="btn btn-primary">Create User</button>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th style={{ fontStyle: 'italic', color: '#0a65a0', fontSize: '18px' }}>First Name</th>
            <th style={{ fontStyle: 'italic', color: 'red', fontSize: '18px' }}>Last Name</th>
            <th style={{ fontStyle: 'italic', color: '#0a65a0', fontSize: '18px' }}>Region</th>
            <th style={{ fontStyle: 'italic', color: 'red', fontSize: '18px' }}>Rating</th>
            <th style={{ fontStyle: 'italic', color: '#0a65a0', fontSize: '18px' }}>Fee</th>
            <th style={{ fontStyle: 'italic', color: 'red', fontSize: '18px' }}>Sales</th>
            <th style={{ fontStyle: 'italic', color: 'red', fontSize: '18px' }}>Action</th>
          </tr>
        </thead>
        <tbody>{recordList()}</tbody>
      </table>
    </div>
  );
}
