import {Text, StyleSheet, View, ImageBackground, Pressable} from "react-native";
import {Movie} from "../Hooks/useMovies";

type Props = {
    movie : Movie
    ,onPress : () => void
}    

export function MovieTile({movie, onPress } : Props  ) {
    
    const styles = StyleSheet.create({
        container : {
            flex : 1,
            margin : 10,
            borderRadius : 10,
            backgroundColor : "#fff",
            minHeight : 50
        },
        image : {
            height : 200,
            borderRadius : 10,
            padding : 10
        },
        movieTitle : {
            color : "#fff",
            fontSize : 60,
            fontWeight : "bold"
            ,textAlign : "center"
        }
    })
    
    return (<Pressable style={styles.container} onPress={onPress}>
        <ImageBackground src={movie.poster} resizeMode={"cover"}
        style={styles.image}>
            <Text style={styles.movieTitle}>{movie.title}</Text>
        </ImageBackground>
    </Pressable>)
}