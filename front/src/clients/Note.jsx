import { Card, Button, Row, Col } from "react-bootstrap";

export default function Note({ note, onEdit, onDelete }) {
  return (
    <Card className="border-0 border-bottom p-0">
      <Card.Body className="pt-2">
        <Card.Title className="text-muted small p-0">
          <Row className="align-items-center">
            <Col>
              - {new Date(note.created_at).toLocaleDateString("pt-BR")} -
            </Col>
            <Col className="text-end align-middle d-flex justify-content-end gap-2">
              <Button
                variant="outline-warning"
                size="sm"
                onClick={() => onEdit(note)}
              >
                <img src="/edit.png" alt="Editar" width={"13px"} />
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => onDelete(note.id)}
              >
                <img src="/bin.png" alt="Deletar" width={"13px"} />
              </Button>
            </Col>
          </Row>
        </Card.Title>
        <Card.Text style={{ whiteSpace: "pre-wrap" }}>{note.content}</Card.Text>
        <div className="d-flex gap-2"></div>
      </Card.Body>
    </Card>
  );
}
