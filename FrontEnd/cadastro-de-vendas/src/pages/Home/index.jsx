import { useRef } from "react";
import "./style.css";

function App() {
  const inputProduto = useRef();
  const inputQuantidade = useRef();
  const inputValor = useRef();
  const inputServico = useRef();
  const inputFormaDePagamento = useRef();
  const inputValorPago = useRef();

  let listaDeProdutos = [];

  let valorTotal = 0

  function createProduto() {
    const produto = {
      name: inputProduto.current.value,
      quantidade: inputQuantidade.current.value,
      valor: inputValor.current.value,
      servico: inputServico.current.value,
    };
    for (let i = 0; i < 10; i++) {
      if (listaDeProdutos[i] === undefined) {
        listaDeProdutos[i] = produto;
        valorTotal += parseInt(listaDeProdutos[i].valor)
        if(i === 0){
          document.getElementById("quantidade-lista0").innerText = listaDeProdutos[0].quantidade
          document.getElementById("produto-lista0").innerText = listaDeProdutos[0].name
          document.getElementById("valor-lista0").innerText = listaDeProdutos[0].valor
        }
        else if(i === 1){
          document.getElementById("quantidade-lista1").innerText = listaDeProdutos[1].quantidade
          document.getElementById("produto-lista1").innerText = listaDeProdutos[1].name
          document.getElementById("valor-lista1").innerText = listaDeProdutos[1].valor
        }

        document.getElementById("valorTotal").innerText = valorTotal
        return;
      }
    }
  }

  function createTroco(){
    let troco
    troco = inputValorPago.current.value-valorTotal
    if(inputFormaDePagamento.current.value === "dinheiro"){
      document.getElementById("troco").innerText = troco
    }
    else{
      document.getElementById("troco").innerText = " "
    }

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
          <button type="button" onClick={createProduto}>
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
            </div>

            <div className="lista-de-produtos">
              <p className="quantidade-lista" id="quantidade-lista1"></p>
              <p className="produto-lista" id="produto-lista1"></p>
              <p className="valor-lista0" id="valor-lista1"></p>
            </div>
        </form>

        <form className="venda">
          <h1>Valor Total:</h1>
          <text className="valorPago" id="valorTotal">00,00</text>

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
          <input name="" type="number" ref = {inputValorPago} onChange={createTroco}/>

          <h1>Troco:</h1>
          <text className="troco" id="troco">00,00</text>

          <button className="button-confirmar" type="button">
            Confirmar Venda
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
