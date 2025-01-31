import { useEffect, useState } from "react";
import axios from "axios";

const YOUTUBE_API_KEY = "AIzaSyCASa6BztczVMCdxOWsUCoEkByi_i-sMZg"; // 🔹 Replace this with your actual API key

const YouTubeTrailer = ({ movieTitle }) => {
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrailer = async () => {
      if (!movieTitle) return;

      try {
        console.log(`🎬 Searching YouTube for: ${movieTitle} trailer...`);

        const response = await axios.get(
          "https://www.googleapis.com/youtube/v3/search",
          {
            params: {
              key: YOUTUBE_API_KEY,
              q: `${movieTitle} official trailer`,
              part: "snippet",
              maxResults: 1,
              type: "video",
            },
          }
        );

        if (response.data.items.length > 0) {
          const videoId = response.data.items[0].id.videoId;
          setTrailerUrl(`https://www.youtube.com/embed/${videoId}`);
          console.log(`✅ Trailer found: ${trailerUrl}`);
        } else {
          setError("No trailer found.");
        }
      } catch (err) {
        console.error("❌ Error fetching trailer:", err);
        setError("Failed to load trailer.");
      }
    };

    fetchTrailer();
  }, [movieTitle]);

  return (
    <div>
      {trailerUrl ? (
        <iframe
          width="560"
          height="315"
          src={trailerUrl}
          title="Movie Trailer"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      ) : (
        <p>{error || "Loading trailer..."}</p>
      )}
    </div>
  );
};

export default YouTubeTrailer;
