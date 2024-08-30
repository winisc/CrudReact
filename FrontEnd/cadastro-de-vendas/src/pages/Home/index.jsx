import './style.css'

function App() {

  return (

    <div className="container">
      <form>
        <text>Produto:</text>
        <input name="" type="text"/>
        <text>Quantidade:</text>
        <input name="" type="number"/>
        <text>Valor:</text>
        <input name="" type="number"/>
        <text>Tipo de Produto:</text>
        <select class="value-tipo" id="tipo-de-servico0" name="tipo" required="required">
          <option value="">Escolha o tipo</option>
          <option value="servico">Serviços</option>
          <option value="pecas">Peças</option>
          <option value="outros">Outros</option>
      </select>
        <button type="button">Adicionar Produto</button>
      </form>

      <form className="form-lista-de-produtos">
        <text className="quantidade">QT</text>
        <text className="produto">Produto</text>
        <text className="valor">Valor</text>

        <div className="lista-de-produtos">
          <div className="quantidade-lista">
            <p>01</p>
            <p>01</p>
            <p>01</p>
            <p>02</p>
            <p>01</p>
          </div>
          <div className="produto-lista">
            <p>Camara de Ar</p>
            <p>Cabo de Freio</p>
            <p>Oleo Mobil</p>
            <p>Parafuso</p>
            <p>Mão de Obra</p>
          </div>
          <div className="valor-lista">
            <p>R$40,00</p>
            <p>R$25,00</p>
            <p>R$35,00</p>
            <p>R$6,00</p>
            <p>R$15,00</p>
          </div>
        </div>
      </form>

      <form>
        <h1>Vender</h1>
        <input name="" type="text"/>
        <input name="" type="text"/>
        <input name="" type="text"/>
        <input name="" type="text"/>
        <button className="button-confirmar" type="button">Confirmar Venda</button>
      </form>
    </div>

    
  )
}

export default App
