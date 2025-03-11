import '../css/custom.css'
import { Button, Card, Container } from "react-bootstrap";
import { Link } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css';
import perfil from '../img/perfil.png';


function bienvenida() {
    return (
        <Container>
            <Card style={{ width: '18rem', margin: '0 auto' }}>
                <Card.Header>
                    e-Commerce Gapsi
                </Card.Header>
                <Card.Body>
                    <Card.Img variant="top" src={perfil} />
                    <Card.Title></Card.Title>
                    <Card.Text className='text-center'>
                        Bienvenido Candidato 01
                    </Card.Text>
                </Card.Body>
                <Card.Footer className='text-center'>
                    <Link to="/proveedores" className="btn btn-primary"><Button variant="primary">Continuar </Button></Link>
                </Card.Footer>
            </Card>
        </Container>
    )
}

export default bienvenida;