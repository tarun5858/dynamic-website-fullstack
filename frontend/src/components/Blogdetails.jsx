import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
import RelatedBlogCards from "./RelatedBlogCards";
import {
  blogImage1,
  blogImage2,
  blogImage3,
  blogImage4,
  blogImage5,
  blogImage6,
  blogImage7,
  blogDetailImage1,
  blogDetailImage2,
  blogDetailImage3,
  blogDetailImage4,
  blogDetailImage5,
  blogDetailImage7,
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
  blogDetailBeyond,
  blogDetailNavigating,
  blogDetailNavigating2,
  blogDetailThePower,
  blogDetailUnderConstruction,
  blogDetailFinancialImplications,
  blogDetailMitigating,
  blogDetailTheFundamentals,
  blogDetailFinancialAspects,
  blogDetailBuildingWealth,
  blogDetailStrategies,
  blogDetailTheHidden,
  blogDetailAssessingPotential,
  blogDetailTheTrueCost,
  blogDetailHiddenCosts,
  blogDetailBeyondthe,
  blogImage20,
  blogImage21,
  blogImage22,
  blogDetail20,
  blogDetail21,
  blogDetail22,
  blogImage23,
  blogImage24,
  blogImage25,
  blogDetail23,
  blogDetail24,
  blogDetail25,
  blogDetail26,
  blogDetail27,
  blogDetail28,
  blogImage26,
  blogImage27,
  blogImage28,
} from "../components/Imagepath";

const imageSrc = {
  blogImage1,
  blogImage2,
  blogImage3,
  blogImage4,
  blogImage5,
  blogImage6,
  blogImage7,
  blogDetailImage1,
  blogDetailImage2,
  blogDetailImage3,
  blogDetailImage4,
  blogDetailImage5,
  blogDetailImage7,
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
  blogDetailBeyond,
  blogDetailNavigating,
  blogDetailNavigating2,
  blogDetailThePower,
  blogDetailUnderConstruction,
  blogDetailFinancialImplications,
  blogDetailMitigating,
  blogDetailTheFundamentals,
  blogDetailFinancialAspects,
  blogDetailBuildingWealth,
  blogDetailStrategies,
  blogDetailTheHidden,
  blogDetailAssessingPotential,
  blogDetailTheTrueCost,
  blogDetailHiddenCosts,
  blogDetailBeyondthe,
  blogImage20,
  blogImage21,
  blogImage22,
  blogDetail20,
  blogDetail21,
  blogDetail22,
  blogImage23,
  blogImage24,
  blogImage25,
  blogDetail23,
  blogDetail24,
  blogDetail25,
  blogDetail26,
  blogDetail27,
  blogDetail28,
  blogImage26,
  blogImage27,
  blogImage28,
};

// --- Component to Render Individual Content Blocks (NEW) ---
const ContentBlockRenderer = ({ block }) => {
  const baseStyle = { margin: "15px 0 6px 0 " };
  const baseStyle2 = { marginLeft: "0px" };

  switch (block.type) {
    case "heading":
      // Treat as a primary section title (like your old h1/h2)
      return (
        <h2 style={{ ...baseStyle, marginTop: "25px" }}>
          <b>{block.text}</b>
        </h2>
      );
    case "subheadingmain":
      // Treat as a subsection title (like your old subheading)
      return (
        <h4 style={{ ...baseStyle, marginTop: "20px" }}>
          <b>{block.text}</b>
        </h4>
      );
    case "subheading":
      // Treat as a subsection title (like your old subheading)
      return (
        <h4 style={{ ...baseStyle2, marginTop: "20px" }}>
          <b>{block.text}</b>
        </h4>
      );
    case "paragraph":
      // Standard paragraph text (like your old paragraph1, introduction, conclusion)
  
      return (
        <p
          style={baseStyle}
          dangerouslySetInnerHTML={{ __html: block.text }}
        ></p>
      );
    case "list":
      // Simple unordered bullet list
      return (
        <ul
          style={{ ...baseStyle, marginLeft: "20px", listStyleType: "circle" }}
        >
          {block.listItems.map((item, i) => (
            <li
              key={i}
              style={{ marginBottom: "5px", listStyleType: "circle" }}
            >
              {item}
            </li>
          ))}
        </ul>
      );
    case "image": {
      //  ADD OPENING CURLY BRACE HERE
      const src = imageSrc[block.imageKey]; // This is now safely scoped

      if (!src)
        return (
          <p style={{ color: "red" }}>
            Image not found for key: {block.imageKey}
          </p>
        );

      return (
        <div
          className="blog-image-container"
          style={{ margin: "20px 0", textAlign: "center" }}
        >
          <img
            src={src}
            alt="Blog content image"
            className="img-fluid my-3"
            style={{ display: "block", width: "100%", borderRadius: "8px" }}
          />
        </div>
      );
    }
    case "list-item-pair":
      // Renders your custom Name/Benefit structure (like your old subttileHead)
      return (
        <div
          className="blog-item-pair-section"
          style={{ ...baseStyle, paddingLeft: "15px" }}
        >
          {/* {block.text && <p style={{ fontWeight: '', marginBottom: '10px' }}>{block.text}</p>} */}
          {block.text && (
            <p
              style={{ fontWeight: "", marginBottom: "10px" }}
              dangerouslySetInnerHTML={{ __html: block.text }} //  UPDATED
            />
          )}
          <ul style={{ margin: 0 }}>
            {block.itemPairs.map((pair, i) => (
              <React.Fragment key={i}>
                <li style={{ listStyle: "circle" }}>
                  <dt
                    style={{
                      fontWeight: "bold",
                      marginTop: "10px",
                      color: "#000",
                    }}
                  >
                    {pair.name}
                  </dt>
                  <dd
                    style={{ marginLeft: "10px", paddingBottom: "0px" }}
                    dangerouslySetInnerHTML={{ __html: pair.benefit }} // UPDATED
                  />
                </li>
                {/* <li style={{ listStyle: "circle", marginBottom: '5px' }}>
                            <div style={{ display: 'flex' }}>
                                
                                <dt style={{ 
                                    fontWeight: 'bold', 
                                    color: '#333',
                                    marginRight: '5px', // Adds a space before the colon/content
                                }}>
                                    {pair.name}
                                </dt>
                                
                                <dd 
                                    style={{ 
                                        marginLeft: '0', // Reset default dd margin
                                        paddingBottom: '0', 
                                        flex: 1, // Allows the text to take up the remaining space
                                    }}
                                    dangerouslySetInnerHTML={{ __html: pair.benefit }}
                                />
                                
                            </div>
                        </li> */}
              </React.Fragment>
            ))}
          </ul>
        </div>
      );
    default:
      return (
        <p style={{ color: "red" }}>
          [Error: Unknown Content Type: {block.type}]
        </p>
      );
  }
};
// --- End of Content Block Renderer ---
function Blogdetails() {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [isSticky, setIsSticky] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Data Fetching (Preserved) ---
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/blogs/${id}`
        );
        if (!res.ok) throw new Error("Failed to fetch blog");

        const data = await res.json();
        const blogObject = data.data ? data.data : data;

        if (active) {
          if (blogObject && blogObject.title) {
            setBlog(blogObject);
          } else {
            throw new Error("Invalid blog data received.");
          }
        }
      } catch (e) {
        console.error("Error fetching blog details:", e);
        if (active) setError(e.message);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [id]);

  // Sticky sidebar logic (Preserved)
  useEffect(() => {
    const onScroll = () => setIsSticky(window.scrollY > 150);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  // ------------------------------------------

  if (loading) return <p>Loading blog...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!blog) return <p>No blog found.</p>;

  // Blogdetails.jsx (Inside Blogdetails component, after the initial checks)

  const injectInfographic = () => {
    // Safety check: Ensure contentBlocks exists before continuing
    if (!blog.contentBlocks || blog.contentBlocks.length === 0) {
      return blog.contentBlocks || [];
    }

    let blocks = [...blog.contentBlocks];
    const insertions = [];

    // -------------------------------------------------------------------------
    // 1. COLLECT ALL INSERTIONS (Infographic 1 & 2)
    // -------------------------------------------------------------------------

    // Infographic 1
    if (blog.infographicImageKey && blog.infographicPosition) {
      insertions.push({
        key: blog.infographicImageKey,
        position: blog.infographicPosition,
      });
    }

    // Infographic 2
    if (blog.infographicImageKey2 && blog.infographicPosition2) {
      insertions.push({
        key: blog.infographicImageKey2,
        position: blog.infographicPosition2,
      });
    }

    if (insertions.length === 0) {
      return blocks; // Nothing to insert
    }

    // Prepare helper array for index calculation
    const subheadingMainBlocks = blocks.filter(
      (b) => b.type === "subheadingmain"
    );

    // -------------------------------------------------------------------------
    // 2. CALCULATE INDEX FOR EACH ITEM
    // -------------------------------------------------------------------------

    const indexedInsertions = insertions
      .map((insertion) => {
        const { position, key } = insertion;
        let insertionIndex = -1;

        // --- Dynamic Parsing for subheadingmain positions (e.g., 'before-subheadingmain-3') ---
        const subheadingMatch = position.match(/^before-subheadingmain-(\d+)$/);

        if (subheadingMatch) {
          const targetNumber = parseInt(subheadingMatch[1], 10);
          const targetIndex = targetNumber - 1;

          // Check if the target exists in the filtered array
          if (targetIndex >= 0 && targetIndex < subheadingMainBlocks.length) {
            const targetBlock = subheadingMainBlocks[targetIndex];
            insertionIndex = blocks.indexOf(targetBlock);
          } else {
            console.warn(
              `[Infographic Skip] Key: ${key}. Target subheadingmain-${targetNumber} not found in content (only ${subheadingMainBlocks.length} available).`
            );
          }
        }
        // --- Handle other specific positions ---
        else {
          switch (position) {
            case "after-introduction": {
              const firstParagraphIndex = blocks.findIndex(
                (b) => b.type === "paragraph"
              );
              if (firstParagraphIndex !== -1) {
                insertionIndex = firstParagraphIndex + 1;
              }
              break;
            }
            case "before-conclusion":
              insertionIndex = blocks.length > 0 ? blocks.length - 1 : -1;
              break;
            case "bottom-of-blog":
              insertionIndex = blocks.length;
              break;
          }
        }

        return { key, index: insertionIndex };
      })
      .filter((item) => item.index !== -1); // Filter out items that failed to find a spot

    // -------------------------------------------------------------------------
    // 3. SORT & PERFORM INSERTION (Highest Index First)
    // -------------------------------------------------------------------------

    // Sort descending by index: ensures inserting at index 10 doesn't affect an item targeted for index 5.
    indexedInsertions.sort((a, b) => b.index - a.index);

    indexedInsertions.forEach(({ key, index }) => {
      const infographicBlock = { type: "image", imageKey: key };
      const safeIndex = Math.min(Math.max(0, index), blocks.length);

      blocks.splice(safeIndex, 0, infographicBlock);
      console.log(
        `[Infographic Success] Inserted ${key} at index ${safeIndex}.`
      );
    });

    return blocks;
  };

  const finalBlocksToRender = injectInfographic();

  const heroImageUrl = imageSrc[blog.imageKey] || blog.imageUrl;

  return (
    <div className="blog-detail">
      {/* 1. Header Section (Preserving your structure) */}
      <div className="blogdetail-subhead">
        <div className="container">
          {/* Note: In the new schema, the main heading is likely `blog.title` or the first content block. 
                     I'll keep `blog.heading` for alignment with your old code, but it should be removed later. */}
          <div className="col-lg-10">
            <h1 className="blog-head">{blog.title && blog.detailpagetitle}</h1>
            <div className="blog-date">
              <b>{blog.date.replace(" ", ", ") || ""} </b>{" "}
              <span style={{ marginLeft: "1%" }}>{blog.readTime} min read</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container ">
        <div className="row d-flex">
          <div
            className="blog-text col-sm-12 col-md-6 col-lg-8 "
            style={{ paddingRight: "5%", marginBottom: "3%" }}
          >
            {/* Hero Image (Preserved) */}
            {heroImageUrl && (
              <img
                src={heroImageUrl}
                alt={blog.title}
                className="blog-detail-image img-fluid"
                style={{ marginBottom: "20px", borderRadius: "10px" }}
              />
            )}

            {/*  2. THE DYNAMIC CONTENT BLOCK RENDERING  */}
            {Array.isArray(finalBlocksToRender) &&
              finalBlocksToRender.map((block, index) => (
                // Use a key that is unlikely to change, or use the index if blocks are static
                <ContentBlockRenderer
                  key={`block-${index}-${block.type}`}
                  block={block}
                />
              ))}
            {/*  END OF DYNAMIC BLOCK RENDERING */}

            {/* 3. Legacy/Related Fields (Preserved for compatibility, but recommend moving them into contentBlocks) */}

            {blog.nextSeries && (
              <p>
                <h4>Next in Our Series:</h4> {blog.nextSeries}
              </p>
            )}
          </div>

          {/* 4. Sidebar (Preserved) */}
          <div className="col-sm-12 col-md-6 col-lg-4 sticky-blogs">
            <aside
              id="sidebar"
              className={`sidebar ${isSticky ? "sticky" : ""}`}
            >
              <h4>Related blogs</h4>
              <RelatedBlogCards
                currentHeading={blog.heading}
                currentTags={blog.blogTags}
                currentId={blog._id}
                time={blog.readTime}
                currentBlog={blog}
              />
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blogdetails;
