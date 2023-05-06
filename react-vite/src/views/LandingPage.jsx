import {Link} from "react-router-dom";

export const LandingPage = () => {
  return (
    <main className="">
      <div className="px-48 flex justify-center">
        <div className="mr-12">
        <span className="font-bold text-2xl leading-10">
          TECHNOLOGY COMMUNITY <br/> FOR DEVELOPMENT
        </span>
          <div className="leading-7 mb-3">
            MAKE YOUR IMAGINATION <br/>
            BECOME REALITY WITH <br/>
            FACTORY.IO
          </div>
          <button className="bg-[#B21317] rounded-[50px] px-3 py-1">
            Join Us
          </button>
        </div>
        <div className="w-[448px] h-[333px] mr-10 justify-end">
          <img src="/assets/images/board.jpg"/>
        </div>
      </div>
      <div className="px-48 flex justify-center">
        <div className="w-[448px] h-[333px] mr-10 justify-end">
          <img src="/assets/images/item1.png" alt=""/>
        </div>
        <div className="mr-12">
          <span className="font-semibold text-2xl leading-10">
            shop Your Component With<br/> Maker.io
          </span>
          <div className="leading-7 mb-3">
            Start your project now and shop<br/>
            your component with us <br/>
          </div>
        </div>
      </div>
      <div className="px-48 flex justify-center">
        <div className="mr-12">
        <span className="font-semibold text-2xl leading-10">
          Upload and share your <br/> Project with our community
        </span>
          <div className="leading-7 mb-3">
            Sharing knowledge <br/>
            and your achievement
          </div>
        </div>

        <div className="w-[448px] h-[333px] mr-10 justify-end">
          <img src="/assets/images/item1.png"/>
        </div>
      </div>
      <div className="px-48 flex justify-center">
        <div className="w-[448px] h-[333px] mr-10 justify-end">
          <img src="/assets/images/item1.png" alt=""/>
        </div>
        <div className="mr-12">
        <span className="font-semibold text-2xl leading-10">
          Check Out Recent Technology<br/> Contest
        </span>
          <div className="leading-7 mb-3">
            New Contest will be updated <br/>and we courage everyone in our<br/> community to join
          </div>
        </div>
      </div>
      <div>
        <div>
        <span className="flex flex-col items-center gap-y-6 p-2 font-medium ">
          About us
        </span>
        </div>
        <div className="jusity-items-center flex px-48">
          <div className="leading-7 mb-3">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </div>

          <div className="w-[400px] h-[300px] mr-10 justify-end">
            <img src="/assets/images/item1.png" alt=""/>
          </div>
        </div>
      </div>
      <div>
        <div>
            <span className="flex flex-col items-center gap-y-6 p-2 font-medium ">
              Our team
            </span>
        </div>
        <div>
            <span className="flex flex-col items-center gap-y-6 p-2 font-regular ">
              Amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut <br/>labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud <br/>exercitation ullamco laboris nisi.
            </span>
        </div>
        <div className="mx-auto grid grid-cols-6 gap-6 py-10 px-4 px-6">
          <div className="round-2x1 border border-slate-200 bg-white p-8 shadow-lg">
            <img src="/assets/images/item1.png" className="rounded-full h-14 shadow-s" alt=""/>
            <span className="text-sm font-semibold"> Tepin Sim</span>
            <span className="texxt-sm"><br/>Co-Funder</span>
          </div>
        </div>
      </div>
    </main>
  );
};
