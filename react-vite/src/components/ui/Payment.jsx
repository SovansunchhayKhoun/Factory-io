export const Payment = () => {
  return (
    <>
      <div className="flex justify-between items-center bg-tealActive py-12 px-48">
        <div className="flex">
          <div className="flex flex-col mr-6">
            <h1 className="tracking-wider text-whiteFactory font-bold text-[24px]">Payment</h1>
            <select className="bg-[#D9D9D9] py-[2px] rounded-sm w-full text-blackFactory text-center font-bold" name=""
                    id="">
              <option value="">ABA</option>
            </select>
          </div>
          <img className="object-cover w-[200px] h-[200px]" src="/assets/images/qr-sample.jpg" alt=""/>
        </div>
        <div className="flex flex-col">
          <p className="font-bold text-[#D9D9D9]">
            Submit Screenshot
          </p>
          <label className="text-center text-xs font-bold text-[#989A9C] bg-whiteFactory py-1">
            Select Image
            <input type="file" id="files" className="opacity-0 w-[50%]"/>
          </label>
        </div>
      </div>
    </>
  );
};
