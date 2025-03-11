import perfil from '../img/perfil.png';
import { useState, useEffect } from 'react';
import Axios from 'axios'; import '../App.css';
import { Alert, Button, Card, Container, Form, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, Route, Routes } from 'react-router-dom';
import { DataScroller } from 'primereact/datascroller';



function Proveedores() {
    const [id, setId] = useState('0');
    const [nombre, setNombre] = useState('');
    const [rfc, setRfc] = useState('');
    const [direccion, setDireccion] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [variant, setVariant] = useState('');
    const [listaProveedores, setListaProveedores] = useState([])
    const [nuevo, setNuevo] = useState(true)
    const [show, setShow] = useState(false);;
    const [validated, setValidated] = useState(false);



    useEffect(() => {
        LoadData()
    }, [])

    const LoadData = () => {
        ObtenerProveedores()

    }
    const limpiarDatos = () => {
        setId('');
        setNombre('');
        setRfc('');
        setDireccion('');
        setNuevo(true);
        setValidated(false);

    }
    const ObtenerProveedores = () => {
        Axios.get("http://localhost:3007/")
            .then(response => {
                setListaProveedores(response.data.proveedores);
                limpiarDatos()
            })
            .catch(error => {
                console.log(error);
            });
    }
    const validatedForm = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    }
    const registrar = (event) => {
        validatedForm(event)
        if (nombre !== '') {
            if (nuevo) {
                Axios.post("http://localhost:3007/", { nombre, rfc, direccion })
                    .then(response => {
                        console.log(response);

                        if (response.status === 201) {
                            LoadData()
                            handleClose()
                        }
                    })
                    .catch(error => {
                        setMensaje(error.response.data)
                    });
            } else {
                Axios.put(`http://localhost:3007/${id}`, { nombre, rfc, direccion })
                    .then(response => {
                        if (response.status === 200) {
                            LoadData()
                            handleClose()
                        }
                    })
                    .catch(error => {
                        setMensaje(error.response.data)
                    });
            }
        } else {
            setMensaje("Ingrese un nombre");
            setVariant('info')
        }
    }
    const eliminarRol = (id) => {
        console.log("ENTRO AQUI");
        Axios.delete(`http://localhost:3007/${id}`)
            .then(response => {
                if (response.status === 204) {
                    LoadData()
                    handleClose();
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    const editarRol = (id) => {
        Axios.get(`http://localhost:3007/${id}`)
            .then(response => {
                if (response.status === 200) {
                    setNuevo(false)
                    setId(response.data[0].id)
                    setNombre(response.data[0].nombre)
                    setRfc(response.data[0].rfc)
                    setDireccion(response.data[0].direccion)
                    setShow(true)
                }
            })
            .catch(error => {
                alert(error);
            });
    }

    const handleClose = () => {
        setShow(false)
        LoadData()
    };
    const handleShow = () => setShow(true);



    const itemTemplate = (data) => {
        return (
            <table className='table table-striped table'>
                <tbody>
                    <tr key={data.id}>
                        <td className='w-50 p-3'>{data.nombre}</td>
                        <td className='w-25 p-3'>{data.rfc}</td>
                        <td className='w-25 p-3'>{data.direccion}</td>
                        <td className='w-auto p-3'><button className='btn btn-danger' onClick={() => { eliminarRol(data.id) }}>Eliminar</button></td>
                        <td className='w-auto p-3'><button className='btn btn-warning' onClick={() => { editarRol(data.id) }}>Editar</button></td>
                    </tr>
                </tbody>
            </table>
        );
    };
    const headerText = <table className='table table-striped table'><thead><tr>
        <th className='w-25 p-3'>Descripcion</th>
        <th className='w-25 p-3'>RFC</th>
        <th className='w-25 p-3'>DIRECCIÒN</th>
        <th className='w-auto p-3'> </th>
        <th className='w-auto p-3'></th>
    </tr></thead> </table>
    return (
        <Container>
            <Card>
                <Card.Header className='float-end'>
                    <button className='btn btn-success float-end' onClick={handleShow}>Agregar</button>
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        <DataScroller value={listaProveedores} itemTemplate={itemTemplate} rows={5} inline scrollHeight='250px' header={headerText} />
                    </Card.Text>
                </Card.Body>
            </Card>


            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form validated={validated}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nombre" required={true}
                                autoFocus value={nombre} onChange={(change) => { setNombre(change.target.value) }}
                            />
                            <Form.Control.Feedback>{mensaje}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>RFC</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="RFC"
                                value={rfc} onChange={(change) => { setRfc(change.target.value) }}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Direccion</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Direccion"
                                value={direccion} onChange={(change) => { setDireccion(change.target.value) }}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant="primary" type='submit' onClick={registrar}>
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );

}

export default Proveedores;