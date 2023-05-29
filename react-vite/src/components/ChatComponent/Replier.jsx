export const Replier = (props) => {
  const {messageContent, time, image} = props;
    return (
        <>
          {/*replier*/}
          <div className="flex w-full mt-2 space-x-3 max-w-xs">
            {/*pfp*/}
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
            {/*pfp*/}
            <div>
              <div className={`${image ? 'p-0' : 'p-3'} ${messageContent ? 'bg-gray-300' : 'bg-transparent'} rounded-r-lg rounded-bl-lg`}>
                <p className={`${image && 'p-3'} text-sm`}>{messageContent}</p>
                {image && <img className="md:max-w-[250px] max-w-[156px] object-contain" src={`http://127.0.0.1:8000/${image}`}/>}
              </div>
              <div className="">
              </div>
              <span className="text-xs text-gray-500 leading-none">{time}</span>
            </div>
          </div>
          {/*replier*/}
        </>
    );
};
