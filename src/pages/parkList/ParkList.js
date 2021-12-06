import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Input, Form, Image } from "antd";
import "antd/dist/antd.css";
import { EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./parkList.css";
const { TextArea } = Input;
const axios = require("axios");
const { Item } = Form;

const baseUrl = "http://67.205.155.156:4500/api/parque";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

export default function ParkList() {
  const [data, setData] = useState([]);
  const [parks, setParks] = useState({
    idparque: "",
    nombre: "",
    latitud: "",
    longitud: "",
    descripcion: "",
  });

  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);

  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  };

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParks({ ...parks, [name]: value });
    console.log(parks);
  };

  const seleccionarParks = (parks, caso) => {
    setParks(parks);
    caso === "Editar" ? abrirCerrarModalEditar() : abrirCerrarModalEliminar();
  };

  const peticionGet = async () => {
    await axios
      .get(baseUrl)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const peticionPost = async () => {
    //delete artista.id;
    await axios
      .post(baseUrl, parks)
      .then((response) => {
        setData(data.concat(response.data));
        abrirCerrarModalInsertar();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const peticionPut = async () => {
    await axios
      .put(baseUrl + "/" + parks.idparque, parks)
      .then((response) => {
        var dataAuxiliar = data;
        dataAuxiliar.map((elemento) => {
          if (elemento.idparque === parks.idparque) {
            elemento.nombre = parks.nombre;
          }
        });
        setData(dataAuxiliar);
        abrirCerrarModalEditar();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const peticionDelete = async () => {
    await axios
      .delete(baseUrl + "/" + parks.idparque)
      .then((response) => {
        setData(
          data.filter((elemento) => elemento.idparque !== parks.idparque)
        );
        abrirCerrarModalEliminar();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    peticionGet();
  }, []);
  const columns = [
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "Latitud",
      dataIndex: "latitud",
      key: "latitud",
    },
    {
      title: "Longitud",
      dataIndex: "longitud",
      key: "longitud",
    },
    {
      title: "Descripcion",
      dataIndex: "descripcion",
      key: "descripcion",
    },

    {
      title: "Acciones",
      key: "acciones",
      render: (fila) => (
        <>
          <Button
            type="primary"
            onClick={() => seleccionarParks(fila, "Editar")}
          >
            Editar
          </Button>{" "}
          {"   "}
          <Button
            type="primary"
            danger
            onClick={() => seleccionarParks(fila, "Eliminar")}
          >
            Eliminar
          </Button>
        </>
      ),
    },
  ];
  return (
    <div className="parkList">
      <br />
      <h1>Parques</h1>
      <br />
      <Button
        type="primary"
        className="botonInsertar"
        onClick={abrirCerrarModalInsertar}
      >
        Insertar Nuevo Parque
      </Button>
      <br />
      <br />
      <Table
        locale={{ emptyText: "Cargando..." }}
        columns={columns}
        dataSource={data}
      />

      <Modal
        visible={modalInsertar}
        title="Insertar Parque"
        destroyOnClose={true}
        onCancel={abrirCerrarModalInsertar}
        centered
        footer={[
          <Button onClick={abrirCerrarModalInsertar}>Cancelar</Button>,
          <Button type="primary" onClick={peticionPost}>
            Insertar
          </Button>,
        ]}
      >
        <Form {...layout}>
          <Item label="Nombre">
            <Input name="nombre" onChange={handleChange} />
          </Item>
          <Item label="Latitud">
            <Input name="latitud" onChange={handleChange} />
          </Item>
          <Item label="Longitud">
            <Input name="longitud" onChange={handleChange} />
          </Item>

          <Item label="Descripcion">
            <TextArea name="descripcion" rows={4} onChange={handleChange} />
          </Item>
        </Form>
      </Modal>

      <Modal
        visible={modalEditar}
        title="Editar Parque"
        onCancel={abrirCerrarModalEditar}
        centered
        footer={[
          <Button onClick={abrirCerrarModalEditar}>Cancelar</Button>,
          <Button type="primary" onClick={peticionPut}>
            Editar
          </Button>,
        ]}
      >
        <Form {...layout}>
          <Item label="Nombre">
            <Input
              name="nombre"
              onChange={handleChange}
              value={parks && parks.nombre}
            />
          </Item>
          <Item label="Latitud">
            <Input
              name="latitud"
              onChange={handleChange}
              value={parks && parks.latitud}
            />
          </Item>
          <Item label="Longitud">
            <Input
              name="longitud"
              onChange={handleChange}
              value={parks && parks.longitud}
            />
          </Item>

          <Item label="Descripcion">
            <TextArea
              name="descripcion"
              rows={4}
              onChange={handleChange}
              value={parks && parks.descripcion}
            />
          </Item>
        </Form>
      </Modal>

      <Modal
        visible={modalEliminar}
        onCancel={abrirCerrarModalEliminar}
        centered
        footer={[
          <Button onClick={abrirCerrarModalEliminar}>No</Button>,
          <Button type="primary" danger onClick={peticionDelete}>
            Sí
          </Button>,
        ]}
      >
        Estás seguro que deseas eliminar el parque{" "}
        <b>{parks && parks.nombre}</b>?
      </Modal>
    </div>
  );
}
