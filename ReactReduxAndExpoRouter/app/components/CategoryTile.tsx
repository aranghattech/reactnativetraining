import {Text, StyleSheet, View, Image, ImageBackground} from "react-native";
import {useAppSelector} from "../../store/store";
import {Product} from "../../types/product";
import {Link} from "expo-router";
export function CategoryTile({ category }: { category: string }) {
    
    const { products } = useAppSelector(state => state.products);
    const filteredProduct:Product|undefined = products.find(product => product.category === category);
    
    return (<Link style={styles.card}
     href={{
         pathname: `/products/${category}`,
         params: {category}
     }}
    >
        <ImageBackground 
            resizeMode="cover"
            source={{uri: filteredProduct?.thumbnail ?? ''}}
            style={{width: 100, height: 100}}
        />
        <Text>{category}</Text>
    </Link>)
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        borderWidth: 1,
        padding: 10,
        margin: 5,
        borderColor : 'tomato',
        width : '100%',
    }
})
