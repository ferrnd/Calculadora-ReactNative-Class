import { useState } from 'react';
import { View, StatusBar, StyleSheet, SafeAreaView } from 'react-native';

import Display from '../components/Display';
import GradeBotoes from '../components/GradeBotoes';
import Historico from '../components/Historico';

import { calcular, formatarDisplay, montarHistorico } from '../utils/calculos';
import { PRETO, CINZA_MEDIO } from '../styles/colors';

export default function CalculadoraScreen() {
    // ─── Estados ─────────────────────────────────────────────────────────────
    const [displayAtual, setDisplayAtual] = useState('0'); // número visível
    const [primeiroNum, setPrimeiroNum] = useState(null); // 1º operando
    const [operador, setOperador] = useState(null); // +, -, *, /
    const [aguardando, setAguardando] = useState(false); // esperando 2º número
    const [expressaoFinal, setExpressaoFinal] = useState(''); // "8 + 3 = 11" após =
    const [historico, setHistorico] = useState([]); // lista de cálculos

    // ─── Expressão calculada no render (sem estado separado) ─────────────────
    //
    // Em vez de chamar setExpressao() dentro de cada handler (o que causava
    // dessincronias), calculamos o texto sempre que o componente renderiza.
    //
    //  Casos possíveis:
    //   → Depois de "=":           "8 + 3 = 11"      (expressaoFinal)
    //   → Operador pressionado:    "8 +"              (primeiroNum + operador, aguardando)
    //   → Digitando 2º número:     "8 + 3"            (primeiroNum + operador + displayAtual)
    //   → Antes de qualquer op:    ""
    function getExpressao() {
        // Após "=" — mostra o cálculo completo
        if (expressaoFinal && primeiroNum === null) return expressaoFinal;

        // Operador escolhido, aguardando 2º número
        if (primeiroNum !== null && operador !== null && aguardando) {
            return `${formatarDisplay(primeiroNum)} ${operador}`;
        }

        // Digitando o 2º número — mostra "8 + 3" ao vivo
        if (primeiroNum !== null && operador !== null && !aguardando) {
            return `${formatarDisplay(primeiroNum)} ${operador} ${displayAtual}`;
        }

        return '';
    }

    // ─── Handlers ────────────────────────────────────────────────────────────

    /** Pressionar um dígito ou ponto decimal */
    function handleNumero(digito) {
        // Limpa a expressão final ao começar novo número
        if (expressaoFinal && primeiroNum === null) {
            setExpressaoFinal('');
        }

        // Se estava aguardando o 2º número, começa input limpo
        if (aguardando) {
            setDisplayAtual(digito === '.' ? '0.' : digito);
            setAguardando(false);
            return;
        }

        // Evita múltiplos pontos decimais
        if (digito === '.' && displayAtual.includes('.')) return;

        // Limita a 10 dígitos
        if (displayAtual.replace('-', '').replace('.', '').length >= 10) return;

        // Substitui "0" inicial pelo dígito, ou concatena
        const novoValor = displayAtual === '0' && digito !== '.' ? digito : displayAtual + digito;

        setDisplayAtual(novoValor);
    }

    /** Pressionar um operador (+, -, *, /) */
    function handleOperador(op) {
        setExpressaoFinal(''); // limpa o resultado anterior

        const numero = parseFloat(displayAtual);

        // Se já havia operador pendente e o 2º número foi digitado, calcula intermediário
        if (primeiroNum !== null && !aguardando) {
            const resultado = calcular(primeiroNum, numero, operador);
            const resultadoFormatado = formatarDisplay(resultado);
            setDisplayAtual(resultadoFormatado);
            setPrimeiroNum(parseFloat(resultadoFormatado));
        } else {
            setPrimeiroNum(numero);
        }

        setOperador(op);
        setAguardando(true);
    }

    /** Pressionar = */
    function handleIgual() {
        if (primeiroNum === null || operador === null) return;

        const segundoNum = parseFloat(displayAtual);
        const resultado = calcular(primeiroNum, segundoNum, operador);
        const resultadoFormatado = formatarDisplay(resultado);

        const registro = montarHistorico(
            formatarDisplay(primeiroNum),
            operador,
            formatarDisplay(segundoNum),
            resultadoFormatado,
        );

        setHistorico((prev) => [...prev, registro]);
        setDisplayAtual(resultadoFormatado);
        setExpressaoFinal(registro); // guarda "8 + 3 = 11" para mostrar acima

        // Reseta para próximo cálculo
        setPrimeiroNum(null);
        setOperador(null);
        setAguardando(true);
    }

    /** C — limpa tudo */
    function handleLimpar() {
        setDisplayAtual('0');
        setPrimeiroNum(null);
        setOperador(null);
        setAguardando(false);
        setExpressaoFinal('');
    }

    /** CE — apaga o último dígito digitado */
    function handleCE() {
        if (aguardando) return;

        const novoValor =
            displayAtual.length === 1 || (displayAtual.length === 2 && displayAtual.startsWith('-'))
                ? '0'
                : displayAtual.slice(0, -1);

        setDisplayAtual(novoValor);
    }

    /** % — divide o número atual por 100 */
    function handlePorcento() {
        const valor = parseFloat(displayAtual) / 100;
        setDisplayAtual(formatarDisplay(valor));
    }

    /** +/- — inverte o sinal do número */
    function handleInverter() {
        if (displayAtual === '0') return;
        const invertido = parseFloat(displayAtual) * -1;
        setDisplayAtual(formatarDisplay(invertido));
    }

    /** Clica em um item do histórico para reusar o resultado */
    function handleSelecionarHistorico(item) {
        const partes = item.split('=');
        const resultado = partes[partes.length - 1].trim();
        setDisplayAtual(resultado);
        setPrimeiroNum(null);
        setOperador(null);
        setAguardando(false);
        setExpressaoFinal('');
    }

    // ─── Render ──────────────────────────────────────────────────────────────
    return (
        <SafeAreaView style={styles.tela}>
            <StatusBar barStyle="light-content" backgroundColor={PRETO} />

            <View style={styles.corpo}>
                {/* getExpressao() é chamado no render — sempre sincronizado */}
                <Display expressao={getExpressao()} valor={displayAtual} />

                <Historico
                    itens={historico}
                    onLimpar={() => setHistorico([])}
                    onSelecionar={handleSelecionarHistorico}
                />

                <GradeBotoes
                    onNumero={handleNumero}
                    onOperador={handleOperador}
                    onIgual={handleIgual}
                    onLimpar={handleLimpar}
                    onCE={handleCE}
                    onPorcento={handlePorcento}
                    onInverter={handleInverter}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    tela: { flex: 1, backgroundColor: PRETO },
    corpo: { flex: 1, justifyContent: 'flex-end', backgroundColor: CINZA_MEDIO },
});
