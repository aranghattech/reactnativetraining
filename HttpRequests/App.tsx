import { StatusBar } from 'expo-status-bar';
import {Alert, FlatList, StyleSheet, Text, View, ImageBackground, Image} from 'react-native';
import {SafeAreaProvider} from "react-native-safe-area-context";
import {useProducts} from "./hooks/useProducts";
import {ActivityIndicator, MD2Colors, PaperProvider, Appbar} from "react-native-paper";
import {ProductCard} from "./components/ProductCard";

const imageUrl = {uri : "https://images.unsplash.com/photo-1580828343064-fde4fc206bc6?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
export default function App() {
  
  const {isLoading, products, error} = useProducts()  
  
  return (
      <SafeAreaProvider>
        <PaperProvider>
          <Appbar.Header>
            <Appbar.Content title="My Ecommerce" />
          </Appbar.Header>
        
            <View style={styles.container}>
              <View>
                <Image  src={imageUrl.uri}
                        style={{flex: 1, height: 100, width: 500}}
                        resizeMode={"cover"}
                />
              </View>
              <View>
                {isLoading ? <ActivityIndicator animating={true} size={30} 
                                                color={MD2Colors.blue200} /> : 
                    <FlatList data={products} renderItem={({item} ) => 
                                <ProductCard product={item}
                                             onPress={() => Alert.alert("YOu selecged a product")}/> } />
              }
              </View>
            </View>
        </PaperProvider>
      </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
