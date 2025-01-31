import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const MovieSubmissionForm = ({ themeTitle }) => {
  const [name, setName] = useState("");
  const [movie, setMovie] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !movie) {
      alert("Please enter your name and a movie title.");
      return;
    }

    try {
      console.log("📤 Sending data to Firebase:", {
        name,
        movie,
        description,
        themeTitle,
      });

      await addDoc(collection(db, "submissions"), {
        name,
        movie,
        description,
        theme: themeTitle,
        timestamp: new Date(),
      });

      console.log("✅ Successfully submitted to Firebase!");
      alert("🎉 Movie submitted successfully!");

      setSubmitted(true);
    } catch (error) {
      console.error("❌ Error submitting:", error);
    }
  };

  return submitted ? (
    <p className="success-message">
      🎉 Thank you! Your movie has been submitted.
    </p>
  ) : (
    <div className="form-container">
      <h1 className="form-title">Submit Your Movie Pick</h1>
      <form onSubmit={handleSubmit} className="movie-form">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="YOUR NAME"
          required
        />
        <input
          type="text"
          value={movie}
          onChange={(e) => setMovie(e.target.value)}
          placeholder="MOVIE TITLE"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="DESCRIPTION (OPTIONAL)"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default MovieSubmissionForm;
