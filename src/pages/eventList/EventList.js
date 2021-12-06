import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Input,
  Form,
  DatePicker,
  TimePicker,
  Select,
} from "antd";
import "antd/dist/antd.css";
import { EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./eventList.css";
const axios = require("axios");
const { Item } = Form;
const { TextArea } = Input;
const { Option } = Select;

const baseUrl = "http://67.205.155.156:4500/api/evento";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

export default function EventList() {
  const [data, setData] = useState([]);
  const [events, setEvents] = useState({
    idevento: "",
    nombre: "",
    fecha: "",
    descripcion: "",
    idinstructor: null,
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
    setEvents({ ...events, [name]: value });
    console.log(events);
  };

  const seleccionarEvents = (events, caso) => {
    setEvents(events);
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
      .post(baseUrl, events)
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
      .put(baseUrl + "/" + events.idevento, events)
      .then((response) => {
        var dataAuxiliar = data;
        dataAuxiliar.map((elemento) => {
          if (elemento.idevento === events.idevento) {
            elemento.nombre = events.nombre;
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
      .delete(baseUrl + "/" + events.idevento)
      .then((response) => {
        setData(
          data.filter((elemento) => elemento.idevento !== events.idevento)
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
      title: "Fecha",
      dataIndex: "fecha",
      key: "fecha",
    },

    {
      title: "Descripcion",
      dataIndex: "descripcion",
      key: "descripcion",
      width: 280,
    },
    {
      title: "ID Instructor",
      dataIndex: "idinstructor",
      key: "idinstructor",
    },
    {
      title: "Acciones",
      key: "acciones",
      render: (fila) => (
        <>
          <Button
            type="primary"
            onClick={() => seleccionarEvents(fila, "Editar")}
          >
            Editar
          </Button>{" "}
          {"   "}
          <Button
            type="primary"
            danger
            onClick={() => seleccionarEvents(fila, "Eliminar")}
          >
            Eliminar
          </Button>
        </>
      ),
    },
  ];
  return (
    <div className="eventList">
      <br />
      <h1>Eventos</h1>
      <br />
      <Button
        type="primary"
        className="botonInsertar"
        onClick={abrirCerrarModalInsertar}
      >
        Insertar Nuevo Evento
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
        title="Insertar Evento"
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
          <Form.Item label="Nombre">
            <Input name="nombre" onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Fecha">
            <DatePicker name="fecha" onChange={handleChange} />
          </Form.Item>

          <Form.Item label="Descripcion">
            <TextArea rows={4} name="descripcion" onChange={handleChange} />
          </Form.Item>
          <Form.Item Label="Instructor">
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Selecciona Instructor"
              optionFilterProp="children"
              onChange={handleChange}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="tom">Tom</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        visible={modalEditar}
        title="Editar Evento"
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
              value={events && events.nombre}
            />
          </Item>
          <Item label="Fecha">
            <DatePicker
              name="fecha"
              onChange={handleChange}
              value={events && events.fecha}
            />
          </Item>

          <Item label="Descripcion">
            <TextArea
              rows={4}
              name="descripcion"
              onChange={handleChange}
              value={events && events.descripcion}
            />
          </Item>
          <Item Label="Instructor">
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Selecciona Instructor"
              optionFilterProp="children"
              onChange={handleChange}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="tom">Tom</Option>
            </Select>
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
        Estás seguro que deseas eliminar la dificultad{" "}
        <b>{events && events.nombre}</b>?
      </Modal>
    </div>
  );
}
