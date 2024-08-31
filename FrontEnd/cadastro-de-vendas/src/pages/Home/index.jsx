import { useRef } from "react";
import "./style.css";

function App() {
  const inputProduto = useRef()
  const inputQuantidade = useRef()
  const inputValor = useRef()
  const inputServico = useRef()

  let listaDeProdutos = []

  function createProduto(){
    const produto = {
      name: inputProduto.current.value,
      quantidade: inputQuantidade.current.value,
      valor: inputValor.current.value,
      servico: inputServico.current.value
    }

    for(let i = 0; i < 10; i++)
    {
      if(listaDeProdutos[i] === undefined)
      {
        listaDeProdutos[i] = produto
        return
      }
      else{      
      }
    }
  }

  return (
    <div className="principal" >

      <div className="container">
        <form>
          <text>Produto:</text>
          <input name="name" type="text" ref={inputProduto  } />
          <text>Quantidade:</text>
          <input name="qt" type="number" ref={inputQuantidade}/>
          <text>Valor:</text>
          <input name="valor" type="number" ref={inputValor}/>
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
          <button type="button" onClick={createProduto}>Adicionar Produto</button>
        </form>

        <form>
          <div className="cabeçalho">
            <text className="quantidade">QT</text>
            <text className="produto">Produto</text>
            <text className="valor">Valor</text>
          </div>

          <div className="lista-de-produtos">
            <p className="quantidade-lista">01</p>
            <p className="produto-lista">
              Produto Produto Produto Produto Produto
            </p>
            <p className="valor-lista">R$40,00</p>
          </div>
        </form>

        <form className="venda">
          <h1>Valor Total:</h1>
          <text className="valorPago">R$156,00</text>

          <h1>Tipo de pagamento:</h1>
          <select
            class="value-tipo"
            id="forma-de-pagamento"
            name="forma"
            required="required"
          >
            <option value="">Escolha a forma de Pagamento</option>
            <option value="dinheiro">Dinheiro</option>
            <option value="pix">Pix</option>
            <option value="cardCredit">Cartão de Crédito</option>
            <option value="cardDebito">Cartão de Débito</option>
            <option value="pendente">Pendente</option>
          </select>

          <h1>Valor Pago:</h1>
          <input name="" type="number" />

          <h1>Troco:</h1>
          <text className="troco">R$20,00</text>

          <button className="button-confirmar" type="button">
            Confirmar Venda
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
