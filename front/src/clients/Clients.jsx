import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Form,
  Modal,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:3000";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    start_date: "",
    end_date: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const fetchClients = async () => {
    const query = new URLSearchParams(filters).toString();
    const response = await fetch(`${API_BASE}/clients?${query}`);
    const data = await response.json();
    setClients(data);
  };

  useEffect(() => {
    const fetchClients = async () => {
      const query = new URLSearchParams(filters).toString();
      const response = await fetch(`${API_BASE}/clients?${query}`);
      const data = await response.json();
      setClients(data);
    };
    fetchClients();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreate = async () => {
    await fetch(`${API_BASE}/clients`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    fetchClients();
    setShowModal(false);
    resetForm();
  };

  const handleUpdate = async () => {
    await fetch(`${API_BASE}/clients/${editingClient.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    fetchClients();
    setShowModal(false);
    resetForm();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja deletar este cliente?")) {
      await fetch(`${API_BASE}/clients/${id}`, { method: "DELETE" });
      fetchClients();
    }
  };

  const openCreateModal = () => {
    setEditingClient(null);
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (client) => {
    setEditingClient(client);
    setFormData({
      name: client.name,
      email: client.email,
      phone: client.phone || "",
      address: client.address || "",
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
    });
  };

  return (
    <Container>
      <h1>Clientes</h1>
      <Row className="mb-3">
        <Col>
          <Button variant="primary mt-2" onClick={openCreateModal}>
            Adicionar Cliente
          </Button>
        </Col>
      </Row>
      <h3>Filtros</h3>
      <Row className="mb-3">
        <Col md={2}>
          <Form.Control
            type="text"
            placeholder="Nome"
            name="name"
            value={filters.name}
            onChange={handleFilterChange}
          />
        </Col>
        <Col md={2}>
          <Form.Control
            type="email"
            placeholder="Email"
            name="email"
            value={filters.email}
            onChange={handleFilterChange}
          />
        </Col>
        <Col md={2}>
          <Form.Control
            type="text"
            placeholder="Telefone"
            name="phone"
            value={filters.phone}
            onChange={handleFilterChange}
          />
        </Col>
        <Col md={2}>
          <Form.Control
            type="text"
            placeholder="Endereço"
            name="address"
            value={filters.address}
            onChange={handleFilterChange}
          />
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Endereço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td>{client.name}</td>
              <td>{client.email}</td>
              <td>{client.phone}</td>
              <td>{client.address}</td>
              <td>
                <div
                  className="justify-content-end"
                  style={{ display: "flex", gap: "5px", marginTop: "5px" }}
                >
                  <div>
                    <Button
                      variant="outline-warning"
                      onClick={() => openEditModal(client)}
                    >
                      <img
                        src="/edit.png"
                        alt="Editar"
                        style={{
                          width: "25px",
                          height: "25px",
                          objectFit: "contain",
                        }}
                      />
                    </Button>
                  </div>
                  <div>
                    <Button
                      variant="outline-danger"
                      onClick={() => handleDelete(client.id)}
                    >
                      <img
                        src="/bin.png"
                        alt="Deletar"
                        style={{
                          width: "25px",
                          height: "25px",
                          objectFit: "contain",
                        }}
                      />
                    </Button>
                  </div>
                </div>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => openEditModal(client)}
                >
                  Editar
                </Button>{" "}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(client.id)}
                >
                  Deletar
                </Button>{" "}
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate(`/notes/${client.id}`)}
                >
                  Observações
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingClient ? "Editar Cliente" : "Adicionar Cliente"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Telefone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Endereço</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={formData.address}
                onChange={handleFormChange}
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
            onClick={editingClient ? handleUpdate : handleCreate}
          >
            {editingClient ? "Atualizar" : "Criar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
