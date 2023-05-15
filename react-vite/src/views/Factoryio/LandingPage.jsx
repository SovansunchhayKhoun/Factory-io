import {Link} from "react-router-dom";
import {UserCard} from "../../components/UserCard.jsx";

export const LandingPage = () => {
  return (
    <main className="">
      <div className="flex justify-center mb-12">
        <div className="mr-12">
        <span className="font-bold text-2xl leading-10">
          RESEARCH COMMUNITY <br/> FOR DEVELOPMENT
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
          <img src="/assets/images/board.jpg" alt=""/>
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <span className="font-bold leading-4">Featured on</span>
        <div className="flex flex-row justify-between mt-10 h-20">
          <img className="flex items-start w-30 h-6" src="/assets/images/factory.png" alt="" />
          <img className="flex items-center w-30 h-10" src="/assets/images/makerio.png" alt="" />
          <img className="flex items-center w-30 h-10" src="/assets/images/robotx.png" alt="" />
          <img className="flex items-end w-35 h-14 mb-7" src="/assets/images/reachsa.png" alt="" />
        </div>
      </div>

      <div className="px-40 mb-10 flex justify-center">
        <div className="flex items-center w-1/2 h-[300px] mr-10">
          <img src="/assets/images/Sound-Detection-Sensor-Module.jpg" alt=""/>
        </div>
          <div className="flex flex-col justify-center w-1/2">
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

      <div className="px-40 flex justify-center">
        <div className="flex flex-col justify-start w-1/2 mr-4">
          <div className="flex font-semibold text-2xl leading-10">
            Upload Your Project With Our Community
          </div>
          <div>
            <div className="flex leading-7 mb-2">
              Sharing knowledge
              and your achievement with us
            </div>
            <button className="bg-white border border-redHover text-red rounded-[50px] px-3 py-1">
              Sign Up
            </button>
          </div>
        </div>

        <div className="mr-10 w-1/2 h-[300px] ">
          <video autoPlay controls loop muted>
            <source src="/assets/images/vdpro.mp4" type="video/mp4"></source>
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <div className="px-40 flex justify-center h-[300px]">
        <div className="flex justify-start w-[350px] h-[200px] mr-4">
          <img src="/assets/images/mrc.jpg" alt=""/>
        </div>
        <div className="flex flex-col w-1/2">
          <span className="font-semibold text-2xl leading-10">
            Check Out Recent Technology Contest
          </span>
          <div>
            <div className="leading-7 mb-2">
              New Contest will be updated and
              we courage everyone in our community to join.
            </div>
            <button className="bg-white border border-redHover text-red rounded-[50px] px-3 py-1">
              Check Out
            </button>
          </div>
        </div>
      </div>
      <div className="px-40 mb-12 flex flex-col items-center p-2 font-medium">
        <div className="font-semibold text-2xl">
          About Us
        </div>
        <div className="flex flex-row justify-between mt-4">
          <div className="flex justify-start leading-7 mr-12 font-normal w-1/2 ">
            Factory.io is working on the production and community of Maker, improvement and distribution of technology
            products. Manufacturers incorporate new technologies including Internet of Things (IoT), cloud computing and
            analytics, and AI and machine learning and Robotic and PLC systems and STEAM for Kid into their production
            and automation facilities.
          </div>
          <div className="flex justify-end mt-4 w-1/2">
            <img src="/assets/images/abtus.jpg" alt=""/>
          </div>
        </div>
      </div>
      <div className="px-48 flex flex-col items-center gap-y-3 mt-5">
        <div className="flex flex-col items-center gap-y-6 p-2 font-semibold text-2xl">
          Our Community
        </div>
        <div>
            <span className="flex flex-col items-center gap-y-6 p-2 font-normal text-center mb-12">
              The IoT (Internet of Things) platform community consists of a broad spectrum of people, groups, and businesses engaged in the creation, implementation, and usage of IoT platforms. For the purpose of facilitating the development of scalable and interoperable IoT systems, its focus is on defining standards, best practices, and working together on open-source projects. The community, which consists of software providers, system integrators, hardware producers, network operators, and end users, collaborates to address the technical, commercial, and legal issues related to IoT deployment and to create new use cases and applications that make use of IoT platforms.
            </span>
        </div>
        <div className="flex flex-col items-center gap-16">
          <div className="grid grid-cols-5">
            <UserCard pf="seangly.jpg" name="Sou Seangly" position="Factory.io" management="Project superviser"
                      fbL="https://web.facebook.com/profile.php?id=100022815573502"
                      LL="https://www.linkedin.com/in/seangly-sou-20a9a81ab/"/>
            <UserCard pf="doung.jpg" name="Ngob Doung" position="RobotX" management="Project Program Coordinator"
                      fbL="https://www.facebook.com/profile.php?id=100009312509919" LL=""/>
            <UserCard pf="mol.jpg" name="Oem Pimol" position="RobotX" management="Program Business led"
                      fbL="https://web.facebook.com/en.dy.9469" LL=""/>
            <UserCard pf="dara.jpg" name="Yi Chandara" position="Reachsa.io" management="Platform Coordinator"
                      fbL="https://www.facebook.com/profile.php?id=100008439013405"
                      LL="https://www.linkedin.com/in/chandara-yi-302a00228/"/>
            <UserCard pf="udom.jpg" name="Ray Channudam" position="Reachsa.io"
                      management="Platform & Business Coordinator"
                      fbL="https://web.facebook.com/channudam.ray.9"
                      LL="https://www.linkedin.com/in/chann-udam-ray-aa3387200"/>
          </div>
          <div className="grid grid-cols-3">
            <UserCard pf="kakada.jpg" name="Noch Kakada" position="Reachsa.io" management="PCB Coordinator"
                      fbL="https://web.facebook.com/profile.php?id=100032315051455" LL="https://www.linkedin.com/in/noch-kakada-953bb7274"/>
            <UserCard pf="ratanak.jpg" name="Brorn Munyratanak" position="Maker.io"
                      management="Production Control Coordinator" fbl="https://web.facebook.com/gkmuny.ratanak.1"
                      LL="https://www.linkedin.com/in/brorn-munyratanak-9ab526254"/>
            <UserCard pf="marot.jpg" name="Tep Marot" position="Maker.io" management="Project Led" fbL="https://www.facebook.com/daniel.ohhhyeaaa?mibextid=ZbWKwL" LL="https://www.linkedin.com/in/tep-marot-575973262"/>
          </div>
        </div>
      </div>

    </main>
  );
};
