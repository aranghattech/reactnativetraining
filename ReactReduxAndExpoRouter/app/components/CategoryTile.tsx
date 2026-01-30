import {Text, StyleSheet, View, ImageBackground, Pressable} from "react-native";
import {useAppSelector} from "../../store/store";
import {Product} from "../../types/product";
import {Link} from "expo-router";

export function CategoryTile({ category }: { category: string }) {
    
    const { products } = useAppSelector(state => state.products);
    const filteredProduct: Product | undefined = products.find(product => product.category === category);
    
    return (
        <Link 
            href={{
                pathname: `/products/${category}`,
                params: {category}
            }}
            asChild
        >
            <Pressable style={styles.card}>
                <ImageBackground 
                    resizeMode="cover"
                    source={{uri: filteredProduct?.thumbnail ?? ''}}
                    style={styles.imageBackground}
                    imageStyle={styles.image}
                >
                    <View style={styles.overlay}>
                        <Text style={styles.categoryName}>{category}</Text>
                    </View>
                </ImageBackground>
            </Pressable>
        </Link>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 15,
        margin: 8,
        flex: 1,
        overflow: 'hidden',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        backgroundColor: '#fff',
        height: 150,
    },
    imageBackground: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
    },
    image: {
        borderRadius: 15,
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    categoryName: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'capitalize',
        textAlign: 'center',
    }
})
