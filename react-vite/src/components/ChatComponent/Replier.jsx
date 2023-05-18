export const Replier = (props) => {
  const {messageContent, timeSent} = props;
    return (
        <>
          {/*replier*/}
          <div className="flex w-full mt-2 space-x-3 max-w-xs">
            {/*pfp*/}
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
            {/*pfp*/}
            <div>
              <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                <p className="text-sm">{messageContent}</p>
              </div>
              <span className="text-xs text-gray-500 leading-none">{timeSent}</span>
            </div>
          </div>
          {/*replier*/}
        </>
    );
};
