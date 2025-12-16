// import "../App.css";
import { Link } from "react-router-dom";
import {
  blogImage1,
  blogImage2,
  blogImage3,
  blogImage4,
  blogImage5,
  blogImage6,
  blogImage7,
  blogImagestrategies,
  blogImagelongterm,
blogImagedownpayments,
blogImagerentbuy,
blogImageMitigating,
blogImageUnderCons,
blogImageHiddenValue,
blogImageAssessing,
blogImageFinancial,
blogImageFundamentals,
blogImageFinancialaspects,
blogImageHomeownership,
blogImageTruecost,
blogImageHiddencosts,
blogImageBeyond,
blogImage20,
blogImage21,
blogImage22,
blogImage23,
blogImage24,
blogImage25,
blogImage26,
blogImage27,
blogImage28
} from "./Imagepath";



const BlogCard = ({ blog }) => {

  const imageSrc = {
     blogImage1,
  blogImage2,
  blogImage3,
  blogImage4,
  blogImage5,
  blogImage6,
  blogImage7,
  blogImagestrategies,
  blogImagelongterm,
blogImagedownpayments,
blogImagerentbuy,
blogImageMitigating,
blogImageUnderCons,
blogImageHiddenValue,
blogImageAssessing,
blogImageFinancial,
blogImageFundamentals,
blogImageFinancialaspects,
blogImageHomeownership,
blogImageTruecost,
blogImageHiddencosts,
blogImageBeyond,
blogImage20,
blogImage21,
blogImage22,
blogImage23,
blogImage24,
blogImage25,
blogImage26,
blogImage27,
blogImage28
}

  const imageUrl = blog.imageKey && imageSrc[blog.imageKey] ? imageSrc[blog.imageKey] : blogImage1;

  return (     
    <div className="blog-card col-xs-12 col-sm-12 col-md-6 col-lg-4 mb-5 mt-2">
      <Link to={`/blog/${blog._id}`} className="blog-link">
        {" "}
        <h3 className="blog-title">{blog.title}</h3>
      </Link>
      <Link to={`/blog/${blog._id}`} className="blog-link">
        {" "}
        <img src={imageUrl} alt={blog.title} className="blog-image" />
      </Link>

      <div className="blog-meta">
        <span>{blog.date}</span>
        <span> {blog.readTime} min read</span>
      </div>
      <Link to={`/blog/${blog._id}`} className="blog-link">
        {" "}
        <p className="blod-desc">{blog.description}</p>
      </Link>

     
    </div>
  );
};

export default BlogCard;
