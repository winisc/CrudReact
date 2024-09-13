import { useEffect, useState, useRef } from "react";
import React from "react";
import { Link } from "react-router-dom";
import "./style-historico.css";
import Home from "../Home/Home.jsx";
import api from "../../services/api";
import Trash from "../../assets/trash.svg";
import Edit from "../../assets/edit.svg";

function Historico() {

  function adicionarZeroAEsquerda(numero) {
    if (numero != null) {
      return numero.toString().padStart(2, "0");
    }
  }

  function formatarMoeda(amount) {
    if (amount === "Sem troco") {
      return amount;
    }

    if (amount != null) {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(amount);
    }
  }

  const [vendas, setVendas] = useState([]);

  async function getVendas() {
    const vendasFromApi = await api.get("/vendas");
    setVendas(vendasFromApi.data);
  }
  
  async function deleteVendas(id, i) {
    if (window.confirm(`Deletar venda ${i + 1}?`)) {
      await api.delete(`/vendas/${id}`);

      getVendas();
      return;
    }

    getVendas();
    return;
  }

  useEffect(() => {
    getVendas();
  }, []);

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

      <div className="container-vendas">
          <h2>HISTÓRICO DE VENDAS</h2>
          <div className="container-get">
            {vendas.map((vendas, i) => (
              <div key={vendas.id} className="get">
                <div className="titulo-venda">
                  <h1>Venda: {i + 1}</h1>
                  <h1>Cliente: {vendas.cliente}</h1>
                  <h1>Data: {vendas.data}</h1>
                </div>

                <div className="card">
                  <div className="his-table">
                    <p className="his-titulo">Quantidade:</p>
                    <div className="his-valores">
                      <p>{adicionarZeroAEsquerda(vendas.quantidade[0])}</p>
                      <p>{adicionarZeroAEsquerda(vendas.quantidade[1])}</p>
                      <p>{adicionarZeroAEsquerda(vendas.quantidade[2])}</p>
                      <p>{adicionarZeroAEsquerda(vendas.quantidade[3])}</p>
                      <p>{adicionarZeroAEsquerda(vendas.quantidade[4])}</p>
                      <p>{adicionarZeroAEsquerda(vendas.quantidade[5])}</p>
                      <p>{adicionarZeroAEsquerda(vendas.quantidade[6])}</p>
                      <p>{adicionarZeroAEsquerda(vendas.quantidade[7])}</p>
                      <p>{adicionarZeroAEsquerda(vendas.quantidade[8])}</p>
                      <p>{adicionarZeroAEsquerda(vendas.quantidade[9])}</p>
                    </div>
                  </div>

                  <div className="his-table-produtos">
                    <p className="his-titulo">Produto:</p>
                    <div className="his-valores">
                      <p>{vendas.produto[0]}</p>
                      <p>{vendas.produto[1]}</p>
                      <p>{vendas.produto[2]}</p>
                      <p>{vendas.produto[3]}</p>
                      <p>{vendas.produto[4]}</p>
                      <p>{vendas.produto[5]}</p>
                      <p>{vendas.produto[6]}</p>
                      <p>{vendas.produto[7]}</p>
                      <p>{vendas.produto[8]}</p>
                      <p>{vendas.produto[9]}</p>
                    </div>
                  </div>

                  <div className="his-table">
                    <p className="his-titulo">Valor:</p>
                    <div className="his-valores">
                      <p>{formatarMoeda(vendas.valor[0])}</p>
                      <p>{formatarMoeda(vendas.valor[1])}</p>
                      <p>{formatarMoeda(vendas.valor[2])}</p>
                      <p>{formatarMoeda(vendas.valor[3])}</p>
                      <p>{formatarMoeda(vendas.valor[4])}</p>
                      <p>{formatarMoeda(vendas.valor[5])}</p>
                      <p>{formatarMoeda(vendas.valor[6])}</p>
                      <p>{formatarMoeda(vendas.valor[7])}</p>
                      <p>{formatarMoeda(vendas.valor[8])}</p>
                      <p>{formatarMoeda(vendas.valor[9])}</p>
                    </div>
                  </div>

                  <div className="his-table">
                    <p className="his-titulo">Tipo:</p>
                    <div className="his-valores">
                      <p>{vendas.tipo[0]}</p>
                      <p>{vendas.tipo[1]}</p>
                      <p>{vendas.tipo[2]}</p>
                      <p>{vendas.tipo[3]}</p>
                      <p>{vendas.tipo[4]}</p>
                      <p>{vendas.tipo[5]}</p>
                      <p>{vendas.tipo[6]}</p>
                      <p>{vendas.tipo[7]}</p>
                      <p>{vendas.tipo[8]}</p>
                      <p>{vendas.tipo[9]}</p>
                    </div>
                  </div>
                </div>

                <div className="his-totais">
                  <div>
                    <p className="his-titulo-totais">Valor Total: </p>
                    <p className="his-valor-totais">
                      {formatarMoeda(vendas.valorTotal)}
                    </p>
                  </div>

                  <div>
                    <p className="his-titulo-totais">Tipo de Pagamento:</p>
                    <p className="his-valor-totais-tipo">
                      {vendas.tipoDePagamento}
                    </p>
                  </div>

                  <div>
                    <p className="his-titulo-totais">Valor de Pagamento:</p>
                    <p className="his-valor-totais">
                      {formatarMoeda(vendas.valorPago)}
                    </p>
                  </div>

                  <div>
                    <p className="his-titulo-totais">Troco:</p>
                    <p className="his-valor-totais-troco">
                      {formatarMoeda(vendas.troco)}
                    </p>
                  </div>
                </div>

                <div className="buttons-vendas">
                  <button
                    className="button-trash-vendas"
                    type="button"
                    onClick={() => deleteVendas(vendas.id, i)}
                  >
                    <img src={Trash} />
                  </button>

                  <button
                    className="button-edit-vendas"
                    type="button"
                    onClick={() => console.log("Ana Beatriz!")}
                  >
                    <img src={Edit} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
    </div>
  );
}

export default Historico;
