import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      text: "This is the First Item",
      rating: 10,
    },
    {
      id: 2,
      text: "This is the Second Item",
      rating: 7,
    },
    {
      id: 5,
      text: "This is the Third Item",
      rating: 3,
    },
  ]);

  const [feedbackEdit, setFeedBackEdit] = useState({ item: {}, edit: false });

  // Edit Feedback
  const editFeedback = (item) => {
    setFeedBackEdit({
      item,
      edit: true,
    });
  };
  // Delete Feedback
  const deleteFeedback = (id) => {
    if (window.confirm("Are you sure you want to delete this Feedback?")) {
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  // Add Feedback
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();
    setFeedback([newFeedback, ...feedback]);
  };

  // Update Feedback Item
  // updItem is the same as newFeedback in the FeedbackForm Component
  const updateFeedback = (id, updItem) => {
    setFeedback(feedback.map((item) => (item.id === id ? updItem : item)));
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
