import { Button, Modal } from "react-bootstrap";

export default function DatabaseBackupModal({ show, onClose }) {
  const API_BASE = "http://localhost:3000";

  async function handleBackup() {
    try {
      await fetch(`${API_BASE}/backup`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        query: { pathFile: "backup.sql" },
      });
    } catch (err) {
      console.error("Erro ao atualizar finança:", err);
      alert("Erro ao atualizar finança");
    }
  }

  async function handleRestore() {
    try {
      await fetch(`${API_BASE}/restore`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        query: { pathFile: "backup.sql" },
      });
    } catch (err) {
      console.error("Erro ao restaurar banco de dados:", err);
      alert("Erro ao restaurar banco de dados");
    }
  }

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Backup e Restauração</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Button onClick={() => handleBackup()}>Backup</Button>
        <Button onClick={() => handleRestore()}>Restaurar</Button>
      </Modal.Body>
    </Modal>
  );
}
