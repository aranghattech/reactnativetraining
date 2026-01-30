import {Text, View} from "react-native";
import {useLocalSearchParams} from "expo-router";

export default function Products() {
    const {category} = useLocalSearchParams();
  return <View>
      <Text>Products of {category}</Text>
  </View>
}