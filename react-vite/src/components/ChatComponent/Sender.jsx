export const Sender = (props) => {
  const {messageContent, time, image} = props;
  // const tempDate = Date.now();
  // console.log(tempDate);
  // const currentDate = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate() + ' ' + tempDate.getHours() + ':' + tempDate.getMinutes() + ':' + tempDate.getSeconds();

  return (
    <>
      {/*sender*/}
      <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
        <div>
          <div className={`${image ? 'p-0' : 'p-3'} ${messageContent ? 'bg-blue-600' : 'bg-transparent'} text-white rounded-l-lg rounded-br-lg`}>
            <p className={`${image && 'p-3'} text-sm`}>{messageContent}</p>
            {image && <img alt="" className="border md:max-w-[250px] max-w-[156px] object-contain bg-white" src={`http://127.0.0.1:8000/${image}`}/>}
          </div>
          <span className="text-xs text-gray-500 leading-none">{time}</span>
        </div>
        {/*pfp*/}
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
        {/*pfp*/}
      </div>
      {/*sender*/}
    </>
  );
};
