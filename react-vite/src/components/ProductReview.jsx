export const ProductReview = () => {
    return (
        <>

          <div
            className="max-w-[1000px] p-6 bg-white border border-gray-200 rounded-lg shadow mx-auto min-w-[300px] mt-16 flex flex-col gap-4">
              <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">WRITE A REVIEW</h5>
            <div className="flex flex-col">
              <label htmlFor="title" className="mb-2">Title: </label>
              <input className="border border-blackFactory rounded-sm" id="title" name="title" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="description" className="mb-2">Description: </label>
              <input className="border border-blackFactory rounded-sm"x id="description" name="title" />
            </div>
            <button className="py-2 px-4 bg-tealActive rounded text-white font-semibold hover:bg-tealBase">Submit</button>
          </div>

        </>
    )
}
