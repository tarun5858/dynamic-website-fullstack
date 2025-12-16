import { useState, useEffect } from 'react';

// Replace with your actual API endpoint URL
const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/blogs`; 

const useFetchLatestBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);

      try {
        const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/blogs`;
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();

        // Determine Blog Array (Handles API wrapping data in a 'data' property)
        const blogsArray = data.data && Array.isArray(data.data) 
                          ? data.data 
                          : (Array.isArray(data) ? data : []);
        
        if (blogsArray.length === 0) {
            console.warn("API returned successful response but the blog array is empty or misstructured.");
        }

        // 1. Sort blogs by date (newest first)
        const sortedData = [...blogsArray].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        // 2. CRITICAL CHANGE: Slice the sorted array to get only the first 3 elements
        const latestThreeBlogs = sortedData.slice(0, 3);

        setBlogs(latestThreeBlogs);
        setError(null); // Clear any previous errors
        
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError(err.message || "Failed to fetch blogs.");
        setBlogs([]); // Ensure blogs array is empty on error
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return { blogs, loading,error };
};

export default useFetchLatestBlogs;