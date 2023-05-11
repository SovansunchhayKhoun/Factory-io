export const PostCard = () => {
    return (
        <>
          <div className="max-w-sm bg-white border border-gray-400 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <img className="rounded-t-lg" src="/assets/images/board.jpg" alt=""/>
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Water Level</h5>
              </a>
              <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology
                acquisitions of 2021 so far, in reverse chronological order.</p>
              <a href="#">
                <h5 className="mb-6 text-sm font-bold text-gray-600 dark:text-white">Tepinsim</h5>
              </a>
              <div className="bottom-6 flex justify-between ">
                <div><img className="flex items-start" src="/assets/images/star.png" alt=""/></div>
                <div><img className="flex items-center" src="/assets/images/cmt.png" alt=""/></div>
                <div><img className="flex items-end" src="/assets/images/save.png" alt=""/></div>
              </div>
            </div>
          </div>
        </>

    );
};
