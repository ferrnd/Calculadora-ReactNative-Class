import { View, StyleSheet } from 'react-native';
import Botao from './Botao';

/**
 * GradeBotoes - O teclado completo da calculadora.
 *
 * Recebe handlers separados para cada tipo de ação:
 * - onNumero   {function(string)}  chamado ao pressionar número ou "."
 * - onOperador {function(string)}  chamado ao pressionar +, -, *, /
 * - onIgual    {function}          chamado ao pressionar =
 * - onLimpar   {function}          chamado ao pressionar C (limpar tudo)
 * - onCE       {function}          chamado ao pressionar CE (apaga último dígito)
 * - onPorcento {function}          chamado ao pressionar %
 * - onInverter {function}          chamado ao pressionar +/- (inverte o sinal)
 */
export default function GradeBotoes({
    onNumero,
    onOperador,
    onIgual,
    onLimpar,
    onCE,
    onPorcento,
    onInverter,
}) {
    return (
        <View style={styles.grade}>
            {/* Linha 1: funções especiais + divisão */}
            <View style={styles.linha}>
                <Botao label="C" tipo="limpar" onPress={onLimpar} />
                <Botao label="CE" tipo="especial" onPress={onCE} />
                <Botao label="%" tipo="especial" onPress={onPorcento} />
                <Botao label="÷" tipo="operador" onPress={() => onOperador('/')} />
            </View>

            {/* Linha 2: 7 8 9 x */}
            <View style={styles.linha}>
                <Botao label="7" tipo="numero" onPress={() => onNumero('7')} />
                <Botao label="8" tipo="numero" onPress={() => onNumero('8')} />
                <Botao label="9" tipo="numero" onPress={() => onNumero('9')} />
                <Botao label="x" tipo="operador" onPress={() => onOperador('*')} />
            </View>

            {/* Linha 3: 4 5 6 - */}
            <View style={styles.linha}>
                <Botao label="4" tipo="numero" onPress={() => onNumero('4')} />
                <Botao label="5" tipo="numero" onPress={() => onNumero('5')} />
                <Botao label="6" tipo="numero" onPress={() => onNumero('6')} />
                <Botao label="-" tipo="operador" onPress={() => onOperador('-')} />
            </View>

            {/* Linha 4: 1 2 3 + */}
            <View style={styles.linha}>
                <Botao label="1" tipo="numero" onPress={() => onNumero('1')} />
                <Botao label="2" tipo="numero" onPress={() => onNumero('2')} />
                <Botao label="3" tipo="numero" onPress={() => onNumero('3')} />
                <Botao label="+" tipo="operador" onPress={() => onOperador('+')} />
            </View>

            {/* Linha 5: +/- 0(largo) . = */}
            <View style={styles.linha}>
                <Botao label="+/-" tipo="especial" onPress={onInverter} />
                <Botao label="0" tipo="numero" largo onPress={() => onNumero('0')} />
                <Botao label="." tipo="numero" onPress={() => onNumero('.')} />
                <Botao label="=" tipo="igual" onPress={onIgual} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    grade: {
        paddingHorizontal: 8,
        paddingBottom: 24,
    },
    linha: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
});
