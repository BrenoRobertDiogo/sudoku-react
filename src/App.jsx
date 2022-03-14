import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import './App.css';
import { Blocos } from './Components/Blocos/Index';
import { Configuracoes } from './Components/Configuracoes/Index';
import { blocosUsar } from './Data/configInicial';
import { PegaColuna, PegaLinha, PegaRegiao } from './utils/FuncoesBlocos';

export const GlobalContext = React.createContext();
export const globalState = {
  BlocoSelecionado: undefined,
  RegiaoSelecionada: [],
  LinhaSelecionada: [],
  ColunaSelecionada: [],
  Blocos: blocosUsar,
  Modo: 'Editar', // Observar
};

function App() {
  const [contexto, setContexto] = useState(globalState);
  const handleClickBloco = (BlocoSelecionado) => {
    console.log(BlocoSelecionado);
    const LinhaSelecionada = PegaLinha(BlocoSelecionado, contexto.Blocos);
    const ColunaSelecionada = PegaColuna(BlocoSelecionado, contexto.Blocos);
    const RegiaoSelecionada = PegaRegiao(BlocoSelecionado, contexto.Blocos);

    setContexto({ ...contexto, BlocoSelecionado, LinhaSelecionada, ColunaSelecionada, RegiaoSelecionada });
    console.log(contexto);
    // console.log(contexto);
  };

  if (contexto.Blocos.find((bloco) => bloco.numDefault == undefined || bloco.NumEscolhido == undefined) == undefined) {
    console.log(contexto.Blocos.find((bloco) => bloco == undefined));
    return (
      <>
        <h1>Você terminou o jogo ;)</h1>
      </>
    );
  }
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
      <Toaster position="bottom-center" reverseOrder={true} />
    </>
  );
}

export default App;
