function PegaInicioLinha(Bloco, Blocos) {
  const inicioLinhas = [0, 3, 6, 27, 30, 33, 54, 57, 60];
  var inicioLinha = {};
  // eslint-disable-next-line for-direction
  for (let i = Bloco.id; i >= 0; i--) {
    const bloco = Blocos[i];
    const id = bloco.id;
    if (id % 3 == 0 || id == 0 || inicioLinhas.includes(bloco.id)) {
      if (inicioLinhas.includes(bloco.id)) {
        inicioLinha = bloco;
        break;
      } else {
        i -= 8;
      }
    }
  }
  return inicioLinha;
}

export function PegaLinha(Bloco, Blocos) {
  var inicioLinha = PegaInicioLinha(Bloco, Blocos);
  var linha = [];

  for (let i = inicioLinha.id; i <= inicioLinha.id + 20; i++) {
    const bloco = Blocos[i];
    if (i == Bloco.id + 20) {
      break;
    }
    if (i == inicioLinha.id + 2 || i == inicioLinha.id + 2 + 9) {
      i += 6;
    }
    linha.push(bloco);
    // console.log(bloco);
  }
  return linha;
}

export function PegaColuna(Bloco, Blocos) {
  const primeiroColuna = achaNumero(Bloco.id);
}

function achaNumero(idInicial, idAtual = idInicial, f = 0) {
  const primeiraLinha = [0, 1, 2, 9, 10, 11, 18, 19, 20];
  if (primeiraLinha.includes(idAtual)) {
    return idAtual;
  } else if (primeiraLinha.includes(idAtual - 3) || primeiraLinha.includes(idAtual - 6)) {
    return achaNumero(idAtual - 3);
  } else if (
    primeiraLinha.includes(idAtual - 27 - 3) ||
    primeiraLinha.includes(idAtual - 27 - 6) ||
    primeiraLinha.includes(idAtual - 27 * 2 - 3) ||
    primeiraLinha.includes(idAtual - 27 * 2 - 6)
  ) {
    return achaNumero(idInicial, idAtual - 27);
  } else {
    return achaNumero(idInicial, idAtual - 27);
  }
}