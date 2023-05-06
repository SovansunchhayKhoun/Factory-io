export const UserCard = (props) => {
    return (
        <>
          <div className="user-card w-[200px] h-[250px] rounded-md inline-block border-2 border-black mr-6">
            <div className="px-6 py-3 flex flex-col items-center text-blackFactory font-semibold">
              <img className="w-[80px] h-[80px] border border-black rounded-[50%]" src="/assets/images/item1.png" alt=""/>
              <div className="font-bold">{props.name}</div>
              <div>
                {props.position}
              </div>
              <div className="flex flex-col items-center font-normal">
                <div>
                  {props.management}
                </div>
                <div>
                  {props.field}
                </div>
              </div>
              <div className="flex justify-between">
                <div><img className="w-[20px]" src="/assets/images/facebook_landing.png" alt=""/></div>
                <div><img className="w-[20px]" src="/assets/images/linkedin_landing.png" alt=""/></div>
              </div>
            </div>
          </div>
        </>
    );
};
