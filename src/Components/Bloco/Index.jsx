import P from 'prop-types';
import { useContext } from 'react';
import { GlobalContext } from '../../App';
import './styles.css';

export function Bloco({ onClickBloco = undefined, idBloco, mostrando = false }) {
  const observacoes = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const { contexto } = useContext(GlobalContext);
  const configInicial = contexto.Blocos[idBloco];
  const numeroBloco = !configInicial.numDefault ? configInicial.NumEscolhido : configInicial.numDefault;
  const corFundo =
    contexto.BlocoSelecionado === undefined
      ? 'beige'
      : configInicial.id !== contexto.BlocoSelecionado.id
      ? // ? 'beige'
        contexto.ColunaSelecionada.includes(configInicial.id) || contexto.ColunaSelecionada.includes(configInicial.id)
        ? '#cbf4ff'
        : 'beige'
      : 'rgb(137, 231, 255)';
  // const numeroBloco = Math.floor(Math.random() * 10);

  return (
    <>
      <div
        className="bloco"
        style={{
          cursor: mostrando ? 'not-allowed' : 'pointer',
          backgroundColor: corFundo,
        }}
        onClick={() => (onClickBloco ? onClickBloco(configInicial) : '')}
      >
        {numeroBloco != undefined && (
          <div className="row numero-escolhido">
            {observacoes.map((serAtual) => {
              return (
                <div key={serAtual} className="col-4 " style={{ visibility: serAtual == 5 ? 'visible' : 'hidden' }}>
                  {numeroBloco}
                </div>
              );
            })}
          </div>
        )}

        {numeroBloco == undefined && (
          <div className="row observacoes">
            {observacoes.map((serAtual) => (
              <div
                key={serAtual}
                className="col-4 observacao"
                style={{ visibility: configInicial.sugestoes[serAtual - 1] ? 'visible' : 'hidden' }}
              >
                {serAtual}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

Bloco.propTypes = {
  onClickBloco: P.func,
  idBloco: P.number.isRequired,
  mostrando: P.bool,
};
