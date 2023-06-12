import {Link} from "react-router-dom";
export const NavSearchbar = ({searchInput, setSearchInput, handleSearchInput, filteredItem}) => {
  return (
        <>
          <div className="md:flex md:items-center md:gap-x-12 lg:w-[384px] hidden">
            <input type="text"
                   placeholder="Search..."
                   className="w-[100%] px-12 search-bar py-1 border-none"
                   value={searchInput}
                   onChange={event => {
                     handleSearchInput(event)
                   }}/>
            {/*<div className="">*/}
            {/*</div>*/}
            <div
              className={`flex flex-col gap-4 z-10 border border-gray-200 rounded-md absolute bg-white top-[75px] lg:w-[384px] cursor-pointer ${searchInput === "" && 'hidden'}`}>
              {filteredItem?.length === 0 && <div className="mx-auto mt-2"> No item found</div>}
              {filteredItem?.slice(0, 5).map((item, key) => {
                return (
                  <Link to={`maker-io/${item.id}`} onClick={e => {
                    e.stopPropagation()
                    getItem(item.id)
                    setSearchInput("")
                  }} key={key} className="px-4 py-2 flex flex-row justify-between items-center hover:bg-gray-100">
                    <p>
                      {item.name}
                    </p>
                    <img className="w-[50px]" src={`http://127.0.0.1:8000/${item.image}`} alt={item.name}/>
                  </Link>
                )
              })}
            </div>
          </div>
        </>
    );
};
