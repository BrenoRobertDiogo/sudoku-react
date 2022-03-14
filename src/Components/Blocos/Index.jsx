import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../App';
import { Bloco } from '../Bloco/Index';
import './styles.css';

export function Blocos() {
  const {
    contexto,
    handleClickBloco,
    contexto: { BlocoSelecionado },
    contexto: { Blocos },
    setContexto,
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
        setBlocosSeparados((_) => {
          return { lista };
        });
      }
    }
    /* const Regioes = lista;

    setContexto({ ...contexto, Regioes }); */
  }, []);

  const defineCor = (blocoAtual, listaBlocos) => {
    return contexto.BlocoSelecionado === undefined
      ? 'beige'
      : // Caso não seja o bloco selecionado
      blocoAtual.id !== contexto.BlocoSelecionado.id
      ? // Bloco de blocos
        listaBlocos.find((x) => x == blocoAtual) && listaBlocos.find((x) => x == BlocoSelecionado)
        ? '#a0ecff'
        : // ? 'beige'
        contexto.LinhaSelecionada.find((x) => x.id == blocoAtual.id) ||
          contexto.ColunaSelecionada.find((x) => x.id == blocoAtual.id)
        ? '#cbf4ff'
        : 'beige'
      : // Caso seja o bloco selecionado
        '#53dcff';
  };

  return (
    <>
      <div className="separacoes-blocos">
        {/*row  separacoes-blocos */}
        {blocosSeparados.lista.map((listaBlocos, indexBlocos) => (
          <div key={indexBlocos} className="blocos">
            {listaBlocos.map((blocoAtual) => (
              <div key={blocoAtual.id} className="coluna-bloco">
                {/* <div key={blocoAtual.id}>{blocoAtual.id}</div> */}
                <Bloco
                  onClickBloco={handleClickBloco}
                  idBloco={blocoAtual.id}
                  cor={defineCor(blocoAtual, listaBlocos)}
                />
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
