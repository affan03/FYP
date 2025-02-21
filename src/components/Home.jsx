import React from 'react';
import skin1 from '../images/acne1.webp';
import skin2 from '../images/skin2.jpg';
import skin3 from '../images/skin3.jpg';
import { FaBrain } from "react-icons/fa6";
import { FaClock } from "react-icons/fa";
import { FaMobile } from "react-icons/fa6";
import { FaHandHoldingUsd } from "react-icons/fa";
import title from '../images/Skinova__2_-removebg-preview.png';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation

const Home = () => {
    const navigate = useNavigate();  // Initialize useNavigate

    // Function to handle Upload Photo button click
    const handleUploadClick = () => {
        const authToken = localStorage.getItem('authToken'); // Check if user is authenticated

        if (authToken) {
            navigate('/modal-page'); // Navigate to Modal-Page if signed in
        } else {
            navigate('/login'); // Navigate to Login if not signed in
        }
    };

    return (
        <div className='bg-white w-full h-screen mt-20'>
            <div className='flex justify-center'>
                <h1 className=' items-center text-4xl font-bold top-10 relative'>Identify Your Skin Disease</h1>
                {/* <p className='items-center'>Upload a picture of your skin condition and get diagnosis in a second!</p> */}
            </div>

            <div className='flex justify-center'>
                <p className='items-center mt-12 font-semibold text-lg'>Upload a picture of your skin condition and get diagnosis in a second!</p>
            </div>

            <div className='flex justify-center'>
                <button 
                    className='items-center px-4 py-2 text-white font-semibold bg-blue-800 rounded-lg mt-10'
                    onClick={handleUploadClick}  // Attach the handleUploadClick function
                >
                    Upload Photo
                </button>
            </div>

            <div className='w-full bg-blue-800 h-[500px] mt-20'>
                <div className='flex justify-center'>
                    <h1 className='text-4xl font-bold items-center mt-10 text-white'>About Skinova</h1>
                </div>

                <div className='flex justify-center'>
                    <p className='items-center mt-2 font-semibold text-xl text-white'>We provide quick and reliable diagnosis for various skin diseases, helping you find the right over-the-counter treatments.</p>
                </div>

                <div className='flex flex-rows mt-8 justify-evenly'>
                    <div>
                        <img src={skin1} alt='' className='rounded-full h-56 w-56' />
                        <h2 className='items-center font-semibold text-xl text-white ml-8 mt-3'>Expert Diagnosis</h2>
                    </div>

                    <div>
                        <img src={skin2} alt='' className='rounded-full h-56 w-56' />
                        <h2 className='items-center font-semibold text-xl text-white ml-8 mt-3'>Effective Treatments</h2>
                    </div>

                    <div>
                        <img src={skin3} alt='' className='rounded-full h-56 w-56' />
                        <h2 className='items-center font-semibold text-xl text-white ml-8 mt-3'>User-Friendly App</h2>
                    </div>
                </div>
            </div>

            <div className='bg-white h-[1000px]'>
                <div className='flex justify-center'>
                    <h1 className='text-4xl font-bold items-center mt-20'>The Mission</h1>
                </div>
                <div className='justify-start'>
                    <h1 className='font-bold text-3xl px-20 mt-16'>Our Vision</h1>
                    <p className=' mt-4 px-20 text-xl leading-10'>At <span className='text-blue-800 font-bold'>Skinova</span>, our vision is to revolutionize the early detection and treatment of skin diseases through the power of artificial intelligence. We believe in harnessing cutting-edge technology to provide accessible, accurate, and timely diagnoses for individuals worldwide. Our goal is to empower users with the knowledge they need to take control of their skin health, fostering a proactive approach to dermatological care. By combining advanced AI algorithms with an easy-to-use interface, we strive to make skin disease detection simple and reliable for everyone. Our commitment extends beyond just detection; we aim to build a comprehensive platform that supports users through their healthcare journey, offering personalized insights, treatment recommendations, and a secure history of their skin health in their personal profile. We envision a future where everyone has the tools to monitor their skin health from the comfort of their own home, reducing the burden on healthcare systems and improving outcomes through early intervention. Together, we can create a healthier world, one skin check at a time.</p>
                </div>
                <div className='justify-start'>
                    <h1 className='font-bold text-3xl px-20 mt-16'>Who Can Use Our Service</h1>
                    <p className='mt-4 px-20 text-xl leading-10'>Our application is designed to be inclusive and accessible for everyone. Regardless of age, gender, or background, anyone with access to the internet and a camera can use our website to monitor their skin health. Whether you’re a concerned parent keeping an eye on your child's skin condition, an individual seeking early detection for peace of mind, or someone who wants to track ongoing skin issues, our platform is here to assist you. We aim to democratize access to advanced dermatological care, ensuring that comprehensive skin disease detection and insights are available to all, no matter where you are. Our user-friendly interface ensures that even those with minimal technical skills can easily upload their photos and receive reliable results. Join us in our mission to make skin health a priority for everyone.</p>
                </div>
            </div>

            <div className='bg-white mt-10 h-[600px]'>
                <div className='flex justify-center'>
                    <h1 className='text-4xl font-bold'>Why is Skinova worth using?</h1>
                </div>
                <div className="flex justify-between items-start mt-20 px-10">
                    <div className="text-center max-w-xs">
                        <FaBrain size={150} className="mx-auto text-blue-600" />
                        <h1 className="text-gray-700 font-bold mt-8 text-3xl font-sans">Smart</h1>
                        <p className="text-lg leading-6 mt-4 px-2">
                            Skinova is created on the basis of artificial intelligence as a result of joint work of IT specialists and doctors. Our app has the same accuracy as a professional dermatologist.
                        </p>
                    </div>
                    <div className="text-center max-w-xs">
                        <FaClock size={150}  className="mx-auto text-blue-600" />
                        <h1 className="text-gray-700 font-bold mt-8 text-3xl font-sans">Simple</h1>
                        <p className="text-lg leading-6 mt-4 px-2">
                            Place your phone near a mole or other formation on the skin and within 1 minute you will find out if there is cause for concern.
                        </p>
                    </div>
                    <div className="text-center max-w-xs">
                        <FaMobile size={150} className="mx-auto text-blue-600" />
                        <h1 className="text-gray-700 font-bold mt-8 text-3xl font-sans">Accessible</h1>
                        <p className="text-lg leading-6 mt-4 px-2">
                            Skinova is available anytime, anywhere. Keep your health in check at your fingertips even when you are on the go.
                        </p>
                    </div>
                    <div className="text-center max-w-xs">
                        <FaHandHoldingUsd size={150}  className="mx-auto text-blue-600" />
                        <h1 className="text-gray-700 font-bold mt-8 text-3xl font-sans">Free of Cost</h1>
                        <p className="text-lg leading-6 mt-4 px-2">
                            Skinova offers advanced AI-driven skin disease detection completely free of cost, making professional-level dermatological insights accessible to everyone.
                        </p>
                    </div>
                </div>

            </div>

            <div className='bg-white mt-20 mb-40 h-[500px]'>
                <div className='flex justify-center'>
                    <h1 className='text-4xl font-bold items-center mt-10'>Testimonials</h1>
                </div>

                <div className='flex flex-row justify-center gap-16 mt-20'>
                    <div className='bg-white h-52 w-96 rounded-lg shadow-xl'>
                        <p className='px-4 mt-3 font-semibold text-lg'>"Skinova helped me identify my eczema and find a treatment that worked for me. Highly recommended!"</p>
                        <p className='text-base text-gray-700 mt-5 px-2'> - Sarah Williams</p>
                    </div>
                    <div className='bg-white h-52 w-96 rounded-lg shadow-xl'>
                        <p className='px-4 mt-3 font-semibold text-lg'>"Quick and accurate diagnosis. I was able to get over-the-counter treatment fast and efficiently." </p>
                        <p className='text-base text-gray-700 mt-5 px-2'> - James Carter</p>
                    </div>
                    <div className='bg-white h-52 w-96 rounded-lg shadow-xl'>
                        <p className='px-4 mt-3 font-semibold text-lg'>"The app is super easy to use and very helpful. I got the results in seconds."</p>
                        <p className='text-base text-gray-700 mt-5 px-2'> - Emily Johnson</p>
                    </div>
                </div>
                <div className='flex flex-row justify-center gap-16 mt-10'>
                    <div className='bg-white h-52 w-96 rounded-lg shadow-xl'>
                        <p className='px-4 mt-3 font-semibold text-lg'>Quick and easy to use service, really helpful and fast! Would highly recommend.</p>
                        <p className='text-base text-gray-700 mt-5 px-2'> - Jessy Ryder</p>
                    </div>
                    <div className='bg-white h-52 w-96 rounded-lg shadow-xl'>
                        <p className='px-4 mt-3 font-semibold text-lg'>“So, is the service useful? In our case, as hovering parents, sure! For a patient who thinks they may have basal cell carcinoma and needs a quick opinion of whether to see a Dr, absolutely! “</p>
                        <p className='text-base text-gray-700 mt-5 px-2'> - Collin Rhodes</p>
                    </div>
                    <div className='bg-white h-52 w-96 rounded-lg shadow-xl'>
                        <p className='px-4 mt-3 font-semibold text-lg'>“Rather than dealing with the hassles of seeing a doc in person, I went the app route. The results were…surprising. I think the entire “visit” took about 5 minutes.”</p>
                        <p className='text-base text-gray-700 mt-5 px-2'> - Henry Nicholls</p>
                    </div>
                </div>

            </div>

            <div className='max-w-screen mx-auto h-[100px]'>
                <footer>
                    <div className='bg-blue-900 text-gray-200 p-20 top-52 relative'>
                        <div className='max-w-7xl mx-auto'>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2'>

                                <div className='mb-3'>
                                    <h4 className='text-2xl pb-4 font-semibold'>Company</h4>
                                    <p className='text-gray-200'>
                                        A123 Lost Street <br />
                                        Karachi, PB 24345 <br />
                                        Pakistan <br></br>
                                        <strong>Phone: </strong>+923343206123 <br />
                                        <strong>Email: </strong>info@gmail.com
                                    </p>
                                </div>
                                <div className='mb-3'>
                                    <h4 className='pb-4'>Useful Links</h4>
                                    <ul className='text-gray-200'>
                                        <li className='pb-4'><a href="#" className='hover:text-orange-500'>Home</a></li>
                                        <li className='pb-4'><a href="#" className='hover:text-orange-500'>About Us</a></li>
                                        <li className='pb-4'><a href="#" className='hover:text-orange-500'>Services</a></li>
                                        <li className='pb-4'><a href="#" className='hover:text-orange-500'>Contact Us</a></li>
                                    </ul>
                                </div>

                                <div className='mb-3'>
                                    <h4 className='pb-4'>Our Services</h4>
                                    <ul className='text-gray-200'>
                                        <li className='pb-4'><a href="#" className='hover:text-orange-500'>Web Design</a></li>
                                        <li className='pb-4'><a href="#" className='hover:text-orange-500'>Product Marketing</a></li>
                                        <li className='pb-4'><a href="#" className='hover:text-orange-500'>Graphic Designing</a></li>
                                        <li className='pb-4'><a href="#" className='hover:text-orange-500'>Web Development</a></li>
                                    </ul>
                                </div>

                                <div className='mb-3'>
                                    <h4 className='pb-4'>Join Our Newsletter</h4>
                                    <p className='text-gray-200 pb-2'>Join 25000+ others and never miss out on new tips, tutorials and more</p>
                                    <img src={title} alt='' className='relative bottom-20 w-10' />
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Home;
