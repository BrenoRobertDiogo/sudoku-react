import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../App';
import { Bloco } from '../Bloco/Index';
import './styles.css';

export function Blocos() {
  const {
    contexto,
    handleClickBloco,
    contexto: { Blocos },
  } = useContext(GlobalContext);
  const [blocosSeparados, setBlocosSeparados] = useState({ lista: [] });

  useEffect(() => {
    // const novoValor = Blocos.slice(0, 8);
    // setBlocosSeparados({ ...blocosSeparados, novoValor });
    // pegaPrimeiros();
    var lista = [];
    for (let i = 0; i < Blocos.length + 9; i++) {
      if (i % 9 == 0 && lista.length <= 9) {
        lista = blocosSeparados.lista;
        lista.push(Blocos.slice(i - 9, i));
        // lista.shift();
        lista = lista.filter((atual) => atual.length != 0);
        setBlocosSeparados((BlocosSeparados) => {
          return { lista };
        });
      }
    }
  }, []);
  return (
    <>
      <div className="separacoes-blocos">
        {/*row  separacoes-blocos */}
        {blocosSeparados.lista.map((listaBlocos, indexBlocos) => (
          <div key={indexBlocos} className="blocos">
            {listaBlocos.map((blocoAtual) => (
              <div key={blocoAtual.id} className="coluna-bloco">
                {/* <div key={blocoAtual.id}>{blocoAtual.id}</div> */}
                <Bloco onClickBloco={handleClickBloco} idBloco={blocoAtual.id} />
              </div>
            ))}
          </div>
        ))}

        {/* {contexto.Blocos.map((bloco) => (
            <div key={bloco.id} className="col">
              <Bloco onClickBloco={handleClickBloco} idBloco={bloco.id} />
            </div>
          ))} */}
      </div>
    </>
  );
}
