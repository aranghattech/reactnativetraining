import {Text,ImageBackground,StyleSheet} from "react-native";
import {useEffect, useState} from "react";
import {Movie, useMovies} from "../Hooks/useMovies";

export function MovieDetailsScreen({route} : {route : any}) {

    const [selectedMovie, setSelectedMovie] = useState<Movie>();
    const {getMovieById} = useMovies();
    
    useEffect(() => {
        var movieId = route.params.movieId;
        var movie = getMovieById(movieId);
        setSelectedMovie(movie);
    }, []);
    
    const style = StyleSheet.create({
        container : {
            flex : 1,
        },
        movieTitle : {
            color : "#fff",
            fontSize : 60,
            fontWeight : "bold"
        }
    })
    
    return (
         <ImageBackground style={style.container} 
                          src={selectedMovie?.poster} resizeMode={"cover"}>
             <Text style={style.movieTitle}>{selectedMovie?.title}</Text>
    </ImageBackground>)
}