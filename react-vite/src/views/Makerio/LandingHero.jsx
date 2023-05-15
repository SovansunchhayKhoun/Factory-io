import {Link} from "react-router-dom";

export const LandingHero = () => {
    return (
        <>
        <main>
        <div>
          <div className="flex justify-center mt-20 ">
            <div className="mr-12 w-1/2">
              <span className="font-bold text-4xl leading-10">
                Shop your component with us
              </span>
              <div className="leading-7 mb-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.
              </div>
              <button className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-red-700 duration-300 bg-[#B21317] rounded-[50px] px-3 py-1">
                GET START
              </button>
            </div>
            <div className="w-[448px] h-[333px] mr-10 justify-end">
              <img src="/assets/images/MQ4-Gas-Sensor.jpg" alt=""/>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-bold leading-4">
              Featured on
            </span>
            <div className="flex flex-row justify-between items-center mt-6 h-20 mb-10">
              <img className="flex items-start w-30 h-6" src="/assets/images/factory.png" alt="" />
              <img className="flex items-center w-25 h-8" src="/assets/images/robotx.png" alt="" />
              <img className="flex items-end w-35 h-12" src="/assets/images/reachsa.png" alt="" />
            </div>
          </div>
          <div className="flex flex-col justify-center mt-10 ">
            <div className="flex font-bold text-lg justify-center ">
              Category
            </div>

            <div className="flex flex-row mt-8 justify-between columns-2 gap-3">
              <div className="max-w-[300px] min-h-[150px] shadow-2xl border border-[#59C3CB] rounded-lg p-6 flex flex-col transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
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
              <div className="max-w-[300px] min-h-[150px] shadow-2xl border border-[#59C3CB] rounded-lg p-6 flex flex-col transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
                <div className="flex-1 w-[200px]">
                  <img src="/assets/images/Sound-Detection-Sensor-Module.jpg"
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
              <div className="max-w-[300px] min-h-[150px] shadow-2xl border border-[#59C3CB] rounded-lg p-6 flex flex-col transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
                <div className="flex-1 w-[200px]">
                  <img src="/assets/images/Sound-Detection-Sensor-Module.jpg"
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
            <div className="flex flex-row mt-4 justify-between columns-2 gap-3">
              <div className="max-w-[300px] min-h-[150px] shadow-2xl border border-[#59C3CB] rounded-lg p-6 flex flex-col transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
                <div className="flex-1 w-[200px]">
                  <img src="/assets/images/Sound-Detection-Sensor-Module.jpg"
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
              <div className="max-w-[300px] min-h-[150px] shadow-2xl border border-[#59C3CB] rounded-lg p-6 flex flex-col transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
                <div className="flex-1 w-[200px]">
                  <img src="/assets/images/Sound-Detection-Sensor-Module.jpg"
                       alt=""/>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <div className="mr-3 font-bold text-[#00727A]">
                    Resistor
                  </div>
                  <div className="mr-3 text-[#8A0000]">
                  </div>
                  <button>
                    <img className="w-[6px] justify-end mt-2" src="/assets/images/arrow-right.png" alt=""/>
                  </button>
                </div>
              </div>
              <div className="max-w-[300px] min-h-[150px] shadow-2xl border border-[#59C3CB] rounded-lg p-6 flex flex-col transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
                <div className="flex-1 w-[200px]">
                  <img src="/assets/images/Sound-Detection-Sensor-Module.jpg"
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
              <button className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-red-700 duration-300 bg-[#B21317] rounded-[50px] px-3 py-1">
                See more
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-center mt-10 h-[300px]">
            <div className="font-bold text-lg justify-start">
              About Us
            </div>
            <div className="flex flex-col justify-center mt-6">
              <div className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 border border-gray-300 shadow-lg rounded-lg w-full h-[200px]">
                <div className="flex flex-row justify-between p-8">
                  <div className="flex flex-col justify-start w-1/2">
                    <div className="font-semibold text-lg">
                      Our Mojo
                    </div>
                    <div className="font-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco</div>
                  </div>
                  <div className="flex w-[250px] h-[150px]">
                    <img src="/assets/images/Sound-Detection-Sensor-Module.jpg" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </main>
        </>
    );
};
