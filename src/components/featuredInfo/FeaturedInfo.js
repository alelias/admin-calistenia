import React from 'react'
import "./featuredInfo.css"
//import {ArrowDownward} from "@material-ui/icons"
const fotoRutina = '../../img/rutina3.jpg'
const fotoNoticia = '../../img/noticia.jpg'
const fotoEvento = '../../img/evento.jpg'

export default function FeaturedInfo() {
    return (
        <div className="featured">
            <div className="featuredItem">
                <span className="featuredTitle">Rutinas</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">2315</span>
                    <img src={fotoRutina} className="imgRut"  alt="rutina" />

                </div>
                <span className="featuredSub">Rutinas realizadas este mes</span>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Noticias</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">23</span>
                    <img src={fotoNoticia} className="imgRut" alt="noticia"  />
                </div>
                <span className="featuredSub">Noticias visualizadas este mes</span>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Eventos</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">5</span>
                    <img src={fotoEvento} className="imgRut" alt="evento"  />
                </div>
                <span className="featuredSub">Eventos realizados este mes</span>
            </div>
        </div>
    )
}
