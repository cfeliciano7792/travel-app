import {useState, useEffect, useRef} from "react";
import { MdClose } from "react-icons/md";

import Cookies from "js-cookie"

function EditExperienceModal({ experienceDetails, onClose}){

    const user_id = Cookies.get('user_id')

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        photos: null,
        rating: "",
    });

    const modalRef = useRef();


    useEffect(() => {
        setFormData({
            title: experienceDetails?.title || "",
            description: experienceDetails?.description || "",
            photos: null,
            rating: experienceDetails?.rating || "",
        });
    }, [experienceDetails]);


    const closeModal = (e) => {
      if(modalRef.current === e.target){
        onClose();
      }
    }    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({
                    ...formData,
                    photos: reader.result,
                });
            };
            reader.readAsDataURL(file);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const experienceFormData = {
            experience_id: experienceDetails.experience_id,
            user_id: user_id, 
            title: formData.title,
            description: formData.description,
            photos: formData.photos,
            rating: parseFloat(formData.rating).toFixed(2), 
        };

        try {
            const response = await fetch(`http://localhost:5000/api/experiences/${experienceDetails.experience_id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(experienceFormData),
            });
            

            if (response.ok) {
                const data = await response.json();
                console.log("Experience added:", data);
                onClose(); 
            } else {
                console.error("Failed to add experience");
            }
        } catch (err) {
            console.error("Error submitting experience:", err);
        }
    };



    return (
        <div 
            ref={modalRef} 
            onClick={closeModal} 
            className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center"
            >
            <div className="flex flex-col gap-5mt-5 bg-gray-700 rounded-xl px-4 py-4 items-center">
                <MdClose onClick={onClose} className="place-self-end size-5 text-red-600" />
                <div className="">
                    <h1 className="text-white">Tell us about your experience!</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-6 mb-6 md:grid-cols-2">
                            <div>
                                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                <input 
                                    type="text" 
                                    id="title"
                                    name="title"  
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                                    required 
                                    value={formData.title}
                                    onChange={handleChange}
                                    />
                            </div>
                            <div>
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                <textarea type="textarea" id="description" name="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required                                     
                                value={formData.description}
                                    onChange={handleChange}/>
                            </div>
                            {/* <div>
                                <label for="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
                                <input type="date" id="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" required                                     value={formData.description}
                                    onChange={handleChange}/>
                            </div> */}
                            <div>
                                <label htmlFor="rating" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rating</label>
                                <input type="number" id="rating" name="rating" min="1" max="5" step="0.01" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required                                     
                                value={formData.rating}
                                    onChange={handleChange}/>
                            </div>
                            <div>
                                <label for="photos" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload Photo</label>
                                <input 
                                    type="file" 
                                    id="photos" 
                                    name="photos" 
                                    accept="image/*" 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " 
                                    value={formData.photos}
                                    onChange={handleFileChange}/>
                            </div>
                            {/* <div>
                                <label for="location" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Location</label>
                                <input type="text" id="location" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 block w-full p-2.5" placeholder="Location coordinates will appear here" readonly required />
                            </div> */}
                        </div>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit Update</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditExperienceModal;