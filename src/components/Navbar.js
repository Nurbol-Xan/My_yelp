import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

export default function YelpNavbar({signOut}){
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container >
            <Navbar.Brand bg="light" fixed="bottom">My Yelp</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                <Button onClick={signOut}>Sign Out</Button>
                </Navbar.Text>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}