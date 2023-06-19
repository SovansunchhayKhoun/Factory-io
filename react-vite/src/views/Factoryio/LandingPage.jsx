import {Link} from "react-router-dom";
import {UserCard} from "../../components/UserCard.jsx";
import {useAuthContext} from "../../context/AuthContext.jsx";

export const LandingPage = () => {

  return (
    <main className="flex flex-col gap-12">

      <section className="flex justify-between">
        <div className="">
          <div className="font-bold text-2xl leading-10">
            RESEARCH COMMUNITY <br/> FOR DEVELOPMENT
          </div>
          <div className="leading-7 mb-3">
            MAKE YOUR IMAGINATION <br/>
            BECOME REALITY WITH <br/>
            FACTORY.IO
          </div>
          <Link to={"/login"} className="bg-[#B21317] rounded-[50px] px-3 py-1">
            Join Us
          </Link>
        </div>
        <div className="w-[448px] h-[333px] justify-end">
          <img src="/assets/images/board.jpg" alt=""/>
        </div>
      </section>

      <section className="flex flex-col justify-center">
        <span className="font-bold leading-4">Featured on</span>
        <div className="flex flex-row columns-4 items-center mt-10 h-20 justify-between ">
          <Link to={"/"}>
            <img title="Factory-io" className="h-[20px]" src="/assets/images/factory.png" alt=""/>
          </Link>
          <Link to="/makerio">
            <img title={"Maker-io"} className="h-[25px]" src="/assets/images/makerio.png" alt=""/>
          </Link>
          <Link to={"#to-Robot-X"}>
            <img title="RobotX" className="h-[30px]" src="/assets/images/robotx.png" alt=""/>
          </Link>
          <a href="https://reachsaio.netlify.app/" target={"_blank"}>
            <img title={"Reachsa-io"} className="h-[60px]" src="/assets/images/reachsa.png" alt=""/>
          </a>
        </div>
      </section>

      <section className="flex justify-between items-start">
        <div className="flex items-center">
          <img width={448} src="/assets/images/Sound-Detection-Sensor-Module.jpg" alt=""/>
        </div>
        <div className="flex flex-col justify-center">
          <span className="font-semibold text-2xl leading-10">
            Shop Your Component <br/> With Maker.io
          </span>
          <div>
            <div className="leading-7">
              Start your project now and shop <br/>
              your component with us
            </div>
            <Link to={"/makerio"} className="bg-white border border-redHover text-red rounded-[50px] px-3 py-1">
              Buy Now
            </Link>
          </div>
        </div>
      </section>

      <section className="flex justify-between">

        <div className="flex flex-col justify-start">
          <div className="flex font-semibold text-2xl leading-10">
            Upload Your Project With Our Community
          </div>
          <div>
            <div className="flex leading-7">
              Sharing knowledge
              and your achievement with us
            </div>
            <Link to={"/login"} className="bg-white border border-redHover text-red rounded-[50px] px-3 py-1">
              Sign Up
            </Link>
          </div>
        </div>

        <div className="">
          <video width={448} autoPlay controls loop muted>
            <source src="/assets/images/vdpro.mp4" type="video/mp4"></source>
            Your browser does not support the video tag.
          </video>
        </div>

      </section>

      <section className="flex justify-between">

        <div className="flex justify-start mr-4">
          <img width={448} src="/assets/images/mrc.jpg" alt=""/>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-2xl leading-10">
            Check Out Recent Technology Contest
          </span>
          <div>
            <div className="leading-7">
              New Contest will be updated and
              we courage everyone in our community to join.
            </div>
            <Link to={"/contest"} className="bg-white border border-redHover text-red rounded-[50px] px-3 py-1">
              Check Out
            </Link>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center gap-6 font-medium">

        <div className="font-semibold text-2xl">
          About Us
        </div>

        <div className="flex justify-between">
          <div className="flex-1 leading-7 font-normal">
            Factory.io is working on the production and community of Maker, improvement and distribution of technology
            products. Manufacturers incorporate new technologies including Internet of Things (IoT), cloud computing and
            analytics, and AI and machine learning and Robotic and PLC systems and STEAM for Kid into their production
            and automation facilities.
          </div>
          <div className="flex-1 flex justify-end">
            <img width={448} src="/assets/images/abtus.jpg" alt=""/>
          </div>
        </div>

      </section>

      <section className="flex flex-col items-center gap-6">
        <div className="font-semibold text-2xl">
          Our Community
        </div>

        <div>
          <span className="flex flex-col justify-center-center text-center">
            The IoT (Internet of Things) platform community consists of a broad spectrum of people, groups, and businesses engaged in the creation, implementation, and usage of IoT platforms. For the purpose of facilitating the development of scalable and interoperable IoT systems, its focus is on defining standards, best practices, and working together on open-source projects. The community, which consists of software providers, system integrators, hardware producers, network operators, and end users, collaborates to address the technical, commercial, and legal issues related to IoT deployment and to create new use cases and applications that make use of IoT platforms.
          </span>
        </div>

        <div className="flex flex-col items-center gap-16 mt-12">
          <div className="grid grid-cols-5 auto-cols-fr">
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
          <div className="grid grid-cols-3 auto-cols-fr">
            <UserCard pf="kakada.jpg" name="Noch Kakada" position="Reachsa.io" management="PCB Coordinator"
                      fbL="https://web.facebook.com/profile.php?id=100032315051455"
                      LL="https://www.linkedin.com/in/noch-kakada-953bb7274"/>
            <UserCard pf="ratanak.jpg" name="Brorn Munyratanak" position="Maker.io"
                      management="Production Control Coordinator" fbl="https://web.facebook.com/gkmuny.ratanak.1"
                      LL="https://www.linkedin.com/in/brorn-munyratanak-9ab526254"/>
            <UserCard pf="marot.jpg" name="Tep Marot" position="Maker.io" management="Project Led"
                      fbL="https://www.facebook.com/daniel.ohhhyeaaa?mibextid=ZbWKwL"
                      LL="https://www.linkedin.com/in/tep-marot-575973262"/>
          </div>
        </div>
      </section>
    </main>
  );
};
