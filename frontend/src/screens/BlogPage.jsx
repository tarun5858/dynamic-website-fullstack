import { useState, useEffect, useRef } from "react";
import BlogCard from "../components/Blogcard";
import TopicBarCta from "../components/TopicBarCta";
import "../App.css";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [topics, setTopics] = useState(["ALL BLOGS"]);
  const [activeTopic, setActiveTopic] = useState("ALL BLOGS");
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef(null);
  const scrollAmount = 150;

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true); // Ensure loading is true before fetch

      //       try {
      //         const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/api/blogs`;
      //         // const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/api/blogs`;
      //         const response = await fetch(apiUrl);

      //         // --- CRITICAL CHECK: Handle HTTP Errors ---
      //         if (!response.ok) {
      //           throw new Error(`HTTP error! Status: ${response.status}`);
      //         }

      //         const data = await response.json();
      //         console.log("Fetched data object:", data);

      //         // --- CRITICAL CHANGE: Determine Blog Array ---
      //         // 1. Try accessing data.data (if your API wraps the array)
      //         // 2. Fall back to data (if your API returns the array directly)
      //         const blogsArray =
      //           data.data && Array.isArray(data.data)
      //             ? data.data
      //             : Array.isArray(data)
      //             ? data
      //             : [];

      //         console.log("Blogs array for state:", blogsArray);

      //         if (blogsArray.length === 0) {
      //           console.warn(
      //             "API returned successful response but the blog array is empty or misstructured."
      //           );
      //         }

      //         // Sort blogs by date (newest first) - Logic is correct
      //         const sortedData = [...blogsArray].sort(
      //           (a, b) => new Date(b.date) - new Date(a.date)
      //         );

      //         setBlogs(sortedData);

      //         // Build topic list dynamically
      // //         setTopics((prevTopics) => {
      // //           const currentTopics = new Set(prevTopics);
      // //           const newTopics = [];

      // //           blogsArray.forEach((blog) => {
      // //             if (blog.topic) {
      // //   const topic = blog.topic.trim();
      // //   if (!currentTopics.has(topic)) {
      // //     currentTopics.add(topic);
      // //     newTopics.push(topic);
      // //   }
      // // }
      // //           });

      // //           return prevTopics.length === 0
      // //             ? ["ALL BLOGS", ...newTopics]
      // //             : [...prevTopics, ...newTopics];
      // //         });
      // setTopics((prevTopics) => {
      //   const currentTopics = new Set(prevTopics);
      //   const newTopics = [];

      //   blogsArray.forEach((blog) => {
      //     // --- 1. Add single topic field ---
      //     if (blog.topic) {
      //       const t = blog.topic.trim();
      //       if (!currentTopics.has(t)) {
      //         currentTopics.add(t);
      //         newTopics.push(t);
      //       }
      //     }

      //     // --- 2. Add blogTags if they exist ---
      //     if (blog.blogTags) {
      //       let tags = [];

      //       if (typeof blog.blogTags === "string") {
      //         tags = blog.blogTags.split(",").map((s) => s.trim());
      //       } else if (Array.isArray(blog.blogTags)) {
      //         tags = blog.blogTags.map((s) => s.trim());
      //       }

      //       tags.forEach((tag) => {
      //         if (tag && !currentTopics.has(tag)) {
      //           currentTopics.add(tag);
      //           newTopics.push(tag);
      //         }
      //       });
      //     }
      //   });

      //   return prevTopics.length === 0
      //     ? ["ALL BLOGS", ...newTopics]
      //     : [...prevTopics, ...newTopics];
      // });

      //         setLoading(false);
      //       } catch (err) {
      //         console.error("Error fetching blogs:", err);
      //         setLoading(false);
      //
      try {
        const apiUrl = `${
          import.meta.env.VITE_API_BASE_URL
        }/api/blogs?limit=500`;
        const response = await fetch(apiUrl);

        // Handle HTTP Errors
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched data object:", data);

        // Determine Blog Array
        const blogsArray =
          data.data && Array.isArray(data.data)
            ? data.data
            : Array.isArray(data)
            ? data
            : [];

        console.log("Blogs array for state:", blogsArray);

        if (blogsArray.length === 0) {
          console.warn(
            "API returned successful response but the blog array is empty or misstructured."
          );
        }

        // Sort blogs by newest first
        const sortedData = [...blogsArray].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        setBlogs(sortedData);

        // -----------------------------------------
        // BUILD TOPICS CLEANLY (NO DUPLICATES)
        // -----------------------------------------

        const topicSet = new Set();
        topicSet.add("ALL BLOGS");

        blogsArray.forEach((blog) => {
          // 1. Add the new "topic" field
          if (blog.topic && blog.topic.trim() !== "") {
            topicSet.add(blog.topic.trim().toUpperCase());
          }

          // 2. Add blogTags (old blogs)
          if (blog.blogTags) {
            let tags = [];

            if (typeof blog.blogTags === "string") {
              tags = blog.blogTags.split(",").map((t) => t.trim());
            } else if (Array.isArray(blog.blogTags)) {
              tags = blog.blogTags.map((t) => t.trim());
            }

            tags.forEach((tag) => {
              if (tag !== "") topicSet.add(tag);
            });
          }
        });

        // Convert set to array and update
        setTopics([...topicSet]);
// .reverse()
        // -----------------------------------------

        setLoading(false);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const filteredBlogs =
    activeTopic && activeTopic !== "ALL BLOGS"
      ? blogs.filter((blog) => {
          const targetTopic = activeTopic.toUpperCase(); // Topic from the bar (e.g., 'F.I.R.E')

          // Check against the singular topic field
          const matchesTopic =
            blog.topic && blog.topic.toUpperCase() === targetTopic; // ⭐ Check blog.topic in uppercase

          // ... (rest of the tag matching logic)

          return matchesTopic;
        })
      : blogs;

  if (loading) {
    return <p className="text-center mt-5">Loading blogs...</p>;
  }

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="container blog-container">
      <h2 className="blog-head">
        Everything you need to know about homeownership
      </h2>

      {/* Topic Filter Buttons */}
      <div className="row align-center d-flex mt-5">
        <div className="col-12 pb-3 mt-3 mb-3">
          <div className="case-cat-filter d-flex">
            <div className="icon-box">
              <i
                className="fas fa-chevron-left scroll-left"
                style={{ cursor: "pointer" }}
                onClick={scrollLeft}
              ></i>{" "}
            </div>
            {/* <div className="topic-cta-container mb-4"> */}
            <div
              className="case-cat-filter-scroll-width"
              ref={scrollContainerRef}
              id="scrollContainer"
            >
              {[
                "ALL BLOGS",
                ...[...topics.filter((t) => t !== "ALL BLOGS")],
              ].map((topic, index) => (
                <TopicBarCta
                  key={index}
                  topic={topic}
                  isActive={activeTopic === topic}
                  onClick={() => setActiveTopic(topic)}
                />
              ))}
            </div>

            {/* </div> */}
            <div className="icon-box">
              <i
                className="fas fa-chevron-right scroll-right"
                style={{ cursor: "pointer" }}
                onClick={scrollRight}
              ></i>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Cards */}
      <div className="blog-cards-container">
        <div className="row blog-cards-row">
          <div className="blog-cards-parent">
            {filteredBlogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
