import { useState, useEffect } from "react";
import { db } from "../firebase"; // Firebase connection
import { collection, getDocs } from "firebase/firestore";
import axios from "axios";

const YOUTUBE_API_KEY = "YOUR_YOUTUBE_API_KEY"; // 🔹 Replace with your actual YouTube API key

const ComingSoon = ({ latestTheme }) => {
  const [movieList, setMovieList] = useState([]);
  const [trailers, setTrailers] = useState([]);
  const [currentTrailer, setCurrentTrailer] = useState(0);
  const [accessGranted, setAccessGranted] = useState(false);
  const [passcode, setPasscode] = useState("");

  // ✅ Fetch movie submissions
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "submissions"));
        const movies = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.theme === latestTheme) {
            movies.push(data.movie);
          }
        });

        setMovieList(movies);
      } catch (error) {
        console.error("❌ Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [latestTheme]);

  // ✅ Fetch YouTube trailers for movies
  useEffect(() => {
    const fetchTrailers = async () => {
      const trailerLinks = [];

      for (const movie of movieList) {
        try {
          const response = await axios.get(
            "https://www.googleapis.com/youtube/v3/search",
            {
              params: {
                key: YOUTUBE_API_KEY,
                q: `${movie} official trailer`,
                part: "snippet",
                maxResults: 1,
                type: "video",
              },
            }
          );

          if (response.data.items.length > 0) {
            trailerLinks.push(
              `https://www.youtube.com/embed/${response.data.items[0].id.videoId}`
            );
          }
        } catch (error) {
          console.error(`❌ Failed to get trailer for ${movie}:`, error);
        }
      }

      setTrailers(trailerLinks);
    };

    if (movieList.length > 0) {
      fetchTrailers();
    }
  }, [movieList]);

  // ✅ Handle passcode submission
  const handlePasscodeSubmit = () => {
    if (passcode === "itsmovietime") {
      setAccessGranted(true);
    } else {
      alert("❌ Incorrect passcode. Try again!");
    }
  };

  // ✅ Handle "Start the Previews!" button
  const startPreviews = () => {
    if (trailers.length > 0) {
      setCurrentTrailer(0);
    }
  };

  // ✅ Move to next trailer when clicking "Next"
  const nextTrailer = () => {
    if (currentTrailer < trailers.length - 1) {
      setCurrentTrailer(currentTrailer + 1);
    }
  };

  return (
    <div className="coming-soon-container">
      {!accessGranted ? (
        <div className="passcode-entry">
          <h2>Enter Passcode</h2>
          <input
            type="password"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            placeholder="Enter passcode"
          />
          <button onClick={handlePasscodeSubmit}>Submit</button>
        </div>
      ) : (
        <div className="trailer-section">
          <h1>Coming Soon: Movie Trailers</h1>

          {trailers.length === 0 ? (
            <p>Loading trailers...</p>
          ) : (
            <div>
              <iframe
                width="560"
                height="315"
                src={trailers[currentTrailer]}
                title="Movie Trailer"
                frameBorder="0"
                allowFullScreen
              ></iframe>
              <br />
              {currentTrailer < trailers.length - 1 && (
                <button onClick={nextTrailer}>Next Trailer</button>
              )}
            </div>
          )}

          <button onClick={startPreviews}>Start the Previews!</button>
        </div>
      )}
    </div>
  );
};

export default ComingSoon;
