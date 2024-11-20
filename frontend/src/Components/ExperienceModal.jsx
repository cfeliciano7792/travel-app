import {React, useRef} from "react";
import { MdClose } from "react-icons/md";

function ExperienceModal({onClose}){

    const modalRef = useRef();
    const closeModal = (e) => {
      if(modalRef.current === e.target){
        onClose();
      }
    }

    return (
        <div ref={modalRef} onClick={closeModal} className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center">
            <div className="flex flex-col gap-5mt-5 bg-gray-700 rounded-xl px-4 py-4 items-center">
                <MdClose onClick={onClose} className="place-self-end size-5 text-red-600" />
                <div className="">
                    <h1 className="text-white">Tell us about your experience!</h1>
                    <form>
                        <div className="grid gap-6 mb-6 md:grid-cols-2">
                            <div>
                                <label for="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                <input type="text" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Title..." required />
                            </div>
                            <div>
                                <label for="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                <textarea type="textarea" id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Description..." required />
                            </div>
                            <div>
                                <label for="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
                                <input type="date" id="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" required />
                            </div>
                            <div>
                                <label for="rating" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rating</label>
                                <input type="number" id="rating" min="1" max="5" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Rating" required />
                            </div>
                            <div>
                                <label for="photo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload Photo</label>
                                <input type="file" id="photo" accept="image/*" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required />
                            </div>
                            <div>
                                <label for="location" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Location</label>
                                <input type="text" id="location" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 block w-full p-2.5" placeholder="Location coordinates will appear here" readonly required />
                            </div>
                        </div>
                        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ExperienceModal;