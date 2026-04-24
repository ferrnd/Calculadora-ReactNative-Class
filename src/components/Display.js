import { View, Text, StyleSheet } from 'react-native';
import { PRETO, BRANCO, CINZA_CLARO } from '../styles/colors';

/**
 * Display - A "tela" da calculadora.
 *
 * Props:
 * - expressao  {string}  Ex: "8 + 3"    (linha menor acima)
 * - valor      {string}  Ex: "3"        (número atual em destaque)
 */
export default function Display({ expressao, valor }) {
    // Ajusta o tamanho da fonte conforme o comprimento, mas o container é fixo
    const tamFonte = valor.length > 9 ? 32 : valor.length > 6 ? 42 : 56;

    return (
        <View style={styles.container}>
            {/* Linha superior: expressão em andamento */}
            <Text style={styles.expressao} numberOfLines={1} adjustsFontSizeToFit>
                {expressao || ' '}
            </Text>

            {/* Linha principal: número atual - altura fixa, fonte ajustável */}
            <View style={styles.valorContainer}>
                <Text
                    style={[styles.valor, { fontSize: tamFonte }]}
                    numberOfLines={1}
                    adjustsFontSizeToFit>
                    {valor}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: PRETO,
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 20,
        height: 160, // <- altura fixa - não muda ao digitar
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    expressao: {
        fontSize: 20,
        color: CINZA_CLARO,
        marginBottom: 8,
        width: '100%',
        textAlign: 'right',
    },
    valorContainer: {
        height: 70, // <- caixa fixa para o número principal
        justifyContent: 'center',
        alignItems: 'flex-end',
        width: '100%',
    },
    valor: {
        color: BRANCO,
        fontWeight: '300',
        letterSpacing: -1,
        textAlign: 'right',
    },
});
// fim
