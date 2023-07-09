import React from "react";

export const Communitylanding = () => {
    return (
        <>
        <main>
          <div className="flex justify-center">
            <div className="mr-6 justify-between">
              <span className="font-bold text-2xl leading-10">
              A Community of Inventor in Cambodia
              </span>
                <div className="leading-7 mb-3">
                  Factory.io Community: The IoT (Internet of Things) platform<br/>
                  community consists of a broad spectrum of people, groups,<br/>
                  and businesses engaged in the creation, implementation,<br/>
                  and usage of IoT platforms. For the purpose of facilitating the<br/>
                  development of scalable and interoperable IoT systems, its focus is on<br/>
                  defining standards, best practices, and working together on open-source projects.
                  The community, which consists of software providers, system<br/>
                  integrators, hardware producers, network operators, and end users, <br/>
                  collaborates to address the technical, commercial, and legal issues <br/>
                  related to IoT deployment and to create new use cases and applications
                  that make use of IoT platforms.
                </div>
                <button className="bg-[#B21317] rounded-[50px] px-3 py-1">
                Join Us
                </button>
            </div>
            <div className="w-[600px] h-[500px] mr-10 justify-end">
              <img src="/assets/images/project.jpg" alt=""/>
            </div>
          </div>
        </main>
        </>
    );
};
