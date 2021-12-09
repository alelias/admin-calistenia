import React,{useState, useEffect} from 'react'
import {Table, Button, Modal, Input, Form } from "antd"
import "antd/dist/antd.css";
import {
    EditOutlined
  } from '@ant-design/icons';
import { Link} from 'react-router-dom'
import './instructorList.css'
const axios = require('axios');
const { Item } = Form;

const baseUrl="https://back-calistenia.herokuapp.com/api/instructor";

const layout={
    labelCol:{
      span: 8
    },
    wrapperCol:{
      span: 16
    }
  };

export default function InstructorList() {

    const [data, setData]=useState([]);
    const [instructors, setInstructors] = useState({
        idinstructor: '',
        nombre: ''
    })

    const [modalInsertar, setModalInsertar]=useState(false);
    const [modalEditar, setModalEditar]=useState(false);
    const [modalEliminar, setModalEliminar]=useState(false);

    const abrirCerrarModalInsertar=()=>{
        setModalInsertar(!modalInsertar);
      }
     
      const abrirCerrarModalEditar=()=>{
        setModalEditar(!modalEditar);
      }
    
      const abrirCerrarModalEliminar=()=>{
        setModalEliminar(!modalEliminar);
      }
    
      const handleChange=e=>{
        const {name, value}=e.target;
        setInstructors({...instructors,
        [name]: value});
        console.log(instructors);
      }
    
      const seleccionarInstructors=(instructors, caso)=>{
        setInstructors(instructors);
        (caso==="Editar")?abrirCerrarModalEditar():abrirCerrarModalEliminar()
      }

      


const peticionGet=async()=>{
    await axios.get(baseUrl)
    .then(response=>{
      setData(response.data);
    }).catch(error=>{
      console.log(error);
    })
      }
    
    
      const peticionPost=async()=>{
        //delete artista.id;
        await axios.post(baseUrl, instructors)
        .then(response=>{
          setData(data.concat(response.data));
          abrirCerrarModalInsertar();
        }).catch(error=>{
          console.log(error);
        })
          }
    
          const peticionPut=async()=>{
            await axios.put(baseUrl+"/"+instructors.idinstructor, instructors)
            .then(response=>{
              var dataAuxiliar=data;
              dataAuxiliar.map(elemento=>{
                if(elemento.id===instructors.idinstructor){
                  elemento.nombre=instructors.nombre;

                }
              });
              setData(dataAuxiliar);
              abrirCerrarModalEditar();
            }).catch(error=>{
              console.log(error);
            })
              }
    
              
          const peticionDelete=async()=>{
            await axios.delete(baseUrl+"/"+instructors.idinstructor)
            .then(response=>{
              setData(data.filter(elemento=>elemento.idinstructor!==instructors.iddificultad));
              abrirCerrarModalEliminar();
            }).catch(error=>{
              console.log(error);
            })
              }
    
      useEffect(()=>{
        peticionGet();
      },[])
const columns = [
    
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
    },
   
    {
      title: "Acciones",
      key: "acciones",
      render: (fila) => (
        <>
          <Button type="primary" onClick={()=>seleccionarInstructors(fila, "Editar")}>Editar</Button> {"   "}
          <Button type="primary" danger onClick={()=>seleccionarInstructors(fila, "Eliminar")}>
            Eliminar
          </Button>
        </>
      ),
    },
  ];
    return (
        <div className='instructorList'>
           <br />
           <h1>Dificultades</h1>
      <br />
      <Button type="primary" className="botonInsertar" onClick={abrirCerrarModalInsertar} >Insertar Nuevo Instructor</Button>
      <br />
      <br />
      <Table locale={{ emptyText: 'Cargando...' }}  columns={columns} dataSource={data}/>


      <Modal
      visible={modalInsertar}
      title="Insertar Instructor"
      destroyOnClose={true}
      onCancel={abrirCerrarModalInsertar}
      centered
      footer={[
        <Button onClick={abrirCerrarModalInsertar}>Cancelar</Button>,
        <Button type="primary" onClick={peticionPost}>Insertar</Button>,
      ]}
      >
<Form {...layout}>
  <Item label="Instructor">
    <Input name="nombre" onChange={handleChange}/>
  </Item>

</Form>
      </Modal>


      
      <Modal
      visible={modalEditar}
      title="Editar Instructor"
      onCancel={abrirCerrarModalEditar}
      centered
      footer={[
        <Button onClick={abrirCerrarModalEditar}>Cancelar</Button>,
        <Button type="primary" onClick={peticionPut}>Editar</Button>,
      ]}
      >
<Form {...layout}>
  <Item label="Instructor">
    <Input name="nombre" onChange={handleChange} value={instructors && instructors.nombre}/>
  </Item>

  
</Form>
      </Modal>


          
      <Modal
      visible={modalEliminar}
      onCancel={abrirCerrarModalEliminar}
      centered
      footer={[
        <Button onClick={abrirCerrarModalEliminar}>No</Button>,
        <Button type="primary" danger onClick={peticionDelete}>Sí</Button>,
      ]}
      >
Estás seguro que deseas eliminar e instructor <b>{instructors && instructors.nombre}</b>?
      </Modal>
            
        </div>
    )
}
