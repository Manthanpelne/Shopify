import { NavBar } from "../features/navbar/header"
import {BsChevronCompactLeft, BsChevronCompactRight} from "react-icons/bs"
import { useState } from "react"
import {RxDotFilled} from "react-icons/rx"

export const Home = () =>{

    const slides = [
    {
        url:"https://assets.ajio.com/cms/AJIO/WEB/D-1.0-UHP-05052024-MainBannerDailyChanging-Z1-P4-Puma-Reebok-min50-extra750.jpg"
    },
    {
        url:"https://m.media-amazon.com/images/I/61CiqVTRBEL._SX3000_.jpg"
    },
    {
        url:"https://m.media-amazon.com/images/I/61P7hqIHrdL._SX3000_.jpg"
    },
    {
        url:"https://i.pinimg.com/564x/d4/ac/59/d4ac5996bc2647f89a73bd4705416f2f.jpg"
    },
    {
        url:"https://i.pinimg.com/564x/6d/98/6a/6d986a7e04e1cf0c44b4f4eb34f9ec26.jpg"
    }
    ]

    const [curruntIndex, setCurruntIndex] = useState(0)
   const prevSlide = ()=>{
    const isFirstSlide = curruntIndex === 0
    const newIndex = isFirstSlide ? slides.length-1:curruntIndex-1;
    setCurruntIndex(newIndex)
   }

   const nextSlide=()=>{
    const isLastSlide = curruntIndex === slides.length-1
    const newIndex = isLastSlide ? 0 : curruntIndex+1;
    setCurruntIndex(newIndex)
   }

   const goToSlide =(slideIndex)=>{
    setCurruntIndex(slideIndex)
   }

    return (
        <div>
            <NavBar/>
            <div className="max-w-[1500px] h-[580px] px-5 py-0  group">
                <div style={{backgroundImage: `url(${slides[curruntIndex].url})`}} className="max-w-[1500px] h-[580px] bg-center bg-cover duration-500"></div>
                <div className="hidden group-hover:block absolute top-[65%] -translate-x-0 translate-y-[50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
                  <BsChevronCompactLeft onClick={prevSlide} size={30}/>
                </div>
                <div className="hidden group-hover:block  absolute top-[65%] -translate-x-0 translate-y-[50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
                <BsChevronCompactRight onClick={nextSlide} size={30}/>
                </div>
                <div className="flex top-4 justify-center py-2">
                  {slides.map((slide, slideIndex)=>(
                    <div key={slideIndex} onClick={()=>goToSlide(slideIndex)} className="text-2xl cursor-pointer">
                        <RxDotFilled />
                    </div>
                  ))}
                </div>
            </div>
        </div>
    )

}