import { NavBar } from "../features/navbar/header";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { useState } from "react";
import { RxDotFilled } from "react-icons/rx";
import { selectLoggedInUser } from "../features/auth/authSlice";
import { useSelector } from "react-redux";

export const Home = () => {
  // const user = useSelector(selectLoggedInUser)
  // console.log(user.error)
  const slides = [
    {
      url: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/00c88d153666003.6333ef06a92df.png",
    },
    {
      url: "https://m.media-amazon.com/images/I/61CiqVTRBEL._SX3000_.jpg",
    },
    {
      url: "https://m.media-amazon.com/images/I/61P7hqIHrdL._SX3000_.jpg",
    },
    {
      url: "https://i.pinimg.com/564x/d4/ac/59/d4ac5996bc2647f89a73bd4705416f2f.jpg",
    },
    {
      url: "https://i.pinimg.com/564x/6d/98/6a/6d986a7e04e1cf0c44b4f4eb34f9ec26.jpg",
    },
  ];

  const [curruntIndex, setCurruntIndex] = useState(0);
  const prevSlide = () => {
    const isFirstSlide = curruntIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : curruntIndex - 1;
    setCurruntIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = curruntIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : curruntIndex + 1;
    setCurruntIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurruntIndex(slideIndex);
  };

  return (
    <>

    <div>
      <NavBar />
     <div>
      <div class="relative overflow-hidden bg-white">
  <div class="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
    <div class="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
      <div class="sm:max-w-lg">
        <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Summer styles are finally here</h1>
        <p class="mt-4 text-xl text-gray-500">This year, our new summer collection will shelter you from the harsh elements of a world that doesn't care if you live or die.</p>
      </div>
      <div>
        <div class="mt-10">
         
          <div aria-hidden="true" class="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl">
            <div class="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
              <div class="flex items-center space-x-6 lg:space-x-8">
                <div class="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                  <div class="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                    <img src="https://th.bing.com/th/id/OIP.HlyccNYCSlg8cWeLP61uawHaHa?pid=ImgDet&w=187&h=187&c=7&dpr=1.3" alt="" class="h-full w-full object-cover object-center"/>
                  </div>
                  <div class="h-64 w-44 overflow-hidden rounded-lg">
                    <img src="https://th.bing.com/th/id/R.1c5c7a187d96e9634e3b198544ed7e0c?rik=znvsRClwqbTRxg&riu=http%3a%2f%2fwww.hk-kicks.com%2fapp%2fuploads%2f2019%2f05%2fCD4487-100_A7_RightLateral_HR_87467-1024x629.jpg&ehk=Wzy1Pz04P%2b1BMNhgWfEoEDTpbO2zIdryJ%2fDmFC8mGPk%3d&risl=&pid=ImgRaw&r=0" alt="" class="h-full w-full object-cover object-center"/>
                  </div>
                </div>
                <div class="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                  <div class="h-64 w-44 overflow-hidden rounded-lg">
                    <img src="https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg" alt="" class="h-full w-full object-cover object-center"/>
                  </div>
                  <div class="h-64 w-44 overflow-hidden rounded-lg">
                    <img src="https://i.pinimg.com/236x/88/b7/6c/88b76cf2655bd81ab36d67e92f6468ac.jpg" alt="" class="h-full w-full object-cover object-center"/>
                  </div>
                  <div class="h-64 w-44 overflow-hidden rounded-lg">
                    <img src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-05.jpg" alt="" class="h-full w-full object-cover object-center"/>
                  </div>
                </div>
                <div class="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                  <div class="h-64 w-44 overflow-hidden rounded-lg">
                    <img src="https://i.pinimg.com/236x/60/1e/9e/601e9e724ee02f41a7ff76ab34ede5d6.jpg" alt="" class="h-full w-full object-cover object-center"/>
                  </div>
                  <div class="h-64 w-44 overflow-hidden rounded-lg">
                    <img src="https://i.pinimg.com/236x/37/7a/7e/377a7eb5fc291e2795cc5a0bdce8205e.jpg" alt="" class="h-full w-full object-cover object-center"/>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <a href="/products" class="inline-block rounded-md border border-transparent bg-zinc-800 px-8 py-3 text-center font-medium text-white hover:bg-gray-700">Shop Collection</a>
        </div>
      </div>
    </div>
  </div>
</div>
     </div>


<div className="lg:flex justify-between max-w-[1440px] m-auto h-auto md:mt-20 bg-neutral-200">
        <div className="bg-white border md:w-[450px] md:h-[380px] m-auto my-6">
          <div>
            <p className="text-left text-sm px-6 font-semibold text-gray-600 py-5">
              {" "}
              Flat 40% OFF <br/> Amazing ideas starting
              at $20
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 px-6 py-1">
            <img
              src="https://images-eu.ssl-images-amazon.com/images/G/31/img23/PB/March/Bikram/PC_QC_HOME_186_2._SY116_CB558389341_.jpg"
              alt=""
            />
            <img
              src="https://images-eu.ssl-images-amazon.com/images/G/31/img23/PB/March/Bikram/PC_QC_HOME_186_3._SY116_CB558389341_.jpg"
              alt=""
            />
            <img
              src="https://images-eu.ssl-images-amazon.com/images/G/31/img22/Fashion/Gateway/BAU/BTF-Refresh/May/PC_WF/WF4-186-116._SY116_CB636048992_.jpg"
              alt=""
            />
            <img
              src="https://images-eu.ssl-images-amazon.com/images/G/31/img23/PB/March/Bikram/PC_QC_HOME_186_1._SY116_CB558389341_.jpg"
              alt=""
            />
          </div>
        </div>
        <div className="bg-white border md:w-[450px] md:h-[380px] m-auto my-6">
          <div>
          <p className="text-left text-sm px-6 font-semibold text-gray-600 py-5">
              {" "}
              Flat 40% OFF <br/> Amazing ideas starting
              at $20
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 px-6 py-1">
            <img
              src="https://images-eu.ssl-images-amazon.com/images/G/31/IMG20/Home/2024/Gateway/BTFGW/PCQC/186x116_Home_furnishings_2._SY116_CB584596691_.jpg"
              alt=""
            />
            <img
              src="https://images-eu.ssl-images-amazon.com/images/G/31/IMG15/Irfan/GATEWAY/MSO/Appliances-QC-PC-186x116--B08RDL6H79._SY116_CB667322346_.jpg"
              alt=""
            />
            <img
              src="https://images-eu.ssl-images-amazon.com/images/G/31/img22/Fashion/Gateway/BAU/BTF-Refresh/May/PC_WF/WF4-186-116._SY116_CB636048992_.jpg"
              alt=""
            />
            <img
              src="https://images-eu.ssl-images-amazon.com/images/G/31/IMG15/Irfan/GATEWAY/MSO/186x116---wm._SY116_CB667322346_.jpg"
              alt=""
            />
          </div>
        </div>
        <div className="bg-white border md:w-[450px] md:h-[380px] m-auto my-6">
          <div>
          <p className="text-left text-sm px-6 font-semibold text-gray-600 py-5">
              {" "}
              Flat 40% OFF <br/> Amazing ideas starting
              at $20
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 px-6 py-1">
            <img
              src="https://images-eu.ssl-images-amazon.com/images/G/31/img23/PB/March/Bikram/PC_QC_HOME_186_2._SY116_CB558389341_.jpg"
              alt=""
            />
            <img
              src="https://images-eu.ssl-images-amazon.com/images/G/31/img23/PB/March/Bikram/PC_QC_HOME_186_3._SY116_CB558389341_.jpg"
              alt=""
            />
            <img
              src="https://images-eu.ssl-images-amazon.com/images/G/31/img22/Fashion/Gateway/BAU/BTF-Refresh/May/PC_WF/WF4-186-116._SY116_CB636048992_.jpg"
              alt=""
            />
            <img
              src="https://images-eu.ssl-images-amazon.com/images/G/31/img23/PB/March/Bikram/PC_QC_HOME_186_1._SY116_CB558389341_.jpg"
              alt=""
            />
          </div>
        </div>
      </div>


      <div className="max-w-[1300px] h-[680px] px-5 m-auto py-7 md:mt-20 group">
        <div
          style={{ backgroundImage: `url(${slides[curruntIndex].url})` }}
          className="lg:w-[1040px] m-auto h-full bg-center bg-cover duration-500"
        ></div>
        <div className="hidden group-hover:block absolute top-[240%] -translate-x-[-110%] translate-y-[80%] left-18 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <BsChevronCompactLeft onClick={prevSlide} size={30} />
        </div>
        <div className="hidden group-hover:block  absolute top-[245%] -translate-x-[-2520%] translate-y-0 right-18 text-2xl rounded-full p-2 bg-black/15 text-white cursor-pointer">
          <BsChevronCompactRight onClick={nextSlide} size={30} />
        </div>
        <div className="flex top-4 justify-center py-2">
          {slides.map((slide, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className="text-2xl cursor-pointer"
            >
              <RxDotFilled />
            </div>
          ))}
        </div>
      </div>
    </div>
 
 {/* mid section */}
    <div class="bg-white mt-12">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-20">
      <h2 class="text-2xl font-bold text-gray-900">Collections</h2>

      <div class="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
        <div class="group relative">
          <div class="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
            <img src="https://i.pinimg.com/564x/57/94/7a/57947a0918bdcded4d1d8daebd17b804.jpg"/>
          </div>
          <h3 class="mt-6 text-sm text-gray-500">
            <a href="#">
              <span class="absolute inset-0"></span>
              Compatible Furnitures
            </a>
          </h3>
          <p class="text-base font-semibold text-gray-900">Work from home accessories</p>
        </div>
        <div class="group relative">
          <div class="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
            <img src="https://i.pinimg.com/564x/6d/6a/34/6d6a34bac61fec596416d9ce7136426b.jpg"/>
          </div>
          <h3 class="mt-6 text-sm text-gray-500">
            <a href="#">
              <span class="absolute inset-0"></span>
              Aesthetic Home
            </a>
          </h3>
          <p class="text-base font-semibold text-gray-900">Home Decor</p>
        </div>
        <div class="group relative">
          <div class="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
            <img src="https://i.pinimg.com/474x/e1/4a/c8/e14ac8d60549a97838f9d1c6eed8676a.jpg" alt="Collection of four insulated travel bottles on wooden shelf." class="h-full w-full object-cover object-center"/>
          </div>
          <h3 class="mt-6 text-sm text-gray-500">
            <a href="#">
              <span class="absolute inset-0"></span>
              Travel
            </a>
          </h3>
          <p class="text-base font-semibold text-gray-900">Daily commute essentials</p>
        </div>
      </div>
    </div>
  </div>
</div>



    </>
  );
};
