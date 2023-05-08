export const UserCard = (props) => {
    return (
        <>
          <div className="user-card w-[150px] h-[200px] rounded-md inline-block border-2 border-black justify-center items-center mr-6 mt-3">
            <div className="px-6 py-3 flex flex-col items-center text-blackFactory font-semibold">
              <img className="w-[80px] h-[80px] border border-black rounded-[50%]" src={"/assets/images/"+props.pf} alt=""/>
              <div className="font-bold text-center">{props.name}</div>
              <div className="justify-center">
                {props.position}
              </div>
              <div className="flex flex-col items-center font-normal">
                <div>
                  {props.management}
                </div>
              </div>
              <div className="flex justify-between ">
                <div><a href={props.fbL}><img className="w-[20px]" src="/assets/images/facebook_landing.png" alt=""/></a></div>
                <div><a href={props.LL}><img className="w-[20px]" src="/assets/images/linkedin_landing.png" alt=""/></a></div>
              </div>
            </div>
          </div>
        </>
    );
};
