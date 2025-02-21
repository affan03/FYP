import React from 'react'
import bg2 from '../images/howitworks.webp'
import focus from '../images/xxx.png'
import send from '../images/send (1).jpeg'
import result from '../images/result3.png'
import ai from '../images/ai-img.webp'
import title from '../images/Skinova__2_-removebg-preview.png'

const Works = () => {
  return (
    <div className='w-full h-[1200px]'>
      <div className='flex flex-row'>
        <div>
          <h1 className='text-6xl font-bold mt-52 ml-14 leading-snug'>Online Dermatology <br /> Platform</h1>
          <p className='text-xl ml-14 mt-10 leading-10'><span className='text-blue-800 font-bold'>Skinova</span> is an online dermatology service providing quick, <br /> expert, and confidential skin condition evaluations from our expert AI system.</p>
        </div>
        <div>
          <img src={bg2} alt='' className='mt-40 w-3/4 items-center ml-32' />
        </div>
      </div>

      <div>
        <h1 className='text-5xl font-bold ml-14 mt-28'>How to use Skinova?</h1>
        <div className='flex flex-row justify-evenly mt-20'>
          <div className='text-start'>
            <img src={focus} alt='' className='mt-8' />
            <h2 className='font-semibold text-lg mt-10 '>Take a photo*</h2>
            <h2 className='text-lg mx-auto max-w-xs'>Keep zoomed at the closest distance (less than 10 cm), keep in focus and center only the skin mark (without hair, wrinkles and other objects)</h2>
          </div>
          <div className='text-start'>
            <img src={send} alt='' />
            <h2 className='font-semibold text-lg mt-10'>Identify and send</h2>
            <h2 className='text-lg mx-auto max-w-xs'>Send your photo to the Artificial Intelligence. The system will analyze it and send you a risk assessment.</h2>
          </div>
          <div className='text-start'>
            <img src={result} alt='' />
            <h2 className='font-semibold text-lg mt-10'>Receive your risk assessment **</h2>
            <h2 className='text-lg mx-auto max-w-xs'>Get the result within 60 seconds and related advice on the next steps to take.</h2>
          </div>
        </div>
      </div>

      <div className='flex flex-row mt-52'>
        <div>
          <img src={ai} alt='' className='h-[500px]' />
        </div>
        <div>
          <h1 className='text-5xl font-bold px-5'>How does Artificial Intelligence analyze images?</h1>
          <h2 className='max-w-4xl text-xl mt-6 leading-relaxed px-5'>AI Dermatologist uses a deep machine learning algorithm (AI-algorithm). The human ability to learn from examples and experiences has been transferred to a computer. For this purpose, the neural network has been trained using a dermoscopic imaging database containing tens of thousands of examples that have confirmed diagnosis and assessment by dermatologists.

            The AI is able to distinguish between benign and malignant tumors, similar to the ABCDE rule (5 main signs of oncology: asymmetry, boundary, color, diameter, and change over time). The difference between them is that the algorithm can analyze thousands of features, but not only 5 of them. Of course, only a machine can detect that amount of evidence.

            Due to the productive cooperation with doctors, the quality of the algorithm performance is constantly being improved. Based on growing experience and its own autonomous rules, the AI is able to distinguish between benign and malignant tumors, find risks of human papillomavirus, and classify different types of acne…</h2>
        </div>
      </div>


      <div className='mt-44 ml-14'>
        <h1 className='text-4xl font-bold'>You are joining more than 900 000 people that use <br /> Skinova to keep their skin healthy.</h1>
        <div className='flex flex-row justify-evenly mt-12'>
          <div className='w-96 h-32 rounded-2xl bg-blue-900 shadow-lg text-center '>
            <h1 className='text-white font-bold text-6xl mt-3 shadow-xl'>97,191</h1>
            <h1 className='text-white font-base text-3xl mt-2'>Skinova Users</h1>
          </div>
          <div className='w-96 h-32 rounded-2xl bg-blue-900 shadow-lg text-center'>
            <h1 className='text-white font-bold text-6xl mt-3 shadow-xl'>350,267</h1>
            <h1 className='text-white font-base text-3xl mt-2'>Online checks done</h1>
          </div>
          <div className='w-96 h-32 rounded-2xl bg-blue-900 shadow-lg text-center'>
            <h1 className='text-white font-bold text-6xl mt-3 shadow-xl'>35,269</h1>
            <h1 className='text-white font-base text-3xl mt-2'>Skin diseases detected</h1>
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
  )
}

export default Works