import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Api from "../Api";
import InputField from "./InputField";
import "./BookDetail.css";

const EditBookForm = ({ id, token }) => {
  const [book, setBook] = useState({});
  const [formData, setFormData] = useState({
    author: "",
    genre: "",
    book_condition: "",
    price: "",
    city: "",
    delivery: "",
    information: "",
  });
  const [message, setMessage] = useState("");
  const [bookEdited, setBookEdited] = useState(false);

  useEffect(() => {
    Api(`books/${id}`)
      .then((data) => {
        console.log(data[0]);
        setBook(data[0]);
      })
      .catch((error) => {
        console.log(`error fetching data book id ${id}`);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      image: book.image,
      title: book.title,
      author: formData.author || book.author,
      genre: formData.genre || book.genre,
      book_condition: formData.book_condition || book.book_condition,
      price: formData.price || book.price,
      city: formData.city || book.city,
      delivery: formData.delivery || book.delivery,
      information: formData.information || book.information,
    };
    try {
      const response = await Api(`books/${id}`, "PUT", data, token);
      console.log("Book edited successfully:", response);
      setMessage("Book Edited successfully!");
      setBookEdited(true);
    } catch (error) {
      setMessage("Failed to edit book, please try again.");
      console.error("Error edit book:", error);
    }
  };

  return (
    <div className="add-book-form">
      <div className="book-item">
        <div className="book-detail-image-wrapper">
          <img src={book.image} alt="Book Cover" />
        </div>
        <h3>{book.title}</h3>
        {message && <p>{message}</p>}
        {!bookEdited ? (
          <form onSubmit={handleSubmit}>
            <InputField
              type="text"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              label="Author:"
              placeholder={book.author}
            />

            <InputField
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleInputChange}
              label="Genre:"
              placeholder={book.genre}
            />

            <InputField
              type="text"
              name="book_condition"
              value={formData.book_condition}
              onChange={handleInputChange}
              label="Condition:"
              placeholder={book.book_condition}
            />

            <InputField
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              label="Price (€):"
              min="0"
              step="0.01"
              placeholder={book.price}
            />

            <InputField
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              label="City:"
              placeholder={book.city}
            />

            <InputField
              type="text"
              name="delivery"
              value={formData.delivery}
              onChange={handleInputChange}
              label="Delivery Info:"
              placeholder={book.delivery}
            />

            <div className="input-field">
              <label htmlFor="information">Additional Information:</label>
              <textarea
                id="information"
                name="information"
                value={formData.information}
                onChange={handleInputChange}
                placeholder={book.information}
              />
            </div>
            <button type="submit">Edit Book</button>
          </form>
        ) : (
          <NavLink to="/">Return to Home</NavLink>
        )}
      </div>
    </div>
  );
};

export default EditBookForm;
