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
          Upload and share your Project<br/> with our community
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
          <video>
            <source src="/assets/images/vdpro.MP4" type="video/mp4"></source>
          </video>
        </div>
      </div>
      <div className="px-48 flex justify-center">
        <div className="w-[448px] h-[333px] mr-10 justify-end">
          <img src="/assets/images/mrc.jpg" alt=""/>
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
            About Us
        </div>
        <div className="flex flex-col items-center">
          <div className="leading-7 mr-12 ">
            Factory.io is working on the production and community of Maker, improvement and distribution of technology products. Manufacturers incorporate new technologies including Internet of Things (IoT), cloud computing and analytics, and AI and machine learning and Robotic and PLC systems and STEAM for Kid into their production and automation facilities.
          </div>
          <div className="w-[400px] h-[300px] mt-4">
            <img src="/assets/images/team.jpg" alt=""/>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-y-3">
        <div>
            <span className="flex flex-col items-center gap-y-6 p-2 font-medium ">
              Our Community
            </span>
        </div>
        <div>
            <span className="flex flex-col items-center gap-y-6 p-2 font-regular ">
              The IoT (Internet of Things) platform community consists of a broad spectrum of people, groups, and businesses engaged in the creation, implementation, and usage of IoT platforms. For the purpose of facilitating the development of scalable and interoperable IoT systems, its focus is on defining standards, best practices, and working together on open-source projects. The community, which consists of software providers, system integrators, hardware producers, network operators, and end users, collaborates to address the technical, commercial, and legal issues related to IoT deployment and to create new use cases and applications that make use of IoT platforms.
            </span>
        </div>
        <div className="">
          <UserCard name="Sou Seangly" position="Factory.io" manangement="Project superviser" />
          <UserCard name="Ngob Doung" position="RobotX" manangement="Project Program Coordinator"/>
          <UserCard name="Oum Pimol" position="RobotX" manangement="Program Business led" />
          <UserCard name="Yi Chandara" position="Reachsa.io" manangement="Platform Coordinator" />
          <UserCard name="Ray Channudam" position="Reachsa.io" manangement="Platform & Business Coordinator" />
          <UserCard name="Noch Kakada" position="Reachsa.io" manangement="PCB Coordinator" />
          <UserCard name="Brorn Munyratanak" position="Maker.io" manangement="Production Control Coordinator"/>
          <UserCard name="Tep Marot" position="Maker.io" manangement="Project Led" />
        </div>
      </div>

    </main>
  );
};
