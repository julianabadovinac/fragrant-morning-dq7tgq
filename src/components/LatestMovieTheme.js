import { useEffect, useState } from "react";
import axios from "axios";

const LatestMovieTheme = ({ setThemeTitle }) => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLatestPost = async () => {
      try {
        console.log("📡 Fetching latest WordPress post...");
        const response = await axios.get(
          "https://public-api.wordpress.com/wp/v2/sites/badovinacca.wordpress.com/posts?per_page=1&_embed"
        );

        if (response.data.length === 0) {
          throw new Error("No posts found.");
        }

        const post = response.data[0];
        const cleanTitle = post.title.rendered
          .replace(/&nbsp;/g, " ")
          .replace(/&#8217;/g, "'");
        setTitle(cleanTitle);
        if (setThemeTitle) {
          setThemeTitle(cleanTitle);
        }

        if (post.jetpack_featured_media_url) {
          setImage(post.jetpack_featured_media_url);
          console.log("🖼 Image URL:", post.jetpack_featured_media_url);
        } else {
          console.warn("⚠️ No Jetpack featured image found.");
          setImage(null);
        }

        setLoading(false);
      } catch (error) {
        console.error("❌ Error fetching latest post:", error);
        setError("Error fetching latest post.");
        setLoading(false);
      }
    };

    fetchLatestPost();
  }, [setThemeTitle]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {image ? (
        <img src={image} alt="Movie Theme" className="theme-image" />
      ) : (
        <p>No featured image available.</p>
      )}
      <h2>{title}</h2>
    </div>
  );
};

export default LatestMovieTheme;
