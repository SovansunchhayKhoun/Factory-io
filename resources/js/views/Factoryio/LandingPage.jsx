import React from "react";
import {Link} from "react-router-dom";
import {UserCard} from "../../components/UserCard.jsx";
import {useAuthContext} from "../../context/AuthContext.jsx";

export const LandingPage = () => {

  return (
    <main className="flex flex-col gap-8">

      <section className="flex justify-between gap-12">
        <div className="flex flex-col gap-3">
          <p className="flex flex-col font-bold text-2xl leading-10">
            RESEARCH COMMUNITY FOR DEVELOPMENT
          </p>
          <p className={"leading-7 font-normal text-base"}>
            MAKE YOUR IMAGINATION <br/>
            BECOME REALITY WITH <br/>
            FACTORY.IO
          </p>
          <Link to={"/login"} className="bg-[#B21317] w-fit rounded-[50px] px-3 py-1">
            Join Us
          </Link>
        </div>
        <div className="">
          <img className={'max-w-[448px] max-h-[333px]'} src="/assets/images/board.jpg" alt=""/>
        </div>
      </section>

      <section className="flex flex-col justify-center gap-12">
        <span className="font-bold leading-4">Featured on</span>
        <div className="flex items-center justify-between">
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

      <section className="flex justify-between gap-12">
        <div className="">
          <img className={"max-w-[448px] max-h-[333px]"} src="/assets/images/Sound-Detection-Sensor-Module.jpg" alt=""/>
        </div>
        <div className="flex flex-col gap-4">
          <p className="font-semibold text-2xl leading-10">
            Shop Your Component <br/> With Maker.io
          </p>
          <div className="leading-7">
            Start your project now and shop <br/>
            your component with us
          </div>
          <Link to={"/makerio"}
                className="w-fit bg-white border border-redHover text-red rounded-[50px] px-3 py-1">
            Buy Now
          </Link>
        </div>
      </section>

      <section className="flex justify-between gap-12">
        <div className="flex flex-col gap-3">
          <div className="flex font-semibold text-2xl leading-10">
            Upload Your Project <br/> With Our Community
          </div>
          <p className="flex leading-7">
            Sharing knowledge <br/>
            and your achievement with us
          </p>
          <Link to={"/login"}
                className="w-fit bg-white border border-redHover text-red rounded-[50px] px-3 py-1">
            Sign Up
          </Link>
        </div>

        <video className={"max-w-[448px] max-h-[333px]"} autoPlay controls loop muted>
          <source src="/assets/images/vdpro.mp4" type="video/mp4"></source>
          Your browser does not support the video tag.
        </video>

      </section>

      <section className="flex justify-between gap-12">
        <div className="">
          <img className={"max-w-[448px] max-h-[333px]"} src="/assets/images/mrc.jpg" alt=""/>
        </div>
        <div className="flex flex-col gap-3">
          <span className="font-semibold text-2xl leading-10">
            Check Out Recent Technology Contest
          </span>
          <div className="leading-7">
            New Contest will be updated and <br/>
            we courage everyone in our community to join.
          </div>
          <Link to={"/contest"}
                className="w-fit bg-white border border-redHover text-red rounded-[50px] px-3 py-1">
            Check Out
          </Link>
        </div>
      </section>

      <section className="flex flex-col gap-12 font-medium">

        <div className="text-center font-semibold text-2xl">
          About Us
        </div>

        <div className="flex justify-between">
          <div className="flex-1 leading-7 font-normal">
            Factory.io is working on the production and community of Maker, improvement and distribution of
            technology
            products. Manufacturers incorporate new technologies including Internet of Things (IoT), cloud
            computing and
            analytics, and AI and machine learning and Robotic and PLC systems and STEAM for Kid into their
            production
            and automation facilities.
          </div>
          <div className="flex-1 flex justify-end">
            <img className={"max-w-[448px] max-h-[333px]"} src="/assets/images/abtus.jpg" alt=""/>
          </div>
        </div>

      </section>

      <section className="flex flex-col items-center gap-4">
        <div className="font-semibold text-2xl">
          Our Community
        </div>

        <div className="flex flex-col justify-center-center text-center">
          The IoT (Internet of Things) platform community consists of a broad
          spectrum of people, groups, and businesses engaged in the creation, implementation,
          and usage of IoT platforms. For the purpose of facilitating the development of scalable
          and interoperable IoT systems, its focus is on defining standards, best practices, and working together on
          open-source projects.
          The community, which consists of software providers, system integrators, hardware producers, network
          operators, and end users, collaborates to address the technical,
          commercial, and legal issues related to IoT deployment and to create new use cases and applications that make
          use of IoT platforms.
        </div>

        <div className="mt-12 grid
          min-[1880px]:grid-cols-5
          xl:grid-cols-4
          lg:grid-cols-3 lg:gap-16
          auto-cols-fr auto-rows-fr">
          <UserCard pf="seangly.jpg" name="Sou Seangly" position="Factory.io"
                    management="Project superviser"
                    fbL="https://web.facebook.com/profile.php?id=100022815573502"
                    LL="https://www.linkedin.com/in/seangly-sou-20a9a81ab/"/>
          <UserCard pf="doung.jpg" name="Ngob Doung" position="RobotX"
                    management="Project Program Coordinator"
                    fbL="https://www.facebook.com/profile.php?id=100009312509919" LL=""/>
          <UserCard pf="mol.jpg" name="Oem Pimol" position="RobotX" management="Program Business led"
                    fbL="https://web.facebook.com/en.dy.9469" LL=""/>
          <UserCard pf="dara.jpg" name="Yi Chandara" position="Reachsa.io"
                    management="Platform Coordinator"
                    fbL="https://www.facebook.com/profile.php?id=100008439013405"
                    LL="https://www.linkedin.com/in/chandara-yi-302a00228/"/>
          <UserCard pf="udom.jpg" name="Ray Channudam" position="Reachsa.io"
                    management="Platform & Business Coordinator"
                    fbL="https://web.facebook.com/channudam.ray.9"
                    LL="https://www.linkedin.com/in/chann-udam-ray-aa3387200"/>
          <div className={"min-[1880px]:block sm:hidden"}></div>
          {/*dummy div to center grid items when big screen*/}
          <UserCard pf="kakada.jpg" name="Noch Kakada" position="Reachsa.io" management="PCB Coordinator"
                    fbL="https://web.facebook.com/profile.php?id=100032315051455"
                    LL="https://www.linkedin.com/in/noch-kakada-953bb7274"/>
          <UserCard pf="ratanak.jpg" name="Brorn Munyratanak" position="Maker.io"
                    management="Production Control Coordinator"
                    fbl="https://web.facebook.com/gkmuny.ratanak.1"
                    LL="https://www.linkedin.com/in/brorn-munyratanak-9ab526254"/>
          <UserCard pf="marot.jpg" name="Tep Marot" position="Maker.io" management="Project Led"
                    fbL="https://www.facebook.com/daniel.ohhhyeaaa?mibextid=ZbWKwL"
                    LL="https://www.linkedin.com/in/tep-marot-575973262"/>
          <div className={"min-[1880px]:block sm:hidden"}></div>
          {/*dummy div to center grid items when big screen*/}
        </div>
      </section>
    </main>
  );
};
