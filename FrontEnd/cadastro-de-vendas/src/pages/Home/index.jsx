import { useEffect, useState, useRef } from "react";
import "./style.css";
import Trash from "../../assets/trash.svg";
import api from "../../services/api";

function App() {
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

  const inputProduto = useRef();
  const inputQuantidade = useRef();
  const inputValor = useRef();
  const inputServico = useRef();
  const inputFormaDePagamento = useRef();
  const inputValorPago = useRef();

  let listaDeProdutos = [];

  let valorTotal = 0;

  const [vendas, setVendas] = useState([]);

  let venda = {
    produto: [undefined], //OK
    quantidade: [undefined], //String > Int
    valor: [undefined], //String > Float
    tipo: [undefined], //OK
    valorTotal: undefined, //Float or Int
    tipoDePagamento: undefined, //String
    valorPago: undefined, //String > Float
    troco: undefined, //Ok
  };

  async function getVendas() {
    const vendasFromApi = await api.get("/vendas");
    setVendas(vendasFromApi.data);
  }

  async function createVendas() {
    await api.post("/vendas", {
      produto: venda.produto,
      quantidade: venda.quantidade,
      valor: venda.valor,
      tipo: venda.tipo,
      valorTotal: venda.valorTotal,
      tipoDePagamento: venda.tipoDePagamento,
      valorPago: venda.valorPago,
      troco: venda.troco,
    });

    window.location.reload(true);
  }

  async function deleteVendas(id) {
    if (window.confirm("Deletar venda?")) {
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

  function createProdutoTemp() {
    const produto = {
      name: inputProduto.current.value,
      quantidade: inputQuantidade.current.value,
      valor: inputValor.current.value,
      servico: inputServico.current.value,
    };

    for (let i = 0; i < 11; i++) {
      if (listaDeProdutos[i] === undefined) {
        listaDeProdutos[i] = produto;
        if (listaDeProdutos[i].name != "" && listaDeProdutos[i].servico != "" && !isNaN(listaDeProdutos[i].valor) && !isNaN(listaDeProdutos[i].quantidade)) {
          valorTotal += parseFloat(listaDeProdutos[i].valor);
          if (i === 0) {
            document.getElementById("quantidade-lista0").innerText =
              listaDeProdutos[0].quantidade;
            document.getElementById("produto-lista0").innerText =
              listaDeProdutos[0].name;
            document.getElementById("valor-lista0").innerText = formatarMoeda(
              listaDeProdutos[0].valor
            );
          } else if (i === 1) {
            document.getElementById("quantidade-lista1").innerText =
              listaDeProdutos[1].quantidade;
            document.getElementById("produto-lista1").innerText =
              listaDeProdutos[1].name;
            document.getElementById("valor-lista1").innerText = formatarMoeda(
              listaDeProdutos[1].valor
            );
          } else if (i === 2) {
            document.getElementById("quantidade-lista2").innerText =
              listaDeProdutos[2].quantidade;
            document.getElementById("produto-lista2").innerText =
              listaDeProdutos[2].name;
            document.getElementById("valor-lista2").innerText = formatarMoeda(
              listaDeProdutos[2].valor
            );
          } else if (i === 3) {
            document.getElementById("quantidade-lista3").innerText =
              listaDeProdutos[3].quantidade;
            document.getElementById("produto-lista3").innerText =
              listaDeProdutos[3].name;
            document.getElementById("valor-lista3").innerText = formatarMoeda(
              listaDeProdutos[3].valor
            );
          } else if (i === 4) {
            document.getElementById("quantidade-lista4").innerText =
              listaDeProdutos[4].quantidade;
            document.getElementById("produto-lista4").innerText =
              listaDeProdutos[4].name;
            document.getElementById("valor-lista4").innerText = formatarMoeda(
              listaDeProdutos[4].valor
            );
          } else if (i === 5) {
            document.getElementById("quantidade-lista5").innerText =
              listaDeProdutos[5].quantidade;
            document.getElementById("produto-lista5").innerText =
              listaDeProdutos[5].name;
            document.getElementById("valor-lista5").innerText = formatarMoeda(
              listaDeProdutos[5].valor
            );
          } else if (i === 6) {
            document.getElementById("quantidade-lista6").innerText =
              listaDeProdutos[6].quantidade;
            document.getElementById("produto-lista6").innerText =
              listaDeProdutos[6].name;
            document.getElementById("valor-lista6").innerText = formatarMoeda(
              listaDeProdutos[6].valor
            );
          } else if (i === 7) {
            document.getElementById("quantidade-lista7").innerText =
              listaDeProdutos[7].quantidade;
            document.getElementById("produto-lista7").innerText =
              listaDeProdutos[7].name;
            document.getElementById("valor-lista7").innerText = formatarMoeda(
              listaDeProdutos[7].valor
            );
          } else if (i === 8) {
            document.getElementById("quantidade-lista8").innerText =
              listaDeProdutos[8].quantidade;
            document.getElementById("produto-lista8").innerText =
              listaDeProdutos[8].name;
            document.getElementById("valor-lista8").innerText = formatarMoeda(
              listaDeProdutos[8].valor
            );
          } else if (i === 9) {
            document.getElementById("quantidade-lista9").innerText =
              listaDeProdutos[9].quantidade;
            document.getElementById("produto-lista9").innerText =
              listaDeProdutos[9].name;
            document.getElementById("valor-lista9").innerText = formatarMoeda(
              listaDeProdutos[9].valor
            );
          } else if (i >= 10) {
            window.alert("Limite de itens atingindo!");
            return;
          }
          document.getElementById("valorTotal").innerText = formatarMoeda(valorTotal);
          createTroco();
          limparCampos();
          return;
        }

        window.alert("Preencha todos os dados sobre o produto!");
        listaDeProdutos[i] = undefined;
        return;
      }
    }
  }

  function limparCampos() {
    document.getElementById("name").value = "";
    document.getElementById("qt").value = "";
    document.getElementById("valor").value = "";
    document.getElementById("tipo-de-servico").value = "";
  }

  function createTroco() {
    let troco;
    troco = inputValorPago.current.value - valorTotal;
    if (inputFormaDePagamento.current.value === "Dinheiro") {
      if (troco >= 0) {
        document.getElementById("troco").innerText = formatarMoeda(troco);
      } else {
        document.getElementById("troco").innerText = formatarMoeda(0);
      }
    } else {
      document.getElementById("troco").innerText = "Sem troco";
    }
  }

  function deleteProdutoTemp(id) {
    if (listaDeProdutos[id] != undefined) {
      valorTotal = valorTotal - parseInt(listaDeProdutos[id].valor);

      console.log("Deletado", listaDeProdutos[id]);
      listaDeProdutos[id] = undefined;

      for (let i = 0; i < 10; i++) {
        if (id === 0) {
          document.getElementById("quantidade-lista0").innerText = "";
          document.getElementById("produto-lista0").innerText = "";
          document.getElementById("valor-lista0").innerText = "";
        } else if (id === 1) {
          document.getElementById("quantidade-lista1").innerText = "";
          document.getElementById("produto-lista1").innerText = "";
          document.getElementById("valor-lista1").innerText = "";
        } else if (id === 2) {
          document.getElementById("quantidade-lista2").innerText = "";
          document.getElementById("produto-lista2").innerText = "";
          document.getElementById("valor-lista2").innerText = "";
        } else if (id === 3) {
          document.getElementById("quantidade-lista3").innerText = "";
          document.getElementById("produto-lista3").innerText = "";
          document.getElementById("valor-lista3").innerText = "";
        } else if (id === 4) {
          document.getElementById("quantidade-lista4").innerText = "";
          document.getElementById("produto-lista4").innerText = "";
          document.getElementById("valor-lista4").innerText = "";
        } else if (id === 5) {
          document.getElementById("quantidade-lista5").innerText = "";
          document.getElementById("produto-lista5").innerText = "";
          document.getElementById("valor-lista5").innerText = "";
        } else if (id === 6) {
          document.getElementById("quantidade-lista6").innerText = "";
          document.getElementById("produto-lista6").innerText = "";
          document.getElementById("valor-lista6").innerText = "";
        } else if (id === 7) {
          document.getElementById("quantidade-lista7").innerText = "";
          document.getElementById("produto-lista7").innerText = "";
          document.getElementById("valor-lista7").innerText = "";
        } else if (id === 8) {
          document.getElementById("quantidade-lista8").innerText = "";
          document.getElementById("produto-lista8").innerText = "";
          document.getElementById("valor-lista8").innerText = "";
        } else if (id === 9) {
          document.getElementById("quantidade-lista9").innerText = "";
          document.getElementById("produto-lista9").innerText = "";
          document.getElementById("valor-lista9").innerText = "";
        }
      }

      document.getElementById("valorTotal").innerText = valorTotal;
      createTroco();
      return;
    }
  }

  function confirmarVenda() {
    for (let i = 0; i < 10; i++) {
      if (listaDeProdutos[i] != undefined) {
        venda.produto[i] = listaDeProdutos[i].name;
        venda.quantidade[i] = parseInt(listaDeProdutos[i].quantidade);
        venda.valor[i] = parseFloat(listaDeProdutos[i].valor);
        venda.tipo[i] = listaDeProdutos[i].servico;
      }
    }

    venda.valorTotal = parseFloat(valorTotal);
    venda.tipoDePagamento = inputFormaDePagamento.current.value;
    venda.valorPago = parseFloat(inputValorPago.current.value);

    if (inputFormaDePagamento.current.value === "Dinheiro") {
      if (inputValorPago.current.value - valorTotal >= 0) {
        venda.troco = (inputValorPago.current.value - valorTotal).toString();
      } else {
        venda.troco = "0";
      }
    } else {
      venda.troco = "Sem troco";
    }

    if (
      venda.tipoDePagamento === "" ||
      (venda.valorPago < venda.valorTotal &&
        venda.tipoDePagamento != "Pendente") ||
      venda.valorTotal <= 0 ||
      isNaN(venda.valorPago)
    ) {
      window.alert("Preencha todos os campos de forma válida!");
      return;
    }

    if (window.confirm("Confirmar venda?")) {
      createVendas();
      return;
    }

    return;
  }

  return (
    <div className="principal">
      <div className="container">
        <form>
          <text>Produto:</text>
          <input name="name" id="name" type="text" ref={inputProduto} />
          <text>Quantidade:</text>
          <input name="qt" id="qt" type="number" ref={inputQuantidade} />
          <text>Valor:</text>
          <input name="valor" id="valor" type="number" ref={inputValor} />
          <text>Tipo de Produto:</text>
          <select
            className="value-tipo"
            id="tipo-de-servico"
            name="tipo"
            required="required"
            ref={inputServico}
          >
            <option value="">Escolha o tipo de Produto</option>
            <option value="Serviço">Serviços</option>
            <option value="Peça">Peças</option>
            <option value="Outros">Outros</option>
          </select>
          <button type="button" onClick={createProdutoTemp}>
            Adicionar Produto
          </button>
        </form>

        <form>
          <div className="cabeçalho">
            <text className="quantidade">QT</text>
            <text className="produto">Produto</text>
            <text className="valor">Valor</text>
          </div>

          <div className="lista-de-produtos">
            <p className="quantidade-lista" id="quantidade-lista0"></p>
            <p className="produto-lista" id="produto-lista0"></p>
            <p className="valor-lista" id="valor-lista0"></p>
            <button
              className="button-trash"
              type="button"
              onClick={() => deleteProdutoTemp(0)}
            >
              <img src={Trash} />
            </button>
          </div>

          <div className="lista-de-produtos">
            <p className="quantidade-lista" id="quantidade-lista1"></p>
            <p className="produto-lista" id="produto-lista1"></p>
            <p className="valor-lista" id="valor-lista1"></p>
            <button
              className="button-trash"
              type="button"
              onClick={() => deleteProdutoTemp(1)}
            >
              <img src={Trash} />
            </button>
          </div>

          <div className="lista-de-produtos">
            <p className="quantidade-lista" id="quantidade-lista2"></p>
            <p className="produto-lista" id="produto-lista2"></p>
            <p className="valor-lista" id="valor-lista2"></p>
            <button
              className="button-trash"
              type="button"
              onClick={() => deleteProdutoTemp(2)}
            >
              <img src={Trash} />
            </button>
          </div>

          <div className="lista-de-produtos">
            <p className="quantidade-lista" id="quantidade-lista3"></p>
            <p className="produto-lista" id="produto-lista3"></p>
            <p className="valor-lista" id="valor-lista3"></p>
            <button
              className="button-trash"
              type="button"
              onClick={() => deleteProdutoTemp(3)}
            >
              <img src={Trash} />
            </button>
          </div>

          <div className="lista-de-produtos">
            <p className="quantidade-lista" id="quantidade-lista4"></p>
            <p className="produto-lista" id="produto-lista4"></p>
            <p className="valor-lista" id="valor-lista4"></p>
            <button
              className="button-trash"
              type="button"
              onClick={() => deleteProdutoTemp(4)}
            >
              <img src={Trash} />
            </button>
          </div>

          <div className="lista-de-produtos">
            <p className="quantidade-lista" id="quantidade-lista5"></p>
            <p className="produto-lista" id="produto-lista5"></p>
            <p className="valor-lista" id="valor-lista5"></p>
            <button
              className="button-trash"
              type="button"
              onClick={() => deleteProdutoTemp(5)}
            >
              <img src={Trash} />
            </button>
          </div>

          <div className="lista-de-produtos">
            <p className="quantidade-lista" id="quantidade-lista6"></p>
            <p className="produto-lista" id="produto-lista6"></p>
            <p className="valor-lista" id="valor-lista6"></p>
            <button
              className="button-trash"
              type="button"
              onClick={() => deleteProdutoTemp(6)}
            >
              <img src={Trash} />
            </button>
          </div>

          <div className="lista-de-produtos">
            <p className="quantidade-lista" id="quantidade-lista7"></p>
            <p className="produto-lista" id="produto-lista7"></p>
            <p className="valor-lista" id="valor-lista7"></p>
            <button
              className="button-trash"
              type="button"
              onClick={() => deleteProdutoTemp(7)}
            >
              <img src={Trash} />
            </button>
          </div>

          <div className="lista-de-produtos">
            <p className="quantidade-lista" id="quantidade-lista8"></p>
            <p className="produto-lista" id="produto-lista8"></p>
            <p className="valor-lista" id="valor-lista8"></p>
            <button
              className="button-trash"
              type="button"
              onClick={() => deleteProdutoTemp(8)}
            >
              <img src={Trash} />
            </button>
          </div>

          <div className="lista-de-produtos">
            <p className="quantidade-lista" id="quantidade-lista9"></p>
            <p className="produto-lista" id="produto-lista9"></p>
            <p className="valor-lista" id="valor-lista9"></p>
            <button
              className="button-trash"
              type="button"
              onClick={() => deleteProdutoTemp(9)}
            >
              <img src={Trash} />
            </button>
          </div>
        </form>

        <form className="venda">
          <h1>Valor Total:</h1>
          <text className="valorPago" id="valorTotal">
            R$0,00
          </text>

          <h1>Tipo de pagamento:</h1>
          <select
            className="value-tipo"
            id="forma-de-pagamento"
            name="forma"
            required="required"
            ref={inputFormaDePagamento}
            onChange={createTroco}
          >
            <option value="">Escolha a forma de Pagamento</option>
            <option value="Dinheiro">Dinheiro</option>
            <option value="Pix">Pix</option>
            <option value="Cartão de Crédito">Cartão de Crédito</option>
            <option value="Cartão de Débito">Cartão de Débito</option>
            <option value="Pendente">Pendente</option>
          </select>

          <h1>Valor Pago:</h1>
          <input
            name=""
            type="number"
            ref={inputValorPago}
            onChange={createTroco}
          />

          <h1>Troco:</h1>
          <text className="troco" id="troco">
            R$0,00
          </text>

          <button
            className="button-confirmar"
            type="button"
            onClick={confirmarVenda}
          >
            Confirmar Venda
          </button>
        </form>
      </div>

      <h2>HISTÓRICO DE VENDAS</h2>
      <div className="container-get">
        {vendas.map((vendas, i) => (
          <div key={vendas.id} className="get">
            <div className="titulo-venda">
              <h1>Venda: {i + 1}</h1>
            </div>
            <div className="his-table">
              <p className="his-titulo">Quantidade:</p>
              <div className="his-valores">
                <p>{vendas.quantidade[0]}</p>
                <p>{vendas.quantidade[1]}</p>
                <p>{vendas.quantidade[2]}</p>
                <p>{vendas.quantidade[3]}</p>
                <p>{vendas.quantidade[4]}</p>
                <p>{vendas.quantidade[5]}</p>
                <p>{vendas.quantidade[6]}</p>
                <p>{vendas.quantidade[7]}</p>
                <p>{vendas.quantidade[8]}</p>
                <p>{vendas.quantidade[9]}</p>
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

            <button
              className="button-trash-vendas"
              type="button"
              onClick={() => deleteVendas(vendas.id)}
            >
              <img src={Trash} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
