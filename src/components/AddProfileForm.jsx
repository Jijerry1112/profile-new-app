import { useRef, useState } from "react";
import styles from "../styles/addProfileForm.module.css";
import { useNavigate } from "react-router-dom";

const stripTags = (s) => String(s ?? "").replace(/<\/?[^>]+>/g, "");
const trimCollapse = (s) =>
  String(s ?? "")
    .trim()
    .replace(/\s+/g, " ");

const MAX_IMAGE_BYTES = 1024 * 1024; // 1MB

const AddProfileForm = ({ onAddProfile }) => {
  const [values, setValues] = useState({
    name: "",
    title: "",
    email: "",
    bio: "",
    image: null,
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState("");

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const { name, title, email, bio, image } = values;

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    if (name === "image") {
      setError("");

      const file = files?.[0];

      if (!file) {
        setValues((prev) => ({ ...prev, image: null }));
        return;
      }

      if (!file.type.startsWith("image/")) {
        setError("Please upload a valid image file (jpg/png/webp).");
        event.target.value = "";
        setValues((prev) => ({ ...prev, image: null }));
        return;
      }

      if (file.size > MAX_IMAGE_BYTES) {
        setError("Image should be less than 1 MB.");
        event.target.value = "";
        setValues((prev) => ({ ...prev, image: null }));
        return;
      }

      setValues((prev) => ({ ...prev, image: file }));
      return;
    }

    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const cleanName = stripTags(trimCollapse(name));
      const cleanTitle = stripTags(trimCollapse(title));
      const cleanEmail = stripTags(trimCollapse(email));
      const cleanBio = trimCollapse(bio);

      if (!cleanName || !cleanTitle || !cleanEmail || !cleanBio) {
        setError("Please fill in name, title, email, and description.");
        return;
      }

      if (!image) {
        setError("Please upload an image before submitting.");
        return;
      }

      const imageUrl = URL.createObjectURL(image);

      const newProfile = {
        id: Date.now(),
        name: cleanName,
        title: cleanTitle,
        email: cleanEmail,
        bio: cleanBio,
        image: imageUrl,
      };

      onAddProfile(newProfile);

      // Reset form
      setValues({
        name: "",
        title: "",
        email: "",
        bio: "",
        image: null,
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setSuccess("Form submitted successfully!");

      setTimeout(() => {
        setSuccess("");
        navigate("/");
      }, 900);
    } catch (err) {
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const disabled =
    !stripTags(trimCollapse(name)) ||
    !stripTags(trimCollapse(title)) ||
    !trimCollapse(bio) ||
    !stripTags(trimCollapse(email)) ||
    !image ||
    isSubmitting ||
    !!error;

  return (
    <form onSubmit={handleSubmit} className={styles["add-profile"]}>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        name="name"
        type="text"
        required
        value={name}
        onChange={handleChange}
      />

      <label htmlFor="title">Title</label>
      <input
        id="title"
        name="title"
        type="text"
        required
        value={title}
        onChange={handleChange}
      />

      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        required
        value={email}
        onChange={handleChange}
      />

      <label htmlFor="bio">Add description</label>
      <textarea
        id="bio"
        name="bio"
        required
        maxLength={200}
        value={bio}
        onChange={handleChange}
      />

      <label htmlFor="image">Upload an image</label>
      <input
        ref={fileInputRef}
        id="image"
        name="image"
        type="file"
        accept="image/*"
        onChange={handleChange}
      />

      <button disabled={disabled}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>

      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
    </form>
  );
};

export default AddProfileForm;