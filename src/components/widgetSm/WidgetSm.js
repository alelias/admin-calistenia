import React from 'react'
import {Visibility} from "@material-ui/icons"
import './widgetSm.css'

export default function WidgetSm() {
    return (
        <div className="widgetSm">
            <span className="widgetSmTitle">Nuevos Miembros</span>
            <ul className="widgetSmList">
                <li className="widgetSmListItem">
                    <img src="img/icono-de-la-muestra-del-usuario-símbolo-de-la-persona-avatar-humano-84531334.jpeg" alt="" className="widgetSmImg"/>
                    <div className="widgetSmUser">
                        <span className="widgetSmUsername">Alex Elias</span>
                        <span className="widgetSmUserTitle">Ingeniero Informatico</span>
                    </div>
                    <button className="widgetSmButton">
                        <Visibility className="widgetSmIcon"/>
                        Mostrar
                    </button>
                </li>
                <li className="widgetSmListItem">
                    <img src="img/icono-de-la-muestra-del-usuario-símbolo-de-la-persona-avatar-humano-84531334.jpeg" alt="" className="widgetSmImg"/>
                    <div className="widgetSmUser">
                        <span className="widgetSmUsername">leyla Elias</span>
                        <span className="widgetSmUserTitle">Doctora</span>
                    </div>
                    <button className="widgetSmButton">
                        <Visibility className="widgetSmIcon" />
                        Mostrar
                    </button>
                </li>
            </ul>
        </div>
    )
}
