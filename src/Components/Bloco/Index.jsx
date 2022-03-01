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
      ? 'beige'
      : 'rgb(137, 231, 255)';
  // const numeroBloco = Math.floor(Math.random() * 10);

  return (
    <>
      <div
        className="bloco"
        style={{
          // width: mostrando ? '100%' : '100%',
          // height: mostrando ? '100%' : '100%',
          cursor: mostrando ? 'not-allowed' : 'pointer',
          backgroundColor: corFundo,
        }}
        onClick={() => (onClickBloco ? onClickBloco(configInicial) : '')}
      >
        <div className="row numero-escolhido">
          {/* <div className="col"></div>
          <div className="col">{numeroBloco}</div>
          <div className="col"></div> */}
          {observacoes.map((serAtual) => {
            return (
              <div key={serAtual} className="col-4 observacao">
                {serAtual == 5 && <h1>{numeroBloco}</h1>}
              </div>
            );
          })}
        </div>
        {numeroBloco == undefined && (
          <div
            className="row observacoes"
            // style={{
            // visibility: observacoes.includes(numeroBloco) ? 'hidden' : 'visible',
            // display: numeroBloco ? 'none' : '',
            // }}
          >
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
