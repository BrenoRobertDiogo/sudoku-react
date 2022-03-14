import { useContext } from 'react';
import toast from 'react-hot-toast';
import { GlobalContext } from '../../App';
import { Bloco } from '../Bloco/Index';
import './styles.css';
export function Configuracoes() {
  const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const {
    contexto: { BlocoSelecionado, LinhaSelecionada, ColunaSelecionada, RegiaoSelecionada, Blocos },
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
    setContexto({
      ...contexto,
      BlocoSelecionado: undefined,
      RegiaoSelecionada: undefined,
      LinhaSelecionada: undefined,
      ColunaSelecionada: undefined,
    });
  };

  const handleChangeModo = (Modo) => {
    setContexto({ ...contexto, Modo });
  };

  function atualizaRegioes(edicao) {
    /* setContexto({
      ...contexto,
      Regioes: Regioes.map((AntesRegiao) => {
        // console.log(AntesRegiao);
        return AntesRegiao.map((regiao) => {
          const BLOCO_ACHADO = Blocos.find((bloco) => bloco.id == regiao.id);
          return BLOCO_ACHADO ? BLOCO_ACHADO : regiao;
        });
      }),
    }); */
    const RegiaoSelecionadaAlterar = RegiaoSelecionada.map((regiao) => {
      // console.log(regiao);
      return regiao.id == BlocoSelecionado.id ? { ...regiao, NumEscolhido: edicao } : regiao;
    });
    setContexto({ ...contexto, RegiaoSelecionada: RegiaoSelecionadaAlterar });
  }

  const novaEdicao = (edicao) => {
    // atualizaRegioes();
    if (!BlocoSelecionado) return;
    // console.group();
    // console.log(contexto);

    // const idBlocoSelecionado =
    const novoBloco = { ...BlocoSelecionado, NumEscolhido: edicao };
    const BLOCOS_DO_CONTEXTO = contexto.Blocos;
    setContexto({
      ...contexto,
      BlocoSelecionado: { ...novoBloco },
    });
    if (edicao == undefined) return;
    if (LinhaSelecionada.find((linha) => linha.NumEscolhido == edicao || linha.numDefault == edicao)) {
      toast.error('Linha já tem esse número');
      return;
    } else if (ColunaSelecionada.find((coluna) => coluna.NumEscolhido == edicao || coluna.numDefault == edicao)) {
      toast.error('Coluna já tem esse número');
      return;
    } else if (RegiaoSelecionada.find((regiao) => regiao.NumEscolhido == edicao || regiao.numDefault == edicao)) {
      toast.error('Região já tem esse número');
      return;
    }
    // console.group();
    const RegiaoSelecionadaAlterar = RegiaoSelecionada.map((regiao) => {
      // console.log(regiao);
      return regiao.id == BlocoSelecionado.id ? { ...regiao, NumEscolhido: edicao } : regiao;
    });
    setContexto({
      ...contexto,
      Blocos: BLOCOS_DO_CONTEXTO.map((bloco) =>
        bloco.id == BlocoSelecionado.id ? { ...bloco, NumEscolhido: edicao } : { ...bloco },
      ),
      RegiaoSelecionada: RegiaoSelecionadaAlterar,
    });
    console.log(contexto);
    // console.groupEnd();
    // console.groupEnd();
    // atualizaRegioes(edicao);
  };
  const novaObservacao = (observacao) => {
    if (!BlocoSelecionado) return;
    atualizaRegioes();
    novaEdicao(undefined);
    var novaLista = BlocoSelecionado.sugestoes;
    novaLista[observacao] = !novaLista[observacao];
    setContexto({ ...contexto, BlocoSelecionado: { ...BlocoSelecionado, sugestoes: novaLista } });
    atualizaRegioes();
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
