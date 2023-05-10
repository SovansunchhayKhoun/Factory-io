export const UserCard = (props) => {
    return (
        <>
          <div className="user-card py-1 flex justify-center min-w-[200px] min-h-[250px] rounded-lg mr-6">
            <div className="inner-card relative border-2 border-black rounded-md bg-whiteFactory text-blackFactory font-semibold">
              <div className="flex justify-center mb-12">
                <img className="absolute top-[-50px] w-[100px] h-[100px] rounded-[50%]" src={"/assets/images/"+props.pf} alt=""/>
              </div>
              <div className="flex-1 p-3 relative flex flex-col items-center">
                <div className="font-bold text-center">{props.name}</div>
                <div className="text-center">
                  {props.position}
                </div>
                <div className="font-normal text-center">
                  {props.management}
                </div>
                <div className="absolute bottom-6 flex justify-center">
                  <div><a href={props.fbL}><img className="w-[20px]" src="/assets/images/facebook_landing.png" alt=""/></a></div>
                  <div><a href={props.LL}><img className="w-[20px]" src="/assets/images/linkedin_landing.png" alt=""/></a></div>
                </div>
              </div>
            </div>
          </div>
        </>
    );
};
