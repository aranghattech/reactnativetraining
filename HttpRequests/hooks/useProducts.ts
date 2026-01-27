import {useEffect, useState} from "react";
import {Product} from "../types/Product";

export function useProducts() {
    
    const apiUrl = "https://dummyjson.com/products";
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [products, setProducts] = useState<Product[]>([]);
    
    useEffect(() => {
        
        fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => setProducts(data.products))
        .catch(error => setError(error))
        .finally(() => setIsLoading(false));
        
    }, [])
    
    return {products, isLoading};
}