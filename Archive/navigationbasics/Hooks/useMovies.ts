export interface Movie {
    id : number;
    title : string;
    description : string;
    poster : string;
    releaseDate : string;
}

export function useMovies() {
    
    const movies : Movie[] = [
        {id : 1, title : "Movie 1", description : "Movie 1 description", poster : "https://images-na.ssl-images-amazon.com/images/M/MV5BMjEyOTYyMzUxNl5BMl5BanBnXkFtZTcwNTg0MTUzNA@@._V1_SX1500_CR0,0,1500,999_AL_.jpg", releaseDate : "2021-01-01"},
        {id : 2, title : "Movie 2", description : "Movie 2 description", poster : "https://images-na.ssl-images-amazon.com/images/M/MV5BMTI0NTI4NjE3NV5BMl5BanBnXkFtZTYwMDA0Nzc4._V1_.jpg", releaseDate : "2021-01-02"},
        {id : 3, title : "Movie 3", description : "Movie 3 description", poster : "https://images-na.ssl-images-amazon.com/images/M/MV5BMTMwNTg5MzMwMV5BMl5BanBnXkFtZTcwMzA2NTIyMw@@._V1_SX1777_CR0,0,1777,937_AL_.jpg", releaseDate : "2021-01-03"},
        {id : 4, title : "Movie 4", description : "Movie 4 description", poster : "https://images-na.ssl-images-amazon.com/images/M/MV5BMTA0NjY0NzE4OTReQTJeQWpwZ15BbWU3MDczODg2Nzc@._V1_SX1777_CR0,0,1777,999_AL_.jpg", releaseDate : "2021-01-04"}
    ];
    
    const getMovieById = (id : number) => movies.find(movie => movie.id === id);
    
    return { movies, getMovieById };
    
}