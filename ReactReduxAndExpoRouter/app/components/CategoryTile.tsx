import {Text, StyleSheet, View} from "react-native";
export function CategoryTile({ category }: { category: string }) {
    return (<View style={styles.card}>
        <Text>{category}</Text>
    </View>)
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        borderWidth: 1,
        padding: 10,
        margin: 5,
        borderColor : 'tomato',
        width : '100%'
    }
})
