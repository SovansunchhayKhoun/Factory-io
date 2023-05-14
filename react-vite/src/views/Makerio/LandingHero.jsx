import Button from "@mui/material/Button";
import {Link} from "react-router-dom";

export const LandingHero = () => {
    return (
        <>
        <main>
          <div className="flex justify-center mb-12 mt-10">
            <div className="mr-12 w-1/2">
              <span className="font-bold text-4xl leading-10">
                Shop your component with us
              </span>
              <div className="leading-7 mb-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.
              </div>
              <button className="bg-[#B21317] rounded-[50px] px-3 py-1">
                GET START
              </button>
            </div>
            <div className="w-[448px] h-[333px] mr-10 justify-end">
              <img src="/assets/images/board.jpg" alt=""/>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-bold leading-4">Featured on</span>
            <div className="flex flex-row justify-between items-center mt-6 h-20">
              <img className="flex items-start w-30 h-6" src="/assets/images/factory.png" alt="" />
              <img className="flex items-center w-25 h-8" src="/assets/images/robotx.png" alt="" />
              <img className="flex items-end w-35 h-12" src="/assets/images/reachsa.png" alt="" />
            </div>
          </div>
          <div className="flex flex-col justify-center mt-10">
            <div className="flex font-bold text-lg justify-center ">
              Category
            </div>

            <div className="flex mt-4 flex-col mb-8 ">
              <div className="flex flex-row justify-between">
                <div className="justify-start leading-5 font-semibold">
                  Sensor
                </div>
                <span className="text-red-900 justify-ennd">
                    See more
                </span>
              </div>
              <div className="flex flex-row mt-8 justify-between">
                <div className="max-w-[200px] min-h-[250px] shadow-2xl border border-[#59C3CB] p-6 flex flex-col items-center">
                  <div className="flex-1 text-center font-semibold">
                    Sound Detection Sensor
                  </div>
                  <div className="flex-2">
                    <img className="hover:scale-75 ease-in-out duration-300 " src="/assets/images/Sound-Detection-Sensor-Module.jpg"
                         alt=""/>
                  </div>
                  <div className="flex-1 flex">
                    <div className="mt-auto flex items-center">
                      <div className="mr-3 font-bold text-[#00727A]">
                        5$
                      </div>
                    </div>
                  </div>
                </div>

                <div className="max-w-[200px] min-h-[250px] shadow-2xl border border-[#59C3CB] p-6 flex flex-col items-center">
                  <div className="flex-1 text-center font-semibold">
                    DHT11 Temperature and humidity Sensor
                  </div>
                  <div className="flex-2">
                    <img className="hover:scale-75 ease-in-out duration-300 " src="/assets/images/SN-DHT11-MOD%20(a)-800x800.jpg"
                         alt=""/>
                  </div>
                  <div className="flex-1 flex">
                    <div className="mt-auto flex items-center">
                      <div className="mr-3 font-bold text-[#00727A]">
                        5$
                      </div>
                    </div>
                  </div>
                </div>

                <div className="max-w-[200px] min-h-[250px] shadow-2xl border border-[#59C3CB] p-6 flex flex-col items-center">
                  <div className="flex-1 text-center font-semibold">
                    DHT11 Temperature and humidity Sensor
                  </div>
                  <div className="flex-2">
                    <img className="hover:scale-75 ease-in-out duration-300 " src="/assets/images/SN-DHT11-MOD%20(a)-800x800.jpg"
                         alt=""/>
                  </div>
                  <div className="flex-1 flex">
                    <div className="mt-auto flex items-center">
                      <div className="mr-3 font-bold text-[#00727A]">
                        5$
                      </div>
                    </div>
                  </div>
                </div>

                <div className="max-w-[200px] min-h-[250px] shadow-2xl border border-[#59C3CB] p-6 flex flex-col items-center">
                  <div className="flex-1 text-center font-semibold">
                    DHT11 Temperature and humidity Sensor
                  </div>
                  <div className="flex-2">
                    <img className="hover:scale-75 ease-in-out duration-300 " src="/assets/images/SN-DHT11-MOD%20(a)-800x800.jpg"
                         alt=""/>
                  </div>
                  <div className="flex-1 flex">
                    <div className="mt-auto flex items-center">
                      <div className="mr-3 font-bold text-[#00727A]">
                        5$
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div className="flex mt-4 mb-8 flex-col ">
              <div className="flex flex-row justify-between">
                <div className="justify-start leading-5 font-semibold">
                  Micro-Controller
                </div>
                <span className="text-red-900 justify-ennd">
                    See more
                </span>
              </div>
              <div className="flex flex-row mt-8 justify-between">
                <div className="max-w-[200px] min-h-[250px] shadow-2xl border border-[#59C3CB] p-6 flex flex-col items-center">
                  <div className="flex-1 text-center font-semibold">
                    Sound Detection Sensor
                  </div>
                  <div className="flex-2">
                    <img className="hover:scale-75 ease-in-out duration-300 " src="/assets/images/Sound-Detection-Sensor-Module.jpg"
                         alt=""/>
                  </div>
                  <div className="flex-1 flex">
                    <div className="mt-auto flex items-center">
                      <div className="mr-3 font-bold text-[#00727A]">
                        5$
                      </div>
                    </div>
                  </div>
                </div>

                <div className="max-w-[200px] min-h-[250px] shadow-2xl border border-[#59C3CB] p-6 flex flex-col items-center">
                  <div className="flex-1 text-center font-semibold">
                    DHT11 Temperature and humidity Sensor
                  </div>
                  <div className="flex-2">
                    <img className="hover:scale-75 ease-in-out duration-300 " src="/assets/images/SN-DHT11-MOD%20(a)-800x800.jpg"
                         alt=""/>
                  </div>
                  <div className="flex-1 flex">
                    <div className="mt-auto flex items-center">
                      <div className="mr-3 font-bold text-[#00727A]">
                        5$
                      </div>
                    </div>
                  </div>
                </div>

                <div className="max-w-[200px] min-h-[250px] shadow-2xl border border-[#59C3CB] p-6 flex flex-col items-center">
                  <div className="flex-1 text-center font-semibold">
                    DHT11 Temperature and humidity Sensor
                  </div>
                  <div className="flex-2">
                    <img className="hover:scale-75 ease-in-out duration-300 " src="/assets/images/SN-DHT11-MOD%20(a)-800x800.jpg"
                         alt=""/>
                  </div>
                  <div className="flex-1 flex">
                    <div className="mt-auto flex items-center">
                      <div className="mr-3 font-bold text-[#00727A]">
                        5$
                      </div>
                    </div>
                  </div>
                </div>

                <div className="max-w-[200px] min-h-[250px] shadow-2xl border border-[#59C3CB] p-6 flex flex-col items-center">
                  <div className="flex-1 text-center font-semibold">
                    DHT11 Temperature and humidity Sensor
                  </div>
                  <div className="flex-2">
                    <img className="hover:scale-75 ease-in-out duration-300 " src="/assets/images/SN-DHT11-MOD%20(a)-800x800.jpg"
                         alt=""/>
                  </div>
                  <div className="flex-1 flex">
                    <div className="mt-auto flex items-center">
                      <div className="mr-3 font-bold text-[#00727A]">
                        5$
                      </div>
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
