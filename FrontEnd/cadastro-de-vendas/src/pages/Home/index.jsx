import { useEffect, useState, useRef } from "react";
import "./style.css";
import Trash from "../../assets/trash.svg";
import api from '../../services/api'

function App() {
  const inputProduto = useRef();
  const inputQuantidade = useRef();
  const inputValor = useRef();
  const inputServico = useRef();
  const inputFormaDePagamento = useRef();
  const inputValorPago = useRef();

  let listaDeProdutos = [];

  let valorTotal = 0;

  const [vendas, setVendas] = useState([])

  let venda = {
    produto: [undefined], //OK
    quantidade: [undefined], //String > Int
    valor: [undefined], //String > Float
    tipo: [undefined], //OK
    valorTotal: undefined, //Float or Int
    tipoDePagamento: undefined, //String
    valorPago: undefined, //String > Float
    troco: undefined //Ok
  }

  async function getVendas(){
     const vendasFromApi = await api.get('/vendas')
     setVendas(vendasFromApi.data)
  }

  async function createVendas(){
    await api.post('/vendas', {
      produto: venda.produto,
      quantidade: venda.quantidade,
      valor: venda.valor,
      tipo: venda.tipo,
      valorTotal: venda.valorTotal,
      tipoDePagamento: venda.tipoDePagamento,
      valorPago: venda.valorPago,
      troco: venda.troco
    })

 }

  useEffect(() => {
    getVendas()
  }, [])

  function createProdutoTemp() {

    const produto = {
      name: inputProduto.current.value,
      quantidade: inputQuantidade.current.value,
      valor: inputValor.current.value,
      servico: inputServico.current.value,
    };

    for (let i = 0; i < 10; i++) {
      if (listaDeProdutos[i] === undefined) {
        listaDeProdutos[i] = produto;
          if (listaDeProdutos[i].servico != "") {
          valorTotal += parseInt(listaDeProdutos[i].valor);
          if (i === 0) {
            document.getElementById("quantidade-lista0").innerText =
              listaDeProdutos[0].quantidade;
            document.getElementById("produto-lista0").innerText =
              listaDeProdutos[0].name;
            document.getElementById("valor-lista0").innerText =
              listaDeProdutos[0].valor;
          } else if (i === 1) {
            document.getElementById("quantidade-lista1").innerText =
              listaDeProdutos[1].quantidade;
            document.getElementById("produto-lista1").innerText =
              listaDeProdutos[1].name;
            document.getElementById("valor-lista1").innerText =
              listaDeProdutos[1].valor;
          } else if (i === 2) {
            document.getElementById("quantidade-lista2").innerText =
              listaDeProdutos[2].quantidade;
            document.getElementById("produto-lista2").innerText =
              listaDeProdutos[2].name;
            document.getElementById("valor-lista2").innerText =
              listaDeProdutos[2].valor;
          } else if (i === 3) {
            document.getElementById("quantidade-lista3").innerText =
              listaDeProdutos[3].quantidade;
            document.getElementById("produto-lista3").innerText =
              listaDeProdutos[3].name;
            document.getElementById("valor-lista3").innerText =
              listaDeProdutos[3].valor;
          } else if (i === 4) {
            document.getElementById("quantidade-lista4").innerText =
              listaDeProdutos[4].quantidade;
            document.getElementById("produto-lista4").innerText =
              listaDeProdutos[4].name;
            document.getElementById("valor-lista4").innerText =
              listaDeProdutos[4].valor;
          } else if (i === 5) {
            document.getElementById("quantidade-lista5").innerText =
              listaDeProdutos[5].quantidade;
            document.getElementById("produto-lista5").innerText =
              listaDeProdutos[5].name;
            document.getElementById("valor-lista5").innerText =
              listaDeProdutos[5].valor;
          } else if (i === 6) {
          document.getElementById("quantidade-lista6").innerText =
            listaDeProdutos[6].quantidade;
          document.getElementById("produto-lista6").innerText =
            listaDeProdutos[6].name;
          document.getElementById("valor-lista6").innerText =
            listaDeProdutos[6].valor;
          } else if (i === 7) {
          document.getElementById("quantidade-lista7").innerText =
            listaDeProdutos[7].quantidade;
          document.getElementById("produto-lista7").innerText =
            listaDeProdutos[7].name;
          document.getElementById("valor-lista7").innerText =
            listaDeProdutos[7].valor;
          } else if (i === 8) {
          document.getElementById("quantidade-lista8").innerText =
            listaDeProdutos[8].quantidade;
          document.getElementById("produto-lista8").innerText =
            listaDeProdutos[8].name;
          document.getElementById("valor-lista8").innerText =
            listaDeProdutos[8].valor;
          } else if (i === 9) {
            document.getElementById("quantidade-lista9").innerText =
              listaDeProdutos[9].quantidade;
            document.getElementById("produto-lista9").innerText =
              listaDeProdutos[9].name;
            document.getElementById("valor-lista9").innerText =
              listaDeProdutos[9].valor;
          }

         
          document.getElementById("valorTotal").innerText = valorTotal;
          createTroco();
          return;
        }

        console.log("Tipo de Serviço inválido")
        listaDeProdutos[i] = undefined;
        return
      }
    }
  }

  function createTroco() {
    let troco;
    troco = inputValorPago.current.value - valorTotal;
    if (inputFormaDePagamento.current.value === "dinheiro") {
      if(troco >= 0){
        document.getElementById("troco").innerText = troco;
      }
      else{
        document.getElementById("troco").innerText = 0;
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
        venda.produto[i] = listaDeProdutos[i].name
        venda.quantidade[i] = parseInt(listaDeProdutos[i].quantidade)
        venda.valor[i] = parseFloat(listaDeProdutos[i].valor)
        venda.tipo[i] = listaDeProdutos[i].servico
      }
    }

    venda.valorTotal = parseFloat(valorTotal)
    venda.tipoDePagamento = inputFormaDePagamento.current.value
    venda.valorPago = parseFloat(inputValorPago.current.value)

    if (inputFormaDePagamento.current.value === "dinheiro") {
      if((inputValorPago.current.value - valorTotal) >= 0)
      {
        venda.troco = (inputValorPago.current.value - valorTotal).toString()
      }
      else{
        venda.troco = "0"
      }
    } else {
      venda.troco = ("Sem troco")
    }

    if(venda.tipoDePagamento === "" || venda.valorPago < venda.valorTotal || venda.valorTotal <= 0)
    {
      console.log("Invalido")
      return
    }

    createVendas()
    // window.location.reload(true)
    return
  }

  return (
    <div className="principal">
      <div className="container">
        <form>
          <text>Produto:</text>
          <input name="name" type="text" ref={inputProduto} />
          <text>Quantidade:</text>
          <input name="qt" type="number" ref={inputQuantidade} />
          <text>Valor:</text>
          <input name="valor" type="number" ref={inputValor} />
          <text>Tipo de Produto:</text>
          <select
            class="value-tipo"
            id="tipo-de-servico"
            name="tipo"
            required="required"
            ref={inputServico}
          >
            <option value="">Escolha o tipo de Produto</option>
            <option value="servicos">Serviços</option>
            <option value="pecas">Peças</option>
            <option value="outros">Outros</option>
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
            00,00
          </text>

          <h1>Tipo de pagamento:</h1>
          <select
            class="value-tipo"
            id="forma-de-pagamento"
            name="forma"
            required="required"
            ref={inputFormaDePagamento}
            onChange={createTroco}
          >
            <option value="">Escolha a forma de Pagamento</option>
            <option value="dinheiro">Dinheiro</option>
            <option value="pix">Pix</option>
            <option value="cardCredit">Cartão de Crédito</option>
            <option value="cardDebito">Cartão de Débito</option>
            <option value="pendente">Pendente</option>
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
            00,00
          </text>

          <button className="button-confirmar" type="button" onClick={confirmarVenda}>
            Confirmar Venda
          </button>
        </form>
      </div>

    {vendas.map((vendas) => (
      <div key={vendas.id} className="get" >
        <p>Produtos: {vendas.produto}</p>
        <p>Quantidades: {vendas.quantidade}</p>
        <p>Valores: {vendas.valor}</p>
        <p>Tipos: {vendas.tipo}</p>
        <p>Valor Total: {vendas.valorTotal}</p>
        <p>Tipo de Pagamento: {vendas.tipoDePagamento}</p>
        <p>Valor de Pagamento: {vendas.valorPago}</p>
        <p>Troco: {vendas.troco}</p>
      </div>
    ))}


    </div>
  );
}

export default App;
