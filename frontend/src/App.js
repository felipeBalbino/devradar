import React, {useState, useEffect} from 'react';

import api from './services/api';

import './Global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevItem from './components/DevItem';
import DevForm from './components/DevForm';


// Reminders
//component > Bloco isolado de HTML, CSS e JS, o qual nao interefre no restante da aplicacao. Uma funcao que retorna algum conteudo HTML. Pedacos isolados da aplicacao em que usamos varias vezes dentro da aplicacao. Eles nao influenciam no restante da aplicacao. Ex: Header, Timeline, Post, etc...
//property > Informacoes que um component PAI passa para o componente FILHO. sao atributos de um componente que o tornam unico. Como um title(FILHO) em um componente Header(PAI). 
//state > informacoes mantidas pelo componente. Uma informacao manipulavel. ((imutabilidade))


function App() {

  const [devs, setDevs] = useState([]);



  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data);
    }

    loadDevs();
  }, []);

  async function handleAddDev(data) {
    const response = await api.post('/devs', data)

    setDevs([...devs, response.data]);
  }
  
  return (
    <div id="app">
      <aside>
        <strong>Subscribe</strong>
        <DevForm onSubmit={handleAddDev}/>
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
           <DevItem key={dev._id} dev={dev}  />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
