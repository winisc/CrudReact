import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./style-home.css";
import Trash from "../../assets/trash.svg";
import api from "../../services/api";

function Home() {
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

  const date = new Date();

  function dataAgora() {
    return new Intl.DateTimeFormat("pt-BR").format(date);
  }

  function adicionarZeroAEsquerda(numero) {
    if (numero != null) {
      return numero.toString().padStart(2, "0");
    }
  }

  const inputProduto = useRef();
  const inputQuantidade = useRef();
  const inputValor = useRef();
  const inputServico = useRef();
  const inputFormaDePagamento = useRef();
  const inputValorPago = useRef();
  const inputCliente = useRef();

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
    cliente: undefined, //String
    valorPago: undefined, //String > Float
    troco: undefined, //Ok
    data: undefined, //String
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
      cliente: venda.cliente,
      valorPago: venda.valorPago,
      troco: venda.troco,
      data: venda.data,
    });

    window.location.reload(true);
  }

  useEffect(() => {
    getVendas();
  }, []);

  function updateProductDisplay(index, produto) {
    const quantidadeElement = document.getElementById(
      `quantidade-lista${index}`
    );
    const produtoElement = document.getElementById(`produto-lista${index}`);
    const valorElement = document.getElementById(`valor-lista${index}`);
    const listaElement = document.getElementById(`lista-de-produtos${index}`);

    quantidadeElement.innerText = adicionarZeroAEsquerda(produto.quantidade);
    produtoElement.innerText = produto.name;
    valorElement.innerText = formatarMoeda(produto.valor);
    listaElement.style.display = "flex";
  }

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
        console.log(listaDeProdutos[i].valor);
        if (
          listaDeProdutos[i].name != "" &&
          listaDeProdutos[i].servico != "" &&
          listaDeProdutos[i].valor != 0 &&
          listaDeProdutos[i].quantidade != 0
        ) {
          if (i >= 10) {
            console.log(listaDeProdutos[10]);
            listaDeProdutos[10] = undefined;
            console.log(listaDeProdutos[10]);
            window.alert("Limite de itens atingido!");
            return;
          }

          updateProductDisplay(i, listaDeProdutos[i]);
          valorTotal += parseFloat(listaDeProdutos[i].valor);

          document.getElementById("valorTotal").innerText =
            formatarMoeda(valorTotal);
          createTroco();
          limparCampos();
          return;
        }

        window.alert("Preencha todos os campos sobre o produto!");
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
    console.log(inputCliente.current.value);
    console.log(typeof inputCliente.current.value);
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

  function limparProdutoDisplay(id) {
    const quantidadeElement = document.getElementById(`quantidade-lista${id}`);
    const produtoElement = document.getElementById(`produto-lista${id}`);
    const valorElement = document.getElementById(`valor-lista${id}`);
    const listaElement = document.getElementById(`lista-de-produtos${id}`);

    if (quantidadeElement && produtoElement && valorElement && listaElement) {
      quantidadeElement.innerText = "";
      produtoElement.innerText = "";
      valorElement.innerText = "";
      listaElement.style.display = "none";
    }
  }

  function deleteProdutoTemp(id) {
    if (listaDeProdutos[id] !== undefined) {
      valorTotal -= parseFloat(listaDeProdutos[id].valor);

      // Limpar o produto da lista
      listaDeProdutos[id] = undefined;

      // Atualizar a exibição do produto
      limparProdutoDisplay(id);

      // Atualizar o valor total
      document.getElementById("valorTotal").innerText =
        formatarMoeda(valorTotal);
      createTroco();

      return;
    }

    window.alert("Produto não encontrado!");
  }

  function atualizarVendaProduto(index, listaDeProduto) {
    venda.produto[index] = listaDeProduto.name;
    venda.quantidade[index] = parseInt(listaDeProduto.quantidade);
    venda.valor[index] = parseFloat(listaDeProduto.valor);
    venda.tipo[index] = listaDeProduto.servico;
  }

  function calcularTroco(valorPago, valorTotal) {
    return (valorPago - valorTotal).toFixed(2);
  }

  function confirmarVenda() {
    // Atualizar informações dos produtos
    listaDeProdutos.forEach((listaDeProduto, index) => {
      if (listaDeProduto !== undefined) {
        atualizarVendaProduto(index, listaDeProduto);
      }
    });

    // Atualizar informações da venda
    venda.valorTotal = parseFloat(valorTotal);
    venda.tipoDePagamento = inputFormaDePagamento.current.value;
    venda.valorPago = parseFloat(inputValorPago.current.value);
    venda.cliente = inputCliente.current.value;

    // Calcular troco
    if (venda.tipoDePagamento === "Dinheiro") {
      if (venda.valorPago >= venda.valorTotal) {
        venda.troco = calcularTroco(venda.valorPago, venda.valorTotal);
      } else {
        venda.troco = "0";
      }
    } else {
      venda.troco = "Sem troco";
    }

    // Verificar se todos os campos estão preenchidos corretamente
    const validaCampos =
      (venda.cliente !== "" &&
        venda.tipoDePagamento !== "" &&
        venda.valorPago >= venda.valorTotal) ||
      (venda.tipoDePagamento === "Pendente" &&
        venda.valorTotal > 0 &&
        !isNaN(venda.valorPago));

    if (!validaCampos) {
      window.alert("Preencha todos os campos de forma válida!");
      return;
    }

    // Confirmar venda
    if (window.confirm("Confirmar venda?")) {
      venda.data = dataAgora();
      createVendas();
    }
  }

  return (
    <div className="principal">
      
      <header className="header">
      <div className="container-bar">
        <h1 className="logo">WM MOTOS</h1>
        <nav>
          <ul className="nav-links">
            <li><Link to={'/'}>Vender</Link></li>
            <li><Link to={'/historico'}>Histórico de Vendas</Link></li>
            <li><Link to={'/relatorios'}>Relatórios</Link></li>
          </ul>
        </nav>
      </div>
    </header>

      <div className="container">
        <form>
          <span>Produto:</span>
          <input
            name="name"
            id="name"
            type="text"
            placeholder="Nome do Produto"
            ref={inputProduto}
          />
          <span>Quantidade:</span>
          <input
            name="qt"
            id="qt"
            type="number"
            placeholder="00"
            ref={inputQuantidade}
          />
          <span>Valor:</span>
          <input
            name="valor"
            id="valor"
            type="number"
            placeholder="0,00"
            ref={inputValor}
          />
          <span>Tipo de Produto:</span>
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
          <button type="button" className="button-produto" onClick={createProdutoTemp}>
            Adicionar Produto
          </button>
        </form>

        <form className="produtos-adicionados">
          <div className="cabeçalho">
            <span className="quantidade">QT</span>
            <span className="produto">Produto</span>
            <span className="valor">Valor</span>
          </div>

          <div className="lista-de-produtos" id="lista-de-produtos0">
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

          <div className="lista-de-produtos" id="lista-de-produtos1">
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

          <div className="lista-de-produtos" id="lista-de-produtos2">
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

          <div className="lista-de-produtos" id="lista-de-produtos3">
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

          <div className="lista-de-produtos" id="lista-de-produtos4">
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

          <div className="lista-de-produtos" id="lista-de-produtos5">
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

          <div className="lista-de-produtos" id="lista-de-produtos6">
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

          <div className="lista-de-produtos" id="lista-de-produtos7">
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

          <div className="lista-de-produtos" id="lista-de-produtos8">
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

          <div className="lista-de-produtos" id="lista-de-produtos9">
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
          <span className="valorPago" id="valorTotal">
            R$0,00
          </span>

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

          <h1>Cliente:</h1>
          <input
            name=""
            type="text"
            placeholder="Nome do Cliente"
            ref={inputCliente}
          />

          <h1>Valor Pago:</h1>
          <input
            name=""
            type="number"
            placeholder="0,00"
            ref={inputValorPago}
            onChange={createTroco}
          />

          <h1>Troco:</h1>
          <span className="troco" id="troco">
            R$0,00
          </span>

          <button
            className="button-confirmar"
            type="button"
            onClick={confirmarVenda}
          >
            Confirmar Venda
          </button>
        </form>

      </div>       
    </div>
  );
}

export default Home;
