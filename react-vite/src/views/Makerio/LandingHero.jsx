import {Link, useNavigate} from "react-router-dom";
import {useContext} from "react";
import ProductContext from "../../context/ProductContext.jsx";

export const LandingHero = () => {
  const {setSearchInput} = useContext(ProductContext)
  const navigate = useNavigate()
  return (
    <>
    <main>
      <div>
        <div className="flex lg:flex-row justify-center mt-20 columns-2 md:flex-col sm:flex-col mb-20">
          <div className="mr-12 lg:w-1/2 md:w-full ">
              <span className="font-bold lg:text-4xl leading-10 md:text-2xl">
                Shop your component with us
              </span>
            <div className="lg:leading-7 mb-3 md:text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum
              tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae
              erat.
            </div>
            <Link
              to={'/maker-io'}
              className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-red-700 duration-300 bg-[#B21317] rounded-[50px] px-3 py-1">
              GET STARTED
            </Link>
        </div>
        <div className=" mr-10 justify-end ">
          <img className="w-[500px] h-[220px]" src="/assets/images/MQ4-Gas-Sensor.jpg" alt=""/>
        </div>
      </div>
      <div className="flex flex-col justify-center">
            <span className="font-bold leading-4">
              Featured on
            </span>
        <div className="flex flex-row justify-between items-center mt-6 h-20 mb-10 ">
          <img className="flex lg:h-[20px] sm:h-[12px]" src="/assets/images/factory.png" alt=""/>
          <img className="flex lg:h-[30px] sm:h-[22px]" src="/assets/images/robotx.png" alt=""/>
          <img className="flex lg:h-[55px] sm:h-[47px]" src="/assets/images/reachsa.png" alt=""/>
        </div>
      </div>
      <div className="flex flex-col justify-center mt-10 ">
        <div className="flex font-bold text-lg justify-center ">
          Category
        </div>

        <div className="cursor-pointer flex flex-row mt-8 justify-center gap-x-5">
          <div
            onClick={() => {
              setSearchInput('sensor')
              navigate('/maker-io')
            }}
            className="max-w-[300px] min-h-[150px] shadow-2xl border border-[#59C3CB] rounded-lg p-6 flex flex-col transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
            <div className="flex-1 w-[200px]">
              <img src="/assets/images/Sound-Detection-Sensor-Module.jpg"
                   alt=""/>
            </div>
            <div className="mt-auto flex items-center justify-between">
              <div className="mr-3 font-bold text-[#00727A]">
                Sensor
              </div>
              <div className="mr-3 text-[#8A0000]">
              </div>
              <button>
                <img className="w-[6px] justify-end mt-2" src="/assets/images/arrow-right.png" alt=""/>
              </button>
            </div>
          </div>
          <div
            onClick={() => {
              setSearchInput('microcontroller')
              navigate('/maker-io')
            }}
            className="cursor-pointer max-w-[300px] min-h-[150px] shadow-2xl border border-[#59C3CB] rounded-lg p-6 flex flex-col transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
            <div className="flex-1 w-[200px]">
              <img src="/assets/images/Microcon.png"
                   alt=""/>
            </div>
            <div className="mt-auto flex items-center justify-between">
              <div className="mr-3 font-bold text-[#00727A]">
                Micro-Controller
              </div>
              <div className="mr-3 text-[#8A0000]">
              </div>
              <button>
                <img className="w-[6px] justify-end mt-2" src="/assets/images/arrow-right.png" alt=""/>
              </button>
            </div>
          </div>
          <div
            onClick={() => {
              setSearchInput('microprocessor')
              navigate('/maker-io')
            }}
            className="cursor-pointer max-w-[300px] min-h-[150px] shadow-2xl border border-[#59C3CB] rounded-lg p-6 flex flex-col transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
            <div className="flex-1 w-[200px]">
              <img src="/assets/images/mproc.jpg"
                   alt=""/>
            </div>
            <div className="mt-auto flex items-center justify-between">
              <div className="mr-3 font-bold text-[#00727A]">
                Micro-Processor
              </div>
              <div className="mr-3 text-[#8A0000]">
              </div>
              <button>
                <img className="w-[6px] justify-end mt-2" src="/assets/images/arrow-right.png" alt=""/>
              </button>
            </div>
          </div>
        </div>
        <div
          onClick={() => {
            setSearchInput('tools')
            navigate('/maker-io')
          }}
          className="flex flex-row mt-4 justify-center gap-x-5">
          <div
            className="cursor-pointer max-w-[300px] min-h-[150px] shadow-2xl border border-[#59C3CB] rounded-lg p-6 flex flex-col transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
            <div className="flex-1 w-[200px]">
              <img src="/assets/images/toolpic.jpg"
                   alt=""/>
            </div>
            <div className="mt-auto flex items-center justify-between">
              <div className="mr-3 font-bold text-[#00727A]">
                Tools
              </div>
              <div className="mr-3 text-[#8A0000]">
              </div>
              <button>
                <img className="w-[6px] justify-end mt-2" src="/assets/images/arrow-right.png" alt=""/>
              </button>
            </div>
          </div>
          <div
            onClick={() => {
              setSearchInput('resistor')
              navigate('/maker-io')
            }}
            className="cursor-pointer max-w-[300px] min-h-[150px] shadow-2xl border border-[#59C3CB] rounded-lg p-6 flex flex-col transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
            <div className="flex-1 w-[200px]">
              <img src="/assets/images/electro.jpg"
                   alt=""/>
            </div>
            <div className="mt-auto flex items-center justify-between">
              <div className="mr-3 font-bold text-[#00727A]">
                Electronic Component
              </div>
              <div className="mr-3 text-[#8A0000]">
              </div>
              <button>
                <img className="w-[6px] justify-end mt-2" src="/assets/images/arrow-right.png" alt=""/>
              </button>
            </div>
          </div>
          <div
            onClick={() => {
              setSearchInput('battery')
              navigate('/maker-io')
            }}
            className="cursor-pointer max-w-[300px] min-h-[150px] shadow-2xl border border-[#59C3CB] rounded-lg p-6 flex flex-col transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
            <div className="flex-1 w-[200px]">
              <img src="/assets/images/battery.jpg"
                   alt=""/>
            </div>
            <div className="mt-auto flex items-center justify-between">
              <div className="mr-3 font-bold text-[#00727A]">
                Battery
              </div>
              <div className="mr-3 text-[#8A0000]">
              </div>
              <button>
                <img className="w-[6px] justify-end mt-2" src="/assets/images/arrow-right.png" alt=""/>
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-10">
          <button
            className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-red-700 duration-300 bg-[#B21317] rounded-[50px] px-3 py-1">
            See more
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-center mt-10 h-[300px]">
        <div className="font-bold text-lg justify-start">
          About Us
        </div>
        <div className="flex flex-col justify-center mt-6">
          <div
            className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 border border-gray-300 shadow-lg rounded-lg w-full h-[200px]">
            <div className="flex flex-row justify-between p-8">
              <div className="flex flex-col justify-start w-1/2">
                <div className="font-semibold text-lg">
                  Our Mojo
                </div>
                <div className="font-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco
                </div>
              </div>
              <div className="flex w-[250px] h-[150px]">
                <img src="/assets/images/Sound-Detection-Sensor-Module.jpg" alt=""/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </main>
</>
)
  ;
};
