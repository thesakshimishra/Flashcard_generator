
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FlashcardUI from "./FlashcardUI";

const MyFlashCard = () => {
  const navigate = useNavigate();
  const flashcard = useSelector((state) => state.flashcard.flashcards);
  const [showAll, setShowAll] = useState(false);
  const showLimit = !showAll ? 6 : flashcard.length;

  return (
    <section className="flex flex-col mt-16">
      {flashcard.length > 0 ? (
        <div>
          <div className="flex flex-wrap">
            {flashcard.slice(0, showLimit).map(({ card }, i) => (
              <FlashcardUI key={i} flashcard={card} />
            ))}
          </div>
          <div className="flex justify-end mr-10">
            <button
              className="w-15 mb-5 mt-1 font-semibold bordertext-lg text-blue-600 border border-blue-500"
              onClick={() => setShowAll(!showAll)}>Show More
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center bg-gray-200 shadow-lg p-20">
          <h1 className="font-semibold text-xl text-red">
            Thare is no Flashcard Created , Go to
            <span
              className="text-red-500 cursor-pointer"
              onClick={() => navigate("/")}
            >
              --CREATE FLASHCARD--
            </span>
            to Create Flashcard
          </h1>
        </div>
      )}
    </section>
  );
};

export default MyFlashCard;
