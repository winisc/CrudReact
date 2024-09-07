import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import Trash from "../../assets/trash.svg";
import Edit from "../../assets/edit.svg";
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
          <text>Produto:</text>
          <input
            name="name"
            id="name"
            type="text"
            placeholder="Nome do Produto"
            ref={inputProduto}
          />
          <text>Quantidade:</text>
          <input
            name="qt"
            id="qt"
            type="number"
            placeholder="00"
            ref={inputQuantidade}
          />
          <text>Valor:</text>
          <input
            name="valor"
            id="valor"
            type="number"
            placeholder="0,00"
            ref={inputValor}
          />
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
          <button type="button" className="button-produto" onClick={createProdutoTemp}>
            Adicionar Produto
          </button>
        </form>

        <form>
          <div className="cabeçalho">
            <text className="quantidade">QT</text>
            <text className="produto">Produto</text>
            <text className="valor">Valor</text>
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

export default Home;
