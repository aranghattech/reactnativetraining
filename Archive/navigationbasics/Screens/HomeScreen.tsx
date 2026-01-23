import {Alert, FlatList, Text} from "react-native";
import {useMovies} from "../Hooks/useMovies";
import {MovieTile} from "../Components/MovieTile";
import {useNavigation} from "@react-navigation/native";


export function HomeScreen() {
    
    const {movies} = useMovies();
    const navigation = useNavigation();
    
    function onPressMovie(movieId : number) {
        navigation.navigate('MovieDetails', {movieId});
    }
    
    return (<>
      <FlatList data={movies} renderItem=
          {item => 
              (<MovieTile movie={item.item} 
                          onPress={() => onPressMovie(item.item.id)}/> )}/>
    </>)
}