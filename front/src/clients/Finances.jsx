import { useState, useEffect, useMemo } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Form,
  Modal,
  Card,
} from "react-bootstrap";

const API_BASE = "http://localhost:3000";

export default function Finances() {
  const [finances, setFinances] = useState([]);
  const [filters, setFilters] = useState({
    is_paid: "",
    description: "",
    min_amount: "",
    max_amount: "",
    start_date: "",
    end_date: "",
    month: "",
    year: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [editingFinance, setEditingFinance] = useState(null);
  const [formData, setFormData] = useState({
    amount: "",
    is_paid: false,
    type: "",
    description: "",
  });

  useEffect(() => {
    const fetchFinances = async () => {
      const query = new URLSearchParams(filters).toString();
      const response = await fetch(`${API_BASE}/finances?${query}`);
      const data = await response.json();
      setFinances(data);
    };
    fetchFinances();
  }, [filters]);

  const fetchFinances = async () => {
    const query = new URLSearchParams(filters).toString();
    const response = await fetch(`${API_BASE}/finances?${query}`);
    const data = await response.json();
    setFinances(data);
  };

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters({
      ...filters,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleCreate = async () => {
    if (!formData.amount || !formData.description.trim()) {
      alert("Por favor, preencha o valor e a descrição");
      return;
    }
    try {
      await fetch(`${API_BASE}/finances`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parseFloat(formData.amount),
          type: formData.type,
          description: formData.description,
        }),
      });
      setShowModal(false);
      resetForm();
      fetchFinances();
    } catch (err) {
      console.error("Erro ao criar finança:", err);
      alert("Erro ao criar finança");
    }
  };

  const handleUpdate = async () => {
    if (!formData.amount || !formData.description.trim()) {
      alert("Por favor, preencha o valor e a descrição");
      return;
    }
    try {
      await fetch(`${API_BASE}/finances/${editingFinance.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parseFloat(formData.amount),
          type: formData.type,
          description: formData.description,
        }),
      });
      setShowModal(false);
      resetForm();
      fetchFinances();
    } catch (err) {
      console.error("Erro ao atualizar finança:", err);
      alert("Erro ao atualizar finança");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja deletar esta finança?")) {
      try {
        await fetch(`${API_BASE}/finances/${id}`, { method: "DELETE" });
        fetchFinances();
      } catch (err) {
        console.error("Erro ao deletar finança:", err);
        alert("Erro ao deletar finança");
      }
    }
  };

  const openCreateModal = () => {
    setEditingFinance(null);
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (finance) => {
    setEditingFinance(finance);
    setFormData({
      amount: finance.amount.toString(),
      is_paid: finance.is_paid || false,
      type: finance.type || "",
      description: finance.description || "",
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      amount: "",
      is_paid: false,
      type: "",
      description: "",
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount);
  };

  const incomeFinances = useMemo(
    () => finances.filter((finance) => finance.type === "income"),
    [finances],
  );

  const expenseFinances = useMemo(
    () => finances.filter((finance) => finance.type === "expense"),
    [finances],
  );

  return (
    <Container>
      <h1>Finanças</h1>
      <Row className="mb-3">
        <Col>
          <Button variant="primary mt-2" onClick={openCreateModal}>
            Adicionar Gasto/Receita
          </Button>
        </Col>
      </Row>
      <h3>Filtros</h3>
      <Row className="mb-3">
        <Col md={2}>
          <Form.Select
            name="month"
            value={filters.month}
            onChange={handleFilterChange}
          >
            <option value="">Todos os meses</option>
            <option value="1">Janeiro</option>
            <option value="2">Fevereiro</option>
            <option value="3">Março</option>
            <option value="4">Abril</option>
            <option value="5">Maio</option>
            <option value="6">Junho</option>
            <option value="7">Julho</option>
            <option value="8">Agosto</option>
            <option value="9">Setembro</option>
            <option value="10">Outubro</option>
            <option value="11">Novembro</option>
            <option value="12">Dezembro</option>
          </Form.Select>
        </Col>
        <Col md={2}>
          <Form.Control
            type="number"
            placeholder="Ano"
            name="year"
            value={filters.year}
            onChange={handleFilterChange}
            min="2000"
            max={new Date().getFullYear() + 1}
          />
        </Col>
      </Row>
      <hr />
      {/* <Row className="mb-3">
        <Col md={2}>
          <Form.Label>Data Início</Form.Label>
          <Form.Control
            type="date"
            placeholder="Data Inicial"
            name="start_date"
            value={filters.start_date}
            onChange={handleFilterChange}
          />
        </Col>
        <Col md={2}>
          <Form.Label>Data Fim</Form.Label>
          <Form.Control
            type="date"
            placeholder="Data Final"
            name="end_date"
            value={filters.end_date}
            onChange={handleFilterChange}
          />
        </Col>
      </Row> */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th
              className="text-success"
              style={{ fontSize: "1.5rem", borderRight: "none" }}
            >
              RECEITA
            </th>
          </tr>
        </thead>
        <tbody>
          {incomeFinances.map((finance) => (
            <tr key={finance.id} className="align-middle" height={"5vh"}>
              <td className="align-middle">{finance.description}</td>
              <td className="text-success fw-bold align-middle">
                {formatCurrency(finance.amount)}
              </td>
              <td className="text-end">
                {new Date(finance.created_at).toLocaleDateString("pt-BR")}
                <div
                  className="justify-content-end"
                  style={{ display: "flex", gap: "5px", marginTop: "5px" }}
                >
                  <div>
                    <Button
                      variant="outline-warning"
                      onClick={() => openEditModal(finance)}
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
                      onClick={() => handleDelete(finance.id)}
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
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th
              className="text-danger"
              style={{ fontSize: "1.5rem", borderRight: "none" }}
            >
              GASTOS
            </th>
          </tr>
        </thead>
        <tbody>
          {expenseFinances.map((finance) => (
            <tr key={finance.id} className="align-middle" height={"5vh"}>
              <td className="align-middle">{finance.description}</td>
              <td className="text-danger fw-bold align-middle">
                -{formatCurrency(finance.amount)}
              </td>
              <td className="text-end">
                {new Date(finance.created_at).toLocaleDateString("pt-BR")}
                <div
                  className="justify-content-end"
                  style={{ display: "flex", gap: "5px", marginTop: "5px" }}
                >
                  <div>
                    <Button
                      variant="outline-warning"
                      onClick={() => openEditModal(finance)}
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
                      onClick={() => handleDelete(finance.id)}
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
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header
          closeButton
          className={
            formData.type === "income"
              ? "bg-success"
              : formData.type === "expense"
                ? "bg-danger"
                : "bg-light"
          }
        >
          <Modal.Title>
            {editingFinance ? "Editar Finança" : "Adicionar Finança"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Receita / Despesa ?</Form.Label>
              <Form.Select
                name="type"
                value={formData.type}
                onChange={handleFormChange}
              >
                <option value="">Selecione o tipo</option>
                <option value="income">Receita</option>
                <option value="expense">Despesa</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Valor</Form.Label>
              <Row>
                {formData.type !== "" ? (
                  <Col md={1} className="pe-0">
                    <Card
                      style={{
                        width: "100%",
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "6px 0px 0px 6px",
                      }}
                      className="bg-success border-0 p-0"
                      className={
                        formData.type === "income"
                          ? "bg-success"
                          : formData.type === "expense"
                            ? "bg-danger"
                            : "bg-light"
                      }
                    >
                      <img
                        src="/plus.png"
                        src={
                          formData.type === "income"
                            ? "/plus.png"
                            : formData.type === "expense"
                              ? "/minus.png"
                              : "/plus.png"
                        }
                        style={{
                          width: "80%",
                          height: "80%",
                          objectFit: "contain",
                        }}
                        alt="simbolo"
                      />
                    </Card>
                  </Col>
                ) : (
                  <div></div>
                )}
                <Col className={formData.type !== "" ? "ps-0" : ""}>
                  <Form.Control
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleFormChange}
                    step="0.01"
                    min="0"
                    required
                    style={
                      formData.type !== ""
                        ? {
                            borderRadius: "0px 6px 6px 0px",
                            borderLeft: "none",
                          }
                        : {}
                    }
                  />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
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
            onClick={editingFinance ? handleUpdate : handleCreate}
          >
            {editingFinance ? "Atualizar" : "Criar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
