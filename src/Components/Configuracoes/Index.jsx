import { useContext } from 'react';
import { GlobalContext } from '../../App';
import { Bloco } from '../Bloco/Index';
import './styles.css';
export function Configuracoes() {
  const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const {
    contexto: { BlocoSelecionado },
    contexto,
    setContexto,
  } = useContext(GlobalContext);

  const handleBotaoClicado = (num) => {
    switch (contexto.Modo) {
      case 'Editar':
        novaEdicao(num);
        break;
      case 'Observar':
        novaObservacao(num - 1);
        break;

      default:
        console.log('Não está em nenhum dos feitos aqui');
        break;
    }
  };

  const handleClickResetButton = () => {
    setContexto({ ...contexto, BlocoSelecionado: undefined });
  };

  const handleChangeModo = (Modo) => {
    setContexto({ ...contexto, Modo });
  };

  const novaEdicao = (edicao) => {
    if (!BlocoSelecionado) return;

    // const idBlocoSelecionado =
    const novoBloco = { ...BlocoSelecionado, NumEscolhido: edicao };
    const BlocosT = contexto.Blocos;
    setContexto({
      ...contexto,
      BlocoSelecionado: { ...novoBloco },
    });
    if (edicao == undefined) return;
    setContexto({
      ...contexto,
      Blocos: BlocosT.map((bloco) => {
        return bloco.id == BlocoSelecionado.id ? { ...bloco, NumEscolhido: edicao } : { ...bloco };
      }),
    });
  };
  const novaObservacao = (observacao) => {
    if (!BlocoSelecionado) return;
    novaEdicao(undefined);
    const BlocosT = contexto.Blocos;
    var novaLista = BlocoSelecionado.sugestoes;
    console.log(novaLista);
    novaLista[observacao] = !novaLista[observacao];
    setContexto({ ...contexto, BlocoSelecionado: { ...BlocoSelecionado, sugestoes: novaLista } });
    /* setContexto({
      ...contexto,
      Blocos: BlocosT.map((bloco) => {
        console.log(bloco);
        return bloco.id == BlocoSelecionado.id ? novaLista : { ...bloco };
      }),
    }); */

    console.log('asdasdasdasdasdasd');
  };

  return (
    <>
      <div className="config">
        <div className="row ">
          {/* Onde vai mostrar o bloco atual selecionado pelo usuário */}
          <div className="col-3 sessao-bloco-selecionado">
            <div className="row">
              <div className="bloco-selecionado">
                {BlocoSelecionado != undefined ? (
                  <Bloco idBloco={BlocoSelecionado.id} key={BlocoSelecionado.id} mostrando={true} />
                ) : (
                  <div className="bloco-visualizar"></div>
                )}
              </div>
            </div>
            <div className="row">
              <button
                className="btn btn-dark"
                onClick={() => {
                  handleClickResetButton();
                }}
              >
                Reset
              </button>
            </div>
          </div>
          {/* 2 botões para os modos Editar e Observar */}
          <div className="col botoes-config">
            <div className="row">
              <button
                onClick={() => handleChangeModo('Editar')}
                className={`btn mb-3 btn-editar-${contexto.Modo == 'Editar' ? 'ativo' : 'inativo'}`}
              >
                Modo editar
              </button>
            </div>
            <div className="row">
              <button
                onClick={() => handleChangeModo('Observar')}
                className={`btn btn-observacao-${contexto.Modo == 'Observar' ? 'ativo' : 'inativo'}`}
              >
                Modo observações
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          {numeros.map((numero) => (
            <div key={numero} className="col-3 botao-numero" onClick={() => handleBotaoClicado(numero)}>
              {/* //handleBotaoClicado(numero)}> */}
              {numero}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
