
/**
 * calculos.js — Toda a lógica matemática da calculadora
 *
 * Aqui ficam as funções puras (sem visual), seguindo o mesmo
 * padrão do CarrinhoInteligente.
 */

/**
 * Executa a operação entre dois números.
 *
 * @param {number} a         - primeiro número
 * @param {number} b         - segundo número
 * @param {string} operador  - '+' | '-' | '*' | '/'
 * @returns {number} resultado
 */
export function calcular(a, b, operador) {
  switch (operador) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      if (b === 0) return 'Erro'; // evita divisão por zero
      return a / b;
    default:
      return b;
  }
}

/**
 * Formata um número para exibição no display.
 * - Remove decimais desnecessários (ex: 8.0 → "8")
 * - Limita a 10 dígitos para caber na tela
 *
 * @param {number|string} valor
 * @returns {string}
 */
export function formatarDisplay(valor) {
  if (valor === 'Erro') return 'Erro';

  const numero = parseFloat(valor);
  if (isNaN(numero)) return '0';

  // Se for inteiro, não mostra ".0"
  if (Number.isInteger(numero)) {
    return String(numero);
  }

  // Limita casas decimais para caber no display
  return parseFloat(numero.toFixed(9)).toString();
}

/**
 * Monta o texto do histórico de uma operação.
 * Ex: "8 + 3 = 11"
 *
 * @param {string} a
 * @param {string} operador
 * @param {string} b
 * @param {string} resultado
 * @returns {string}
 */
export function montarHistorico(a, operador, b, resultado) {
  return `${a} ${operador} ${b} = ${resultado}`;
}
