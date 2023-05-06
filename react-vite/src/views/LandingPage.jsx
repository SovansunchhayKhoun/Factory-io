import {Link} from "react-router-dom";
import {UserCard} from "../components/UserCard.jsx";

export const LandingPage = () => {
  return (
    <main className="">
      <div className="flex justify-center">
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
      <div className="px-48 mt-12 flex justify-center">
        <div className="w-[448px] h-[333px] mr-10 justify-end">
          <img src="/assets/images/item1.png" alt=""/>
        </div>
        <div className="">
          <span className="font-semibold text-2xl leading-10">
            Shop Your Component With<br/> Maker.io
          </span>
          <div>
            <div className="leading-7 mb-3">
              Start your project now and shop<br/>
              your component with us <br/>
            </div>
            <button className="bg-white border border-redHover text-red rounded-[50px] px-3 py-1">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="px-48 flex justify-center">
        <div className="mr-12">
        <span className="font-semibold text-2xl leading-10">
          Upload and share your <br/> Project with our community
        </span>
          <div>
            <div className="leading-7 mb-3">
              Sharing knowledge <br/>
              and your achievement
            </div>
            <button className="bg-white border border-redHover text-red rounded-[50px] px-3 py-1">
              Sign Up
            </button>
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
          <div>
            <div className="leading-7 mb-3">
              New Contest will be updated <br/>and we courage everyone in our<br/> community to join
            </div>
            <button className="bg-white border border-redHover text-red rounded-[50px] px-3 py-1">
              Check Out
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-y-6 p-2 font-medium">
        <div className="">
            About us
        </div>
        <div className="flex jusity-between">
          <div className="leading-7 mr-12">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </div>
          <div className="w-[400px] h-[300px]">
            <img src="/assets/images/item1.png" alt=""/>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-y-3">
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
        <div className="">
          <UserCard name="Tepin" position="Co-founder" manangement="Project Management" field="Robotics"/>
          <UserCard name="Sou Seangly" position="Co-founder" manangement="Project Management" field="Robotics"/>
          <UserCard name="Tepin" position="Co-founder" manangement="Project Management" field="Robotics"/>
          <UserCard name="Tepin" position="Co-founder" manangement="Project Management" field="Robotics"/>
          <UserCard name="Tepin" position="Co-founder" manangement="Project Management" field="Robotics"/>
        </div>
      </div>

    </main>
  );
};
