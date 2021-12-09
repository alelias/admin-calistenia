import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Input, Form, Select } from "antd";
import "antd/dist/antd.css";
import { EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./routineList.css";
const axios = require("axios");
const { Item } = Form;
const { Option } = Select;
const { TextArea } = Input;

const baseUrl = "https://back-calistenia.herokuapp.com/api/rutina";
const baseUrlDif = "https://back-calistenia.herokuapp.com/api/dificultad";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

export default function RoutineList() {
  const [data, setData] = useState([]);
  const [dataDif, setDataDif] = useState([]);
  const [routines, setRoutines] = useState({
    idrutina: "",
    nombre: "",
    descripcion: "",
    link: "",
    dificultade: {
      iddificultad: "",
      nombre: "",
    },
  });

  const [dificultad, setDificultad] = useState({
    iddificultad: "",
    nombre: "",
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
    setRoutines({ ...routines, [name]: value });
    console.log(routines);
  };

  const handleChangeDif = (e) => {
    const { name, value } = e.target;
    setDificultad({ ...dificultad, [name]: value });
    console.log(dificultad);
  };

  const handleChangeEje = (value) => {
    console.log(`selected ${value}`);
  };

  const seleccionarRoutines = (routines, caso) => {
    setRoutines(routines);
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

  const peticionGetDif = async () => {
    await axios
      .get(baseUrlDif)
      .then((response) => {
        setDataDif(response.dataDif);
        console.log(dataDif);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const peticionPost = async () => {
    //delete artista.id;
    await axios
      .post(baseUrl, routines)
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
      .put(baseUrl + "/" + routines.idrutina, routines)
      .then((response) => {
        var dataAuxiliar = data;
        dataAuxiliar.map((elemento) => {
          if (elemento.idrutina === routines.idrutina) {
            elemento.nombre = routines.nombre;
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
      .delete(baseUrl + "/" + routines.idrutina)
      .then((response) => {
        setData(
          data.filter((elemento) => elemento.idrutina !== routines.idrutina)
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

  useEffect(() => {
    peticionGetDif();
  }, []);

  const columns = [
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "Descripcion",
      dataIndex: "descripcion",
      key: "descripcion",
      width: 280,
    },
    {
      title: "Link",
      dataIndex: "link",
      key: "link",
      width: 150,
    },
    {
      title: "Dificultad",
      dataIndex: ["dificultade", "nombre"],
      key: "iddificultad",
    },
    {
      title: "Acciones",
      key: "acciones",
      render: (fila) => (
        <>
          <Button
            type="primary"
            onClick={() => seleccionarRoutines(fila, "Editar")}
          >
            Editar
          </Button>{" "}
          {"   "}
          <Button
            type="primary"
            danger
            onClick={() => seleccionarRoutines(fila, "Eliminar")}
          >
            Eliminar
          </Button>
        </>
      ),
    },
  ];
  return (
    <div className="routineList">
      <br />
      <h1>Rutinas</h1>
      <br />
      <Button
        type="primary"
        className="botonInsertar"
        onClick={abrirCerrarModalInsertar}
      >
        Insertar Nueva Rutina
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
        title="Insertar Rutina"
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
          <Item label="Descripcion">
            <TextArea rows={4} name="descripcion" onChange={handleChange} />
          </Item>
          <Item label="Link">
            <Input name="link" onChange={handleChange} />
          </Item>
          <Item label="Dificultad">
            <Select
              defaultValue="--Seleccione--"
              style={{ width: 315 }}
              name="iddificultad"
              onChange={handleChangeDif}
            >
              {/*
        dificultad.map(ele =>
        (
          <Option key={ele.iddificultad} value={ele.iddificultad}>{ele.nombre}</Option>
        ))
        */}
            </Select>
          </Item>
        </Form>
      </Modal>

      <Modal
        visible={modalEditar}
        title="Editar Rutina"
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
          <Item label="Artista">
            <Input
              name="nombre"
              onChange={handleChange}
              value={routines && routines.nombre}
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
        Estás seguro que deseas eliminar la rutina{" "}
        <b>{routines && routines.nombre}</b>?
      </Modal>
    </div>
  );
}
