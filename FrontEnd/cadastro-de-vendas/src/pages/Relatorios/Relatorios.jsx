import React from 'react'
import { Link } from "react-router-dom";
import "./style.css";

function Relatorios() {
  return (
    <div className="principal">
      <header className="header">
        <div className="container-bar">
          <h1 className="logo">WM MOTOS</h1>
          <nav>
            <ul className="nav-links">
              <li><Link to={"/"}>Vender</Link></li>
              <li><Link to={"/historico"}>Histórico de Vendas</Link></li>
              <li><Link to={"/relatorios"}>Relatórios</Link></li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  )
}

export default Relatorios
