import { useEffect, useState } from "react";
import { MdOutlineSearch } from "react-icons/md";
import axiosUser from "../hook/axiosUser";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const [shoe, setShoe] = useState<any[]>([]);
  const [filteredshoe, setFilteredshoe] = useState<any[]>([]);
  const [searchData, setSearchData] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosUser.get("/shoes");
        setShoe(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);


  useEffect(() => {
    if (searchData.trim() === "") {
      setFilteredshoe([]);
    } else {
      const filtered = shoe.filter((furniture) =>
        furniture.name.toLowerCase().includes(searchData.toLowerCase())
      );
      setFilteredshoe(filtered);
    }
  }, [searchData, shoe]);

  return (
    <div className="drawer drawer-end">
      <input id="search" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="search" className="">
          <MdOutlineSearch className="text-3xl" />
        </label>
      </div>
      <div className="drawer-side z-20">
        <label
          htmlFor="search"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <ul className="menu bg-base-200 text-base-content min-h-full w-[500px] p-5">
          {/* Sidebar content here */}
          <label className="input input-bordered flex items-center gap-2 mb-10">
            <input
              type="text"
              value={searchData}
              className="grow"
              placeholder="Search"
              onChange={(e) => setSearchData(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
          {filteredshoe &&
            filteredshoe.map((shoe, index) => (
              <div
                key={index}
                onClick={() => navigate(`/furniture/${shoe?.id}`)}
                className="border h-[100px] rounded-lg hover:scale-102 hover:bg-white hover:text-black text-white transform duration-300 my-2"
              >
                <div className="flex gap-5">
                  <img
                    src={shoe.images[0].url}
                    alt="furniture"
                    className="w-[120px] h-[99px] rounded-lg"
                  />
                  <div className="py-3 flex flex-col w-full px-3">
                    <div className="flex flex-col">
                      <span className="font-bold">{shoe.name}</span>
                      <span className="truncate w-60">
                        {shoe.description}
                      </span>
                    </div>
                    <div className="flex justify-end my-1 w-full px-5">
                      <span>{shoe.price} ฿</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
