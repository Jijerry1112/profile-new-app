import { useReducer, useRef, useLayoutEffect } from "react";
import styles from "../styles/addProfileForm.module.css";
import { useNavigate } from "react-router-dom";

const stripTags = (s) => String(s ?? "").replace(/<\/?[^>]+>/g, "");
const trimCollapse = (s) =>
  String(s ?? "")
    .trim()
    .replace(/\s+/g, " ");

const initialState = {
  name: "",
  title: "",
  email: "",
  bio: "",
  image: null,
  error: "",
  isSubmitting: false,
  success: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };

    case "SET_ERROR":
      return { ...state, error: action.payload };

    case "SET_SUBMITTING":
      return { ...state, isSubmitting: action.payload };

    case "SET_SUCCESS":
      return { ...state, success: action.payload };

    case "RESET_FORM":
      return { ...initialState };

    default:
      return state;
  }
}

const AddProfileForm = ({ onAddProfile }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { name, title, email, bio, image, error, isSubmitting, success } =
    state;

  const navigate = useNavigate();
  const nameRef = useRef(null);
  const formRef = useRef(null);

  // 🔵 useLayoutEffect example
  useLayoutEffect(() => {
    if (formRef.current) {
      const width = formRef.current.offsetWidth;
      console.log("Form width:", width);
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "image") {
      const file = event.target.files[0];
      if (file && file.size < 1024 * 1024) {
        dispatch({ type: "SET_FIELD", field: "image", value: file });
        dispatch({ type: "SET_ERROR", payload: "" });
      } else {
        dispatch({
          type: "SET_ERROR",
          payload: "Image should be less than 1 MB",
        });
        dispatch({ type: "SET_FIELD", field: "image", value: null });
      }
    } else {
      dispatch({ type: "SET_FIELD", field: name, value });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: "SET_SUBMITTING", payload: true });

    try {
      if (
        !stripTags(trimCollapse(name)) ||
        !stripTags(trimCollapse(title)) ||
        !trimCollapse(bio) ||
        !stripTags(trimCollapse(email))
      ) {
        dispatch({
          type: "SET_ERROR",
          payload: "Please fill in all required fields",
        });
        return;
      }

      const cleanedData = {
        id: Date.now(),
        name: stripTags(trimCollapse(name)),
        title: stripTags(trimCollapse(title)),
        email: stripTags(trimCollapse(email)),
        bio: trimCollapse(bio),
        image: URL.createObjectURL(image),
      };

      onAddProfile(cleanedData);

      dispatch({ type: "SET_SUCCESS", payload: "Form submitted successfully!" });

      setTimeout(() => {
        dispatch({ type: "RESET_FORM" });
        navigate("/");
      }, 1000);
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: err.message });
    } finally {
      dispatch({ type: "SET_SUBMITTING", payload: false });
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
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={styles["add-profile"]}
    >
      <label htmlFor="name">Name</label>
      <input
        ref={nameRef}
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