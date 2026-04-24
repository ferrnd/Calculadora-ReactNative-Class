import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { CINZA_ESCURO, CINZA_CLARO, BRANCO, LARANJA, PRETO } from '../styles/colors';

/**
 * Historico - Lista das últimas operações realizadas.
 *
 * Props:
 * - itens        {string[]} Array de strings ("8 + 3 = 11")
 * - onLimpar     {function} Limpa o histórico
 * - onSelecionar {function} Clica em um item para reusar o resultado
 */
export default function Historico({ itens, onLimpar, onSelecionar }) {
    // Se não tiver histórico, exibe mensagem vazia
    if (itens.length === 0) {
        return (
            <View style={styles.vazio}>
                <Text style={styles.vazioTexto}>Nenhum cálculo ainda</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Cabeçalho */}
            <View style={styles.cabecalho}>
                <Text style={styles.titulo}>📄 Histórico</Text>
                <TouchableOpacity onPress={onLimpar}>
                    <Text style={styles.limpar}>Limpar</Text>
                </TouchableOpacity>
            </View>

            {/* Lista de operações (as mais recentes aparecem no topo) */}
            <FlatList
                data={[...itens].reverse()} // inverte para mostrar o mais novo primeiro
                keyExtractor={(_, index) => String(index)}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.item} onPress={() => onSelecionar(item)}>
                        <Text style={styles.itemTexto}>{item}</Text>
                    </TouchableOpacity>
                )}
                style={styles.lista}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: CINZA_ESCURO,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: 200,
        paddingHorizontal: 16,
        paddingTop: 12,
    },
    cabecalho: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    titulo: { color: BRANCO, fontWeight: '700', fontSize: 14 },
    limpar: { color: LARANJA, fontSize: 13 },
    lista: { marginBottom: 8 },
    item: {
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#444',
    },
    itemTexto: { color: CINZA_CLARO, fontSize: 16, textAlign: 'right' },
    // Estado vazio
    vazio: {
        paddingVertical: 12,
        alignItems: 'center',
        backgroundColor: CINZA_ESCURO,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    vazioTexto: { color: '#555', fontSize: 13 },
});
// fim
