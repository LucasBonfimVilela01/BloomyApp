import { ScreenContainer, UnidadeItem } from "@/assets/components";
import { default as React } from 'react';
import { StyleSheet, Text, View } from "react-native";

export default function MatematicaPage() {
    return (
        <ScreenContainer>
            <View style={pageStyles.container}>
                <View style={pageStyles.titleContainer}>
                    <Text style={pageStyles.titleText}>Unidades - Matemática</Text>
                </View>

                <View style={pageStyles.contentContainer}>
                    <UnidadeItem
                        numero={1}
                        descricao="Primeiros passos, começando pelo básico. Aprenda os conceitos fundamentais. "
                        rota="/FaseMatematica"
                        progressArray={[1, 0, 0]}
                    />
                    
                    <UnidadeItem
                        numero={2}
                        descricao="Operações básicas e resolução de problemas simples."
                        rota="/mainpage"
                        progressArray={[0, 0, 0, 0]}
                    />
                    
                    <UnidadeItem
                        numero={3}
                        descricao="Álgebra introdutória e equações do primeiro grau."
                        rota="/mainpage"
                        progressArray={[0, 0, 0, 0]}
                    />
                    
                    <UnidadeItem
                        numero={4}
                        descricao="Geometria básica: formas, áreas e perímetros."
                        rota="/mainpage"
                        progressArray={[0, 0, 0, 0]}
                    />
                </View>
            </View>
        </ScreenContainer>
    );
}

const pageStyles = StyleSheet.create({
    container: {
        width: '80%',
        flex: 1,
        alignSelf: 'center',
        alignItems: 'center',
    },
    titleContainer: {
        marginVertical: 15,
    },
    titleText: {
        fontSize: 32,
        color: '#7253B5',
        fontFamily: 'LuckiestGuy-Regular',
    },
    contentContainer: {
        flex: 1,
        width: '90%',
    },
});