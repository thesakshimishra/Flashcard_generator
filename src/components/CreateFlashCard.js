// In this page we created the createflashcard page in this pages we created input
// boxes of group name , group description , upload image  for the card add term input box and add defination and some feature buttons to

// this form is created with the help of  React Formik and React Icons

import React, { useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import FlashCardSchema from "../validations/CardSchema";
import { nanoid } from "nanoid";
import {
  AiOutlinePlus,
  AiOutlineUpload,
  AiOutlineEdit,
  AiOutlineDelete,
} from "react-icons/ai";
import { useDispatch } from "react-redux";
import { setFlashCard } from "../app/feature/flashcardSlice";
import TextError from "../validations/TextError";

const CreateFlashCard = () => {
  const dispatch = useDispatch();
  const filePickerRef = useRef(null);
  const editRef = useRef(null);
  const [groupImg, setGroupImg] = useState("");
  const addFlashCard = (values, actions) => {
    dispatch(setFlashCard(values));
    actions.resetForm();
    setGroupImg("");
  };

  return (
    <Formik
      initialValues={{
        groupid: nanoid(),
        groupname: "",
        groupdescription: "",
        groupimg: null,
        cards: [
          {
            cardid: nanoid(),
            cardname: "",
            carddescription: "",
          },
        ],
      }}
      validationSchema={FlashCardSchema}
      onSubmit={addFlashCard}
    >
      {({ values, isSubmitting, setFieldValue }) => (
        <Form className="w-full space-y-5 text-black-600 text-bold font-medium">
          <div className="md:flex flex-col px-10 py-4 bg-white drop-shadow-lg space-y-4 rounded-lg">
            <div className="flex flex-col sm:flex-row items-center space-x-10 pt-3">
              <div className="flex flex-col relative">
                <label className="text-xl mb-3" htmlFor="createGroup">Create Group *</label>
                <Field
                  type="text"
                  name="groupname"
                  id="createGroup"
                  placeholder=" Enter Group Name "
                  className="border-gray-300 md:w-96 border-2 rounded-lg focus:ring-gray-500 focus:border focus:border-gray-700"
                />
                <ErrorMessage component={TextError} name="groupname" />
              </div>
              {groupImg ? (
                <img
                  src={groupImg}
                  alt="groupImg"
                  className="w-28 h-28 object-contain"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => filePickerRef.current.click()}
                  className={`md:flex items-center px-10 py-2 mt-9 bg-white border-2 border-slate-300 active:border-blue-500 text-blue-600 font-semibold rounded-md space-x-2 `}
                >
                  <AiOutlineUpload className="w-6 h-6" />
                  <span>Upload Image</span>
                  <input
                    type="file"
                    ref={filePickerRef}
                    value={groupImg}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      const reader = new FileReader();
                      reader.readAsDataURL(file);
                      reader.onload = () => {
                        setFieldValue("groupimg", reader.result);
                        
                        setGroupImg(reader.result);
                      };
                    }}
                    hidden
                  />
                </button>
              )}
            </div>

            <div className="flex flex-col w-full sm:w-[70%]">
              <label htmlFor="addDescription" className="text-xl mb-2">
                Add Description
              </label>
              <Field
                as="textarea"
                name="groupdescription"
                id="addDescription"
                rows={2}
                placeholder="Enter  Group  Description "
                className="resize-none border-gray-300 border-2 rounded-lg  focus:ring-gray-400 focus:border focus:border-gray-400"
              />
              <ErrorMessage component={TextError} name="groupdescription" />
            </div>
          </div>
          <div className="drop-shadow-lg">
            <FieldArray name="cards">
              {(arrayHelper) => {
                const cards = values.cards;
                return (
                  <div>
                    {cards && cards.length > 0
                      ? cards.map((cards, index) => (
                          <div
                            className="flex rounded-t-lg items-center space-x-5 bg-white lg:px-10 py-5"
                            key={index}
                          >
                        
                            <div className="w-4 h-4 px-5 py-5 flex items-center justify-center bg-blue-600 text-white text-md font-semibold rounded-full opacity-95 ">
                              {index + 1}
                            </div>
                          
                            <div className="flex flex-col space-y-2 md:space-x-10 md:flex-row">
                              <div className="relative text-xl flex flex-col justify-center space-y-3">
                                <label htmlFor="enterTerm">
                                  Enter Term
                                </label>
                                <Field
                                  type="text"
                                  id="enterTerm"
                                  // It is a dynamically generated string that specifies the name of a form field.
                                  name={`cards.${index}.cardname`}
                                  innerRef={editRef}
                                  placeholder="Enter Terms "
                                  className="border-gray-300 md:w-56 border-2 h-16 rounded-lg focus:ring-gray-500 focus:border focus:border-gray-700"
                                />
                                <ErrorMessage
                                  component={TextError}
                                  name={`cards.${index}.cardname`}
                                />
                              </div>
                              <div className="relative text-xl flex flex-col justify-center space-y-3"style={{marginTop:"-2px"}}>
                                <label htmlFor="enterDefinaton">
                                  Enter Defination
                                </label>
                                <Field
                                  as="textarea"
                                  id="enterDefination"
                                  // It is a dynamically generated string that specifies the name of a form field.
                                  name={`cards.${index}.carddescription`}
                                  placeholder="Enter Defination"
                                  className=" lg:w-72  resize-none border-gray-300 border-2 rounded-lg  focus:ring-gray-400 focus:border focus:border-gray-400"
                                />
                                <ErrorMessage
                                  component={TextError}
                                  name={`cards.${index}.carddescription`}
                                />
                              </div>

                              <div className="flex items-center space-x-2 ">
                                <button
                                  className="hidden lg:flex lg:items-center lg:w-[30rem] px-3 py-2 my-4  bg-white border-2 border-blue-600 active:border-slate-300 text-blue-600 font-semibold rounded-md space-x-1"
                                
                                >
                                  <span> + Select Image</span>
                                </button>
                                <div className="flex items-center justify-around w-full md:flex-col md:space-y-4 md:mt-5">
                                  <button
                                    type="button"
                                    onClick={() => arrayHelper.remove(index)}
                                  >
                                    <AiOutlineDelete className="w-6 h-6" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => editRef.current.focus()}
                                  >
                                    <AiOutlineEdit className="h-6 w-6" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      : null}
                    <div className="bg-white rounded-b-lg flex w-full  mb-10 px-5 py-2">

                      <button
                        type="button"
                        onClick={() =>
                          arrayHelper.push({
                            cardid: nanoid(),
                            cardname: "",
                            carddescription: "",
                          })
                        }
                        className="flex items-center space-x-2 text-blue-600  text-md   mb-5 mt-0 "
                      >
                        <AiOutlinePlus />
                        <span>Add More</span>
                      </button>
                    </div>
                    <div className="flex justify-center w-full">
                      {/*  Submit button ( create ) */}
                      <button
                        onSubmit={isSubmitting ? values : undefined}
                        type="submit"
                        className="py-2 px-6  bg-blue-600 text-white rounded-md mb-10"
                      >
                        Create
                      </button>
                    </div>
                  </div>
                );
              }}
            </FieldArray>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreateFlashCard;
