import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Modal,
  Card,
} from "react-bootstrap";
import Note from "./Note.jsx";

const API_BASE = "http://localhost:3000";

export default function NotesPage() {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [client, setClient] = useState(null);
  const [filters, setFilters] = useState({
    start_date: "",
    end_date: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [formData, setFormData] = useState({
    content: "",
  });

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const response = await fetch(`${API_BASE}/clients/${clientId}`);
        const data = await response.json();
        setClient(data);
      } catch (err) {
        console.error("Erro ao buscar cliente:", err);
      }
    };
    fetchClientData();
  }, [clientId]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const query = new URLSearchParams({
          client_id: clientId,
          ...filters,
        }).toString();
        const response = await fetch(`${API_BASE}/notes?${query}`);
        const data = await response.json();
        setNotes(data);
      } catch (err) {
        console.error("Erro ao buscar notas:", err);
      }
    };
    fetchNotes();
    console.log("Fetch");
  }, [clientId, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreate = async () => {
    if (!formData.content.trim()) {
      alert("Por favor, preencha o conteúdo da nota");
      return;
    }
    try {
      await fetch(`${API_BASE}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_id: clientId,
          content: formData.content,
        }),
      });
      setShowModal(false);
      resetForm();
      const query = new URLSearchParams({
        client_id: clientId,
        ...filters,
      }).toString();
      const response = await fetch(`${API_BASE}/notes?${query}`);
      const data = await response.json();
      setNotes(data);
    } catch (err) {
      console.error("Erro ao criar nota:", err);
      alert("Erro ao criar nota");
    }
  };

  const handleUpdate = async () => {
    if (!formData.content.trim()) {
      alert("Por favor, preencha o conteúdo da nota");
      return;
    }
    try {
      await fetch(`${API_BASE}/notes/${editingNote.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setShowModal(false);
      resetForm();
      // Refetch notes
      const query = new URLSearchParams({
        client_id: clientId,
        ...filters,
      }).toString();
      const response = await fetch(`${API_BASE}/notes?${query}`);
      const data = await response.json();
      setNotes(data);
    } catch (err) {
      console.error("Erro ao atualizar nota:", err);
      alert("Erro ao atualizar nota");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja deletar esta nota?")) {
      try {
        await fetch(`${API_BASE}/notes/${id}`, { method: "DELETE" });
        // Refetch notes
        const query = new URLSearchParams({
          client_id: clientId,
          ...filters,
        }).toString();
        const response = await fetch(`${API_BASE}/notes?${query}`);
        const data = await response.json();
        setNotes(data);
      } catch (err) {
        console.error("Erro ao deletar nota:", err);
        alert("Erro ao deletar nota");
      }
    }
  };

  const openCreateModal = () => {
    setEditingNote(null);
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (note) => {
    setEditingNote(note);
    setFormData({
      content: note.content,
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      content: "",
    });
  };

  return (
    <Container>
      <Row className="mb-2">
        <Col>
          <Button variant="secondary mt-2" onClick={() => navigate("/clients")}>
            ← Voltar
          </Button>
        </Col>
      </Row>
      <Card>
        <Card.Body>
          <Card.Title>{client ? client.name : "Carregando..."}</Card.Title>
          <Card.Text className="text-muted">
            <Row>
              <Col md={3}>{client ? `Email: ${client.email}` : ""}</Col>
              <Col md={3}>{client ? `Telefone: ${client.phone}` : ""}</Col>
              <Col md={3}>{client ? `Endereço: ${client.address}` : ""}</Col>
            </Row>
          </Card.Text>
          <hr />
          <Button className="mb-2" variant="primary" onClick={openCreateModal}>
            Adicionar Nota
          </Button>
          <Row>
            <Col md={3}>
              <Form.Label>Data Início</Form.Label>
              <Form.Control
                type="date"
                placeholder="Data Inicial"
                name="start_date"
                value={filters.start_date}
                onChange={handleFilterChange}
              />
            </Col>
            <Col md={3}>
              <Form.Label>Data Final</Form.Label>
              <Form.Control
                type="date"
                placeholder="Data Final"
                name="end_date"
                value={filters.end_date}
                onChange={handleFilterChange}
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <div className="bg-light p-3">
        <Card className="">
          {notes.length === 0 ? (
            <p className="text-muted">Nenhuma nota encontrada.</p>
          ) : (
            notes.map((note) => (
              <Note
                key={note.id}
                note={note}
                onEdit={openEditModal}
                onDelete={handleDelete}
              />
            ))
          )}
        </Card>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingNote ? "Editar Nota" : "Adicionar Nota"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Conteúdo</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                name="content"
                value={formData.content}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={editingNote ? handleUpdate : handleCreate}
          >
            {editingNote ? "Atualizar" : "Criar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
