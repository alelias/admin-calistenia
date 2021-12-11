import React from 'react'
import "./featuredInfo.css"
//import {ArrowDownward} from "@material-ui/icons"
const fotoRutina = '../../img/rutina3.jpg'
const fotoNoticia = '../../img/noticia.jpg'
const fotoEvento = '../../img/evento.jpg'
const imgRut = '../../img/calisteni.jpeg'

export default function FeaturedInfo() {
    return (
        <div className="featured">
            <div className="featuredItem">
                <span className="featuredTitle">Bienvenido a Calistenia APP</span>
                <div className="featuredMoneyContainer">
                 
                    <img src={imgRut} className="imgRut"  alt="rutina" />

                </div>
                
            </div>
          
           
        </div>
    )
}
