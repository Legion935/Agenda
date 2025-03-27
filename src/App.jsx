import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 600px;
  margin: auto;
  padding: 20px;
  background-color: #2c3e50;
  color: white;
  border-radius: 10px;
`;

const Button = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px;
  margin: 5px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #2980b9;
  }
`;

const Input = styled.input`
  width: 95%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: none;
`;

const Contact = styled.div`
  border-bottom: 1px solid gray;
  align-self: stretch;
  padding: 10px;
  background-color: #34495e;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px;
  background-color: #1f2a36;
  border-radius: 10px;
  margin-bottom: 15px;
  width: 95%;
`;

const App = () => {
  const [contacts, setContacts] = useState([
    { nombre: "Miguel", apellidos: "Montoya", edad: 22, telefonos: ["1234567890"] },
    { nombre: "Poio", apellidos: "Vázquez", edad: 25, telefonos: ["0987654321"] }
  ]);

  const [search, setSearch] = useState("");
  const [newContact, setNewContact] = useState({ nombre: "", apellidos: "", edad: "", telefonos: "" });

  const handleChange = (e) => {
    setNewContact({ ...newContact, [e.target.name]: e.target.value });
  };

  const addContact = () => {
    if (!newContact.nombre || !newContact.apellidos || !newContact.edad || !newContact.telefonos) return;
    setContacts([...contacts, { ...newContact, edad: parseInt(newContact.edad), telefonos: newContact.telefonos.split(" ") }]);
    setNewContact({ nombre: "", apellidos: "", edad: "", telefonos: "" });
  };

  const deleteContact = (nombre) => {
    setContacts(contacts.filter((contact) => contact.nombre !== nombre));
  };

  const editContact = (index) => {
    const updatedName = prompt("Nuevo nombre:", contacts[index].nombre);
    const updatedLastName = prompt("Nuevos apellidos:", contacts[index].apellidos);
    const updatedAge = prompt("Nueva edad:", contacts[index].edad);
    const updatedPhones = prompt("Nuevos teléfonos separados por espacio:", contacts[index].telefonos.join(" "));
    
    const updatedContacts = [...contacts];
    updatedContacts[index] = {
      nombre: updatedName,
      apellidos: updatedLastName,
      edad: parseInt(updatedAge),
      telefonos: updatedPhones.split(" ")
    };
    setContacts(updatedContacts);
  };

  const filteredContacts = contacts.filter((c) => c.nombre.toLowerCase().includes(search.toLowerCase()));

  return (
    <Container>
      <h2>Agenda de Contactos</h2>
      <Input
        type="text"
        placeholder="Buscar por nombre..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Form>
        <Input type="text" name="nombre" placeholder="Nombre" value={newContact.nombre} onChange={handleChange} />
        <Input type="text" name="apellidos" placeholder="Apellidos" value={newContact.apellidos} onChange={handleChange} />
        <Input type="number" name="edad" placeholder="Edad" value={newContact.edad} onChange={handleChange} />
        <Input type="text" name="telefonos" placeholder="Teléfonos (separados por espacio)" value={newContact.telefonos} onChange={handleChange} />
        <Button onClick={addContact}>Agregar Contacto</Button>
      </Form>
      {filteredContacts.map((contact, index) => (
        <Contact key={index}>
          <p>
            <strong>{contact.nombre} {contact.apellidos}</strong>
          </p>
          <p>Edad: {contact.edad}</p>
          <p>Teléfonos: {contact.telefonos.join(", ")}</p>
          <Button onClick={() => editContact(index)}>Modificar</Button>
          <Button onClick={() => deleteContact(contact.nombre)}>Eliminar</Button>
        </Contact>
      ))}
    </Container>
  );
};

export default App;
