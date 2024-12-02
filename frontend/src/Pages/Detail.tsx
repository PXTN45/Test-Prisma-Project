import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosUser from "../hook/axiosUser";
import { BsBasket2Fill } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";
import {
  FaHeart,
  FaRegStar,
  FaRegStarHalfStroke,
  FaStar,
} from "react-icons/fa6";

interface shoe {
  id: number;
  name: string;
  images: { url: string }[]; // ประเภทของ images
  price: string;
  description: string;
  sizes: string;
  colors: string;
}

const detail = () => {
  const { name } = useParams();
  const [selectImg, setSelectImg] = useState<string>("");
  const [shoe, setShoe] = useState<shoe>();
  const [isHeart, setIsHeart] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosUser.get(`/shoes/${name}`);
        setShoe(response.data);
        setSelectImg(response.data?.images[0].url);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const array = [1, 2, 3, 4, 5];
  console.log(shoe);

  const starRating = (rating: number) => {
    const star = [];

    if (rating <= 5) {
      for (let index = 1; index < 6; index++) {
        if (index <= rating) {
          star.push(<FaStar className="text-yellow-400" />);
        } else if (index > rating && rating > index - 1) {
          star.push(<FaRegStarHalfStroke className="text-yellow-400" />);
        } else if (index > rating) {
          star.push(<FaRegStar className="text-yellow-400" />);
        }
      }
    }
    return star;
  };

  return (
    <div className="text-black">
      {shoe ? (
        <div>
          <div className="p-5 flex flex-row justify-center">
            <div className="p-5 flex flex-col justify-center items-center w-[600px]">
              <div className="w-full flex justify-center mb-5">
                <img
                  key={selectImg}
                  className="w-full h-[500px] object-cover rounded-xl transition-opacity duration-500 ease-in-out"
                  src={selectImg}
                  alt=""
                />
              </div>
              <div className="flex flex-row justify-between px-5 w-full gap-5">
                {shoe?.images.length > 0 &&
                  shoe?.images.map((img, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectImg(img.url)}
                      className="hover:scale-103 transform duration-300 cursor-pointer"
                    >
                      <img
                        className="w-[100px] h-[100px] rounded-xl border object-cover"
                        src={img.url}
                        alt=""
                      />
                    </div>
                  ))}
              </div>
            </div>
            <div className="p-5 h-[500px] w-[500px]">
              <div className="flex flex-col border p-10  rounded-xl bg-gray-400 bg-opacity-20 backdrop-blur-md">
                <span className="text-3xl font-bold ">{shoe?.name}</span>
                <span className="">{shoe?.description}</span>
                <span className="text-2xl my-5 text-red-500">
                  ฿{shoe?.price}
                </span>
                <div className="flex flex-col text-xl gap-4">
                  <span>size</span>
                  <span className="rounded-lg p-3 border-2 border-black w-20 flex justify-center">
                    {shoe.sizes}
                  </span>
                </div>
                <div className="flex flex-col gap-3 my-5">
                  <button className="w-full flex items-center justify-center hover:scale-101 transform duration-300 ease-in-out bg-black  rounded-xl py-3 gap-3 text-white text-xl">
                    <BsBasket2Fill /> Add to cart
                  </button>
                  <button
                    onClick={() => setIsHeart(!isHeart)}
                    className="w-full h-14 bg-gray-300 hover:scale-104 transform duration-300 ease-in-out  flex items-center justify-center rounded-xl"
                  >
                    รายการโปรด 
                    {isHeart === true ? (
                      <FaHeart className="text-2xl text-red-500" />
                    ) : (
                      isHeart === false && <FiHeart className="text-2xl" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex flex-row gap-5 border py-5 px-10 text-2xl">
              <span>Details</span>
              <span>Review</span>
            </div>
            <div className="flex flex-row">
              <div className="w-2/3 p-10 px-20 border-r">
                <div className="flex flex-row gap-5 border-t p-5">
                  <div>
                    <div>
                      <div className="avatar">
                        <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
                          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      <div>name</div>
                      <div className="flex flex-row text-md">
                        {starRating(4.7)}
                      </div>
                    </div>
                    <div className="py-5">
                      <span>asdasdasd</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row gap-5 border-t p-5">
                  <div>
                    <div>
                      <div className="avatar">
                        <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
                          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      <div>name</div>
                      <div className="flex flex-row text-md">
                        {starRating(4.7)}
                      </div>
                    </div>
                    <div className="py-5">
                      <span>asdasdasd</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row gap-5 border-t p-5">
                  <div>
                    <div>
                      <div className="avatar">
                        <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
                          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      <div>name</div>
                      <div className="flex flex-row text-md">
                        {starRating(4.7)}
                      </div>
                    </div>
                    <div className="py-5">
                      <span>asdasdasd</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-1/3 p-5">
                <div className="flex flex-row justify-between items-center gap-5 px-5 py-5">
                  <div className="flex flex-row text-3xl">
                    {starRating(4.7)}
                  </div>
                  <span>4.7</span>
                </div>
                <div className="flex flex-col gap-3 p-5 border-t-2">
                  {array.map((num, i) => (
                    <div key={i} className="flex items-center gap-2">
                      {num}
                      <progress
                        className="progress progress-warning w-full h-[20px]"
                        value={50}
                        max="100"
                      ></progress>
                      {num}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <span> item not found</span>
        </div>
      )}
    </div>
  );
};

export default detail;
