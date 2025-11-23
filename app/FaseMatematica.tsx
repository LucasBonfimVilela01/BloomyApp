import { CustomButton, FaseCard, ScreenContainer } from "@/assets/components";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function FaseMatematica() {
    return (
        <ScreenContainer>
            <View style={pageStyles.container}>
                <View style={pageStyles.titleContainer}>
                    <Text style={pageStyles.titleText}>Unidade 1 - Matemática</Text>
                </View>

                <View style={pageStyles.contentContainer}>
                    <View style={pageStyles.cardsContainer}>
                        <FaseCard
                            numero={1}
                            titulo="Fase 1"
                            descricao="Somando"
                            imagem={require('@/assets/images/MatériaMatemática.png')}
                            rota="/BlankPage"
                            bloqueado={false}
                        />
                        <FaseCard
                            numero={2}
                            titulo="Fase 2"
                            descricao="Subtraindo"
                            imagem={require('@/assets/images/MatériaMatemática.png')}
                            rota="/mainpage"
                            bloqueado={true}
                        />
                        <FaseCard
                            numero={3}
                            titulo="Fase 3"
                            descricao="Multiplicando"
                            imagem={require('@/assets/images/MatériaMatemática.png')}
                            rota="/mainpage"
                            bloqueado={true}
                        />
                    </View>
                    <View style={pageStyles.buttonContainer}>
                        <CustomButton
                            title="Teste"
                            onPress={() => router.push('/testepage')}
                            variant="primary"
                        />
                    </View>
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
        marginBottom: 15,
    },  
    titleText: {
        fontSize: 32,
        color: '#7253B5',
        fontFamily: 'LuckiestGuy-Regular',
    },
    contentContainer: {
        flex: 1,
        height: 280,
        width: '80%',
        justifyContent: 'space-between',
    },
    cardsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: '70%',
        justifyContent: 'space-between',
    },
    buttonContainer: {
        marginHorizontal: 'auto',
        width: '40%',
    },
});
