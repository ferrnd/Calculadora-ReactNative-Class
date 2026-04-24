import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { CINZA_ESCURO, BRANCO, LARANJA, VERMELHO, CINZA_CLARO } from '../styles/colors';

/**
 * Botao - Botão individual reutilizável da calculadora.
 *
 * Props:
 * - label   {string}   Texto exibido no botão (ex: "7", "+", "=")
 * - tipo    {string}   'numero' | 'operador' | 'igual' | 'limpar' | 'especial'
 * - largo   {boolean}  Se true, o botão ocupa o dobro de largura (botão "0")
 * - onPress {function} Função chamada ao pressionar
 */
export default function Botao({ Label, tipo = 'numero', Largo = false, onPress }) {
    // Escolhe a cor de fundo baseado no tipo
    const corFundo =
        {
            numero: CINZA_ESCURO,
            operador: LARANJA,
            igual: LARANJA,
            limpar: VERMELHO,
            especial: '#505050', // CE, %, +/-
        }[tipo] || CINZA_ESCURO;

    // Escolhe a cor do texto
    const corTexto = tipo === 'especial' ? CINZA_CLARO : BRANCO;

    return (
        <TouchableOpacity
            style={[styles.botao, { backgroundColor: corFundo }, Largo && styles.largo]}
            onPress={onPress}
            activeOpacity={0.7}>
            <Text style={[styles.texto, { color: corTexto }]}>{label}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    botao: {
        flex: 1,
        marginHorizontal: 6,
        marginVertical: 6,
        borderRadius: 999, // círculo perfeito
        aspectRatio: 1, // sempre quadrado -> vira círculo com borderRadius
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    // Botão largo ocupa 2 posições (ex: botão "0")
    largo: {
        flex: 2,
        aspectRatio: undefined, // desativa o 1:1 para poder ser largo
        borderRadius: 50,
        paddingHorizontal: 24,
        height: 72,
    },
    texto: {
        fontSize: 26,
        fontWeight: '500',
    },
});
//fim
