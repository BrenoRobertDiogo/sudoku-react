import React, { useState } from 'react';
import './App.css';
import { Blocos } from './Components/Blocos/Index';
import { Configuracoes } from './Components/Configuracoes/Index';
import { blocosUsar } from './Data/configInicial';
import { PegaColuna, PegaLinha } from './utils/FuncoesBlocos';

export const GlobalContext = React.createContext();
export const globalState = {
  BlocoSelecionado: undefined,
  LinhaSelecionada: [],
  ColunaSelecionada: [],
  Blocos: blocosUsar,
  Modo: 'Editar', // Observar
};

function App() {
  const [contexto, setContexto] = useState(globalState);
  const handleClickBloco = (BlocoSelecionado) => {
    const LinhaSelecionada = PegaLinha(BlocoSelecionado, contexto.Blocos);
    const ColunaSelecionada = PegaColuna(BlocoSelecionado, contexto.Blocos);
    setContexto({ ...contexto, BlocoSelecionado, LinhaSelecionada, ColunaSelecionada });

    console.log(contexto);
  };

  return (
    <>
      <GlobalContext.Provider value={{ contexto, setContexto, handleClickBloco }}>
        <div className="container-meu pt-5">
          <div className="row">
            <div className="col-8">
              <Blocos />
            </div>
            <div className="col-4" style={{ border: '1px solid red', maxWidth: '500px' }}>
              <Configuracoes />
            </div>
          </div>
        </div>
      </GlobalContext.Provider>
    </>
  );
}

export default App;
