import P from 'prop-types';
import './styles.css';

export function Bloco({ onKeyPress }) {
  const observacoes = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const numeroBloco = 1;
  // const numeroBloco = undefined;
  return (
    <>
      <div className="bloco" onKeyDown={() => onKeyPress()}>
        <div className="numeroEscolhido text-center">{numeroBloco}</div>
        <div className="row" style={{ visibility: observacoes.includes(numeroBloco) ? 'hidden' : 'visible' }}>
          {observacoes.map((serAtual) => (
            <div key={serAtual} className="col-4 observacoes text-center">
              {serAtual}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

Bloco.propTypes = {
  onKeyPress: P.func.isRequired,
};
