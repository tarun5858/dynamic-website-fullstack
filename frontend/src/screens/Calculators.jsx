import CalculatorCard from "../components/CalculatorCard";
import LargeCtaRoutes from "../components/LargeCtaRoutes";
import { useState, useEffect } from "react";
import useFetchLatestBlogs from "../components/useFetchLatestBlogs";
import BlogCard from "../components/Blogcard";
import { prefooterDesktop, prefooterMobile } from "../components/Imagepath";

const Calculators = () => {
  const { blogs, loading, error } = useFetchLatestBlogs();

  const [bgImage, setBgImage] = useState(prefooterDesktop);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setBgImage(prefooterMobile);
      } else {
        setBgImage(prefooterDesktop);
      }
    };
    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <section className="about-wrapper pt-2 ">
        <div className="container container-lg">
          <h2 className="calculator-subhead">
            Explore our calculators designed to simplify your journey to
            ownership
          </h2>
          
        </div>
      </section>
      <section className="">
        <div className="container">
          <CalculatorCard></CalculatorCard>
        </div>
      </section>

      <section className=" pt-5 ">
        <div className="container blog-container ">
          <h1
            className=" mb-4"
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              textAlign: "left",
              alignSelf: "left",
            }}
          >
            Latest blogs
          </h1>

          <div className="row">
            {loading && <p className="text-center">Loading latest blogs...</p>}
            {error && (
              <p className="text-danger text-center">
                Error loading blogs: {error}
              </p>
            )}

            {!loading && blogs.length === 0 && (
              <p className="text-muted text-center">No blogs found.</p>
            )}

            {/* Blog Cards */}
            <div className="blog-cards-container">
              <div className="row blog-cards-row">
                <div className="blog-cards-parent">
                  {blogs.map((blog) => (
                    <BlogCard
                      key={blog.id}
                      title={blog.title}
                      excerpt={blog.excerpt}
                      date={blog.date}
                      slug={blog.slug}
                      // imageKey={blog.imageKey}
                      blog={blog}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pre-footer">
        <div
          className="container pre-footer-container text-center"
          style={{
            backgroundImage: `url(${bgImage})`,
            height: "228px",
            width: "83%",
            backgroundRepeat: "no-repeat",
          }}
        >
          <h1>
            Learn how we unlock your path to <br /> homeownership.
          </h1>
          <div className="header-right-element d-flex align-items-end justify-content-center">
            <LargeCtaRoutes
              text="Learn more"
              to="/blog"
              style={{ width: "272px", height: "62px", fontSize: "16px" }}
            ></LargeCtaRoutes>
          </div>
        </div>
      </section>
    </>
  );
};
export default Calculators;
