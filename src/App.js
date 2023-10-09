import React, { Component } from 'react';
import './App.css';
import axios from 'axios';


class App extends Component {
  constructor() {
    super();
    this.state = {
      cidade: '',
      temperatura: '',
      descricao: '',
      condicaoClimatica: 'default', // Defina um valor padrão aqui
    };
  }

  componentDidMount() {
    // Chame a função buscarPrevisao() aqui se quiser definir uma condição inicial.
  }

  componentDidUpdate(prevProps, prevState) {
    const { condicaoClimatica } = this.state;
    const classeAnterior = prevState.condicaoClimatica;
  
    if (classeAnterior) {
      document.body.classList.remove(classeAnterior);
    }
  
    if (condicaoClimatica) {
      document.body.classList.add(condicaoClimatica);
    }
  }

  buscarPrevisao = () => {
    const cidade = this.state.cidade;
    const apiKey = 'e2541e689eafd9b4b45014485fe6da77';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric`;

    axios
      .get(apiUrl)
      .then((response) => {
        const data = response.data;
        this.setState({
          temperatura: data.main.temp,
          descricao: data.weather[0].description,
          condicaoClimatica: data.weather[0].main, // Definindo a condição climática
        });
      })
      .catch((error) => {
        console.error('Erro ao buscar previsão do tempo:', error);
        this.setState({
          temperatura: '',
          descricao: 'Cidade não encontrada',
          condicaoClimatica: 'default', // Define o valor padrão em caso de erro
        });
      });
  };

  handleChange = (e) => {
    this.setState({ cidade: e.target.value });
  };

  render() {
    const { cidade, temperatura, descricao } = this.state;
    

    return (
      <div className="App" >
        <h1>Previsão do Tempo</h1>
        <div className="input">
          <input
            type="text"
            placeholder="Digite o nome da cidade"
            value={cidade}
            onChange={this.handleChange}
          />
          <button onClick={this.buscarPrevisao}>Buscar</button>
        </div>
        {temperatura !== '' && (
          <div className="previsao">
            <p>Cidade: {cidade}</p>
            <p>Temperatura: {temperatura}°C</p>
            <p>Descrição: {descricao}</p>
          </div>
        )}
      </div>
    );
  }
}

export default App;
