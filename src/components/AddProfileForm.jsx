import { useState } from "react";
import styles from "../styles/addProfileForm.module.css"

const stripTags = (s) => String(s ?? "").replace(/<\/?[^>]+>/g, "");
const trimCollapse = (s) =>
  String(s ?? "")
    .trim()
    .replace(/\s+/g, " ");

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
  const [success, setSuccess] = useState(false);

  const { name, title, email, bio, image } = values;

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "image") {
      const file = event.target.files[0];
      if (file && file.size < 1024 * 1024) {
        setValues((pre) => ({ ...pre, image: file }));
        setError("");
      } else {
        setError("Image should be less than 1 MB");
        setValues((pre) => ({ ...pre, image: null }));
      }
    } else {
      setValues((pre) => ({ ...pre, [name]: value }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      if (
        !stripTags(trimCollapse(name)) ||
        !stripTags(trimCollapse(title)) ||
        !trimCollapse(bio) ||
        !stripTags(trimCollapse(email))
      ) {
        setError("Please fill in name, title, email, and description");
        return;
      }
      console.log(`image ${image}`);
      const cleanedData = {
        id: Date.now(),
        name: stripTags(trimCollapse(name)),
        title: stripTags(trimCollapse(title)),
        email: stripTags(trimCollapse(email)),
        bio: trimCollapse(bio),
        image: URL.createObjectURL(image),
      };
      //submit the data
      onAddProfile(cleanedData);

      setValues({ name: "", title: "", email: "", bio: "", image: null });
      setError("");
      setSuccess("Form is submitted susccesfully");
      setTimeout(() => {
        setSuccess("");
      }, 1000);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const disabled =
    !stripTags(trimCollapse(name)) ||
    !stripTags(trimCollapse(title)) ||
    !trimCollapse(bio) ||
    !stripTags(trimCollapse(email)) ||
    isSubmitting ||
    error !== "";

  return (
    <form onSubmit={handleSubmit} className={styles["add-profile"]}>
        <h2>Add a profile</h2>
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
        value={bio}
        maxLength={200}
        onChange={handleChange}
      />
      <label htmlFor="image">Upload an image</label>
      <input
        id="image"
        name="image"
        type="file"
        accept="image/*"
        onChange={handleChange}
      />

      <button disabled={disabled}>Submit</button>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
    </form>
  );
};

export default AddProfileForm;