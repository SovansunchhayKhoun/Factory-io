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
            Shop Your Component With Maker.io
          </span>
          <div>
            <div className="leading-7 mb-3">
              Start your project now and shop
              your component with us
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
          Upload and share your Project with our community
        </span>
          <div>
            <div className="leading-7 mb-3">
              Sharing knowledge
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
          Check Out Recent Technology Contest
        </span>
          <div>
            <div className="leading-7 mb-3">
              New Contest will be updated and
              we courage everyone in our community to join
            </div>
            <button className="bg-white border border-redHover text-red rounded-[50px] px-3 py-1">
              Check Out
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-y-6 p-2 font-medium">
        <div className="font-semibold text-2xl">
            About Us
        </div>
        <div className="flex items-center">
          <div className="flex-1 leading-7 mr-12 font-normal text-center">
            Factory.io is working on the production and community of Maker, improvement and distribution of technology products. Manufacturers incorporate new technologies including Internet of Things (IoT), cloud computing and analytics, and AI and machine learning and Robotic and PLC systems and STEAM for Kid into their production and automation facilities.
          </div>
          <div className="flex-1 mt-4">
            <img src="/assets/images/team.jpg" alt=""/>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-y-3 mt-5">
        <div className="flex flex-col items-center gap-y-6 p-2 font-semibold text-2xl">
          Our Community
        </div>
        <div>
            <span className="flex flex-col items-center gap-y-6 p-2 font-normal text-center ">
              The IoT (Internet of Things) platform community consists of a broad spectrum of people, groups, and businesses engaged in the creation, implementation, and usage of IoT platforms. For the purpose of facilitating the development of scalable and interoperable IoT systems, its focus is on defining standards, best practices, and working together on open-source projects. The community, which consists of software providers, system integrators, hardware producers, network operators, and end users, collaborates to address the technical, commercial, and legal issues related to IoT deployment and to create new use cases and applications that make use of IoT platforms.
            </span>
        </div>
        <div className="grid-cols-5 items-center">
          <UserCard pf="seangly.jpg" name="Sou Seangly" position="Factory.io" manangement="Project superviser" fbL="https://web.facebook.com/profile.php?id=100022815573502" LL="https://www.linkedin.com/in/seangly-sou-20a9a81ab/" />
          <UserCard pf="doung.jpg" name="Ngob Doung" position="RobotX" manangement="Project Program Coordinator" fbL="" LL=""/>
          <UserCard pf="mol.jpg" name="Oem Pimol" position="RobotX" manangement="Program Business led" fbL="https://web.facebook.com/en.dy.9469" LL=""/>
          <UserCard pf="dara.jpg" name="Yi Chandara" position="Reachsa.io" manangement="Platform Coordinator" fbL="" LL=""/>
          <UserCard pf="udom.jpg" name="Ray Channudam" position="Reachsa.io" manangement="Platform & Business Coordinator" fbL="https://web.facebook.com/channudam.ray.9" LL="https://www.linkedin.com/in/chann-udam-ray-aa3387200"/>
          <UserCard pf="kakada.jpg" name="Noch Kakada" position="Reachsa.io" manangement="PCB Coordinator" fbL="https://web.facebook.com/profile.php?id=100032315051455" LL=""/>
          <UserCard pf="ratanak.jpg" name="Brorn Munyratanak" position="Maker.io" manangement="Production Control Coordinator" fbl="https://web.facebook.com/gkmuny.ratanak.1" LL="https://www.linkedin.com/in/brorn-munyratanak-9ab526254"/>
          <UserCard pf="marot.jpg" name="Tep Marot" position="Maker.io" manangement="Project Led" fbL="" LL="" />
        </div>
      </div>

    </main>
  );
};
