import {Product} from "../types/Product";
import {View, Text, StyleSheet, Image} from "react-native";

export type ProductCardProps = {
    product: Product,
    onPress: () => void
    isPromoted?: boolean
}

export const ProductCard = ({product, onPress, isPromoted}: ProductCardProps) => {
    return (
       <View style={style.container}>
           <Image src={product.thumbnail} style={{height: 100, width: 100}}/>
           <Text>{product.title}</Text>
           <Text>{product.description}</Text>
       </View>
    )
    
}

const style = StyleSheet.create({
    container: {
        padding: 10,
        margin: 10,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 10,
        backgroundColor: "white",
        flexDirection: "row"
    }
})