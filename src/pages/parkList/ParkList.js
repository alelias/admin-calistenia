import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Input, Form, Image } from "antd";
import "antd/dist/antd.css";
import { EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import ReactMapGL, { Marker, NavigationControl }  from 'react-map-gl';
import "mapbox-gl/dist/mapbox-gl.css";
import "./parkList.css";
const { TextArea } = Input;
const axios = require("axios");
const { Item } = Form;

const baseUrl = "https://back-calistenia.herokuapp.com/api/parque";


const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};



const navStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  padding: "10px",
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

  const [mapa, setMapa] = useState([]);

  const [viewport, setViewport] = useState({
    width: 1200,
    height: 300,
    latitude: -33.53199106757794,
    longitude: -70.77501632397149,
    zoom: 15,
    pitch: 30,
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
   
  };

  const seleccionarParks = (parks, caso) => {
    setParks(parks);
    caso === "Editar" ? abrirCerrarModalEditar() : abrirCerrarModalEliminar();
  };

  useEffect(() => {
    const peticionGetMapa = async () => {
      const baseUrlParque = "https://back-calistenia.herokuapp.com/api/parque";

      const mapa = await axios.get(baseUrlParque);
      setMapa(mapa.data)
      console.log(mapa.data)
     
    };
    peticionGetMapa()
  }, []);

  const peticionGet = async () => {
    
    await axios.get(baseUrl)
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
            elemento.latitud = parks.latitud;
            elemento.longitud = parks.longitud;
            elemento.descripcion = parks.descripcion;
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
    <>
    {/*
    <div style={styles}>
        <ReactMapGL
          mapStyle={"mapbox://styles/mapbox/dark-v9"}
          mapboxApiAccessToken={
            "pk.eyJ1Ijoid2FsZXRhIiwiYSI6ImNrd2xocGtvMjA1bWsycHByeWttMHkwNGQifQ.EF73mGbhH1BYHtA83lEg8A"
          }
          {...viewport}
          onViewportChange={(nextViewport) => setViewport(nextViewport)}
        >
          {data &&
            data.map((park) => (
              <Marker
                latitude={park.latitud}
                longitude={park.longitud}
                offsetLeft={-20}
                offsetTop={-10}
              >
                <img
                  src="https://cdn4.iconfinder.com/data/icons/basic-ui-pack-flat-s94-1/64/Basic_UI_Icon_Pack_-_Flat_map_pointer-512.png"
                  width={50}
                  height={50}
                />
              </Marker>
            ))}

          <div className="nav" style={navStyle}>
            <NavigationControl />
          </div>
        </ReactMapGL>
      </div>
            */}
    <div className="parkList">
    
      <br />
      <h1>Parques</h1>
      <ReactMapGL
    mapboxApiAccessToken={
      "pk.eyJ1Ijoid2FsZXRhIiwiYSI6ImNrd2xocGtvMjA1bWsycHByeWttMHkwNGQifQ.EF73mGbhH1BYHtA83lEg8A"
    }
      {...viewport}
      onViewportChange={nextViewport => setViewport(nextViewport)}
    >
      {
            data.map((park) => (
              <Marker
                latitude={parseFloat(park.latitud)}
                longitude={parseFloat(park.longitud)}
                offsetLeft={-20}
                offsetTop={-10}
              >
                <img
                  src="https://cdn4.iconfinder.com/data/icons/basic-ui-pack-flat-s94-1/64/Basic_UI_Icon_Pack_-_Flat_map_pointer-512.png"
                  width={50}
                  height={50}
                />
              </Marker>
            ))
      }
              
{/* 
            <Marker latitude={-33.53199106757794} longitude={-70.77501632397149} offsetLeft={-20} offsetTop={-10}>
                    <img src="https://cdn4.iconfinder.com/data/icons/basic-ui-pack-flat-s94-1/64/Basic_UI_Icon_Pack_-_Flat_map_pointer-512.png" width={50} height={50}/>
                </Marker>
                <Marker latitude={-33.52771605667408} longitude={-70.77797748252992} offsetLeft={-20} offsetTop={-10}>
                    <img src="https://cdn4.iconfinder.com/data/icons/basic-ui-pack-flat-s94-1/64/Basic_UI_Icon_Pack_-_Flat_map_pointer-512.png" width={50} height={50}/>
                </Marker>
*/}
      <div className="nav" style={navStyle}>
            <NavigationControl />
          </div>
    </ReactMapGL>
      <br />
      <Button
        type="primary"
        className="botonInsertar"
        onClick={abrirCerrarModalInsertar}
      >
        Registrar Parque Manualmente
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
    </>
  );
}
