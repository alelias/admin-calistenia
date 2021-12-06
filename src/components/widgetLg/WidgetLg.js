import React from 'react'
import "./widgetLg.css"

export default function WidgetLg() {
    return (
        <div className="widgetLg">
            <h3 className="widgetLgTitle">Proximos Eventos</h3>
            <table className="widgetLgTable">
                <tr className="widgetLgTr">
                    <th className="widgetLgTh">Nombre</th>
                    <th className="widgetLgTh">Lugar</th>
                    <th className="widgetLgTh">Fecha</th>
                </tr>
                <tr className="widgetLgTr">
                    <td className="widgetLgNom">Torneo Anual</td>
                    <td className="widgetLgLug">Parque 3 poniente</td>
                    <td className="widgetLgFech">27-09-2021</td>
                </tr>
            </table>
        </div>
    )
}
