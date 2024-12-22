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
    var COMPARACAO = false;
    if (contexto.BlocoSelecionado != undefined) {
      if (contexto.BlocoSelecionado.NumEscolhido != undefined) {
        COMPARACAO = [blocoAtual.NumEscolhido, blocoAtual.numDefault].includes(contexto.BlocoSelecionado.NumEscolhido);
      } else {
        COMPARACAO = [blocoAtual.NumEscolhido, blocoAtual.numDefault].includes(contexto.BlocoSelecionado.numDefault);
      }
    }
    if (
      contexto.BlocoSelecionado === undefined &&
      [blocoAtual.numDefault, blocoAtual.NumEscolhido].filter((num) => num == undefined).length == 1
    ) {
      return '#ececc4';
    } else if (blocoAtual.id !== contexto.BlocoSelecionado.id) {
      if (listaBlocos.find((x) => x == blocoAtual) && listaBlocos.find((x) => x == BlocoSelecionado)) {
        return '#ececc4';
      } else if (
        contexto.LinhaSelecionada.find((x) => x.id == blocoAtual.id) ||
        contexto.ColunaSelecionada.find((x) => x.id == blocoAtual.id)
      ) {
        return '#ececc4';
      } else if (COMPARACAO) {
        /* [blocoAtual.numDefault, blocoAtual.NumEscolhido].some([
          contexto.BlocoSelecionado.NumEscolhido,
          contexto.BlocoSelecionado.numDefault,
        ]) &&
        !(blocoAtual.numDefault || blocoAtual.NumEscolhido) */

        return 'red';
      } else {
        return 'beige';
      }
    }
    return '#53dcff';
    /* return contexto.BlocoSelecionado === undefined
      ? '#f5f5dc'
      : // Caso não seja o bloco selecionado
      blocoAtual.id !== contexto.BlocoSelecionado.id
      ? // Bloco de blocos
        listaBlocos.find((x) => x == blocoAtual) && listaBlocos.find((x) => x == BlocoSelecionado)
        ? '#a0ecff'
        : // ? '#f5f5dc'
        contexto.LinhaSelecionada.find((x) => x.id == blocoAtual.id) ||
          contexto.ColunaSelecionada.find((x) => x.id == blocoAtual.id)
        ? '#cbf4ff'
        : [blocoAtual.numDefault, blocoAtual.NumEscolhido].some([
            contexto.BlocoSelecionado.NumEscolhido,
            contexto.BlocoSelecionado.numDefault,
          ]) && !(blocoAtual.numDefault || blocoAtual.NumEscolhido)
        ? 'red'
        : 'beige'
      : // Caso seja o bloco selecionado
        '#53dcff'; */
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
