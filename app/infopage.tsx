import { ScreenContainer } from "@/assets/components";
import { StyleSheet, Text, View } from "react-native";

export default function InfoPage() {
    return (
        <ScreenContainer style={{ justifyContent: 'center', alignItems: 'center' }}>
            <View style={styles.maincontainer}>
                <Text style={styles.title}>informações 1</Text>
                <View style={styles.textcontainer}>
                    <Text>Informações 1</Text>
                 </View>
                 <Text style={styles.title}>informações 2</Text>
                <View style={styles.textcontainer}>
                    <Text>Informações 2</Text>
                 </View>  
            </View>
        </ScreenContainer>
    )
}


const styles = StyleSheet.create({
    maincontainer: {
        flex: 0.8,
        width: '80%',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        marginBottom: 20,
        color: '#623DB3',
        fontFamily: 'LuckiestGuy-Regular',
    },
    textcontainer: {
        width: '100%',
        maxWidth: 400,
        alignItems: 'center',
    },
});
