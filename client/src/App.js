
import './App.css';
import Proveedores from './Pages/proveedores';
import Bienvenida from './Pages/bienvenida';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Link, Route, Routes, Switch } from 'react-router-dom';
import { Container, Navbar } from 'react-bootstrap';
import logo from './img/logo.png';

function App() {

  return (
    <Container>
      <BrowserRouter>
        <Navbar bg='dark' data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="#home">
              <img
                alt=""
                src={logo}
                style={{ height: null, width: null }}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{' '}
              e-Commerce Gapsi
            </Navbar.Brand>
          </Container>
        </Navbar>
        <br></br>
        <Routes>
          <Route exact path="/" element={<Bienvenida></Bienvenida>}></Route>
          <Route exact path="/proveedores" element={<Proveedores></Proveedores>}>
          </Route>
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
