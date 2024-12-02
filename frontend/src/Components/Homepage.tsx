import { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import axiosUser from "../hook/axiosUser";
import { useNavigate } from "react-router-dom";

interface Shoe {
  id: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  isAvailable: boolean;
  images: { url: string }[]; // Array ของ object ที่มี url เป็น string
  sizes: string;
  colors: string;
}

const Homepage = () => {
  const [shoes, setShoes] = useState<Shoe[]>([]);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosUser.get("/shoes");
        setShoes(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const getShoeByName = async (name: string) => {
    try {
      navigate(`/shoe/${name}`)
      // const res = await axiosUser.get(`/shoes/${name}`);
      // console.log(res.data);
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex flex-row-reverse z-0 bg-white px-10 h-screen">
        <div className="w-1/2 flex flex-row items-center justify-center">
          <div className="relative">
            <img
              className="w-[500px] object-center h-[500px] rounded-xl bg-gray-300"
              src="https://static.nike.com/a/images/w_1280,q_auto,f_auto/930bce93-cd80-4390-a841-ed0e23b292b3/%E0%B8%A7%E0%B8%B1%E0%B8%99%E0%B9%80%E0%B8%9B%E0%B8%B4%E0%B8%94%E0%B8%95%E0%B8%B1%E0%B8%A7-air-jordan-6-metallic-silver-dx2836-001.jpg"
              alt=""
            />
            <div
              className="absolute top-0 left-0 p-2 text-black text-xl font-bold bg-white rounded-br-xl"
              style={{ writingMode: "vertical-rl" }}
            >
              <span className="p-5 rounded-lg text-md">
                Air Jordan 6 Metallic Silver
              </span>
            </div>
          </div>
        </div>
        <div className="w-1/2 text-black rounded-3xl p-10 flex">
          <div className="flex flex-col justify-center items-center h-full">
            <div className="text-7xl flex flex-row flex-wrap items-center justify-start gap-3 font-bold">
              <span>Fine</span>
              <span>Your</span>
              <span>Dream</span>
              <span>Snekers</span>
            </div>
            <div className="my-5">
              <span className="text-xl">
                Fine your shoes from our various collections. here shoes are
                endless and profit is also endless.
              </span>
            </div>
            <div className="w-full">
              <button className="rounded-lg p-3 text-xl bg-blue-400 text-white hover:bg-blue-500 hover:scale-103 transform duration-300 ease-in-out">
                Export more
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex flex-row items-center justify-center my-10 text-black text-7xl pb-10">
          <span>Our Collection</span>
        </div>
        <div className="my-5 flex flex-row gap-10 flex-wrap items-center justify-center">
          {shoes?.slice(0, 6).map((card, i) => (
            <div key={i} className="relative w-96 drop-shadow-lg">
              <figure>
                <img
                  src={card?.images[0].url}
                  alt={`Shoes ${i}`}
                  className="rounded-xl w-full h-[200px] object-cover "
                />
              </figure>
              <div
                className="absolute top-0 left-0 w-full h-full card-body opacity-0 hover:opacity-100 
              transition-opacity duration-300 ease-in-out text-white bg-black bg-opacity-50 rounded-xl flex flex-col justify-center p-4"
              >
                <h2 className="card-title">{card?.name}</h2>
                <p>{card?.description}</p>
                <div className="card-actions justify-end">
                  <button onClick={() => getShoeByName(card?.name)} className="bg-opacity-50 hover:bg-opacity-100 text-white bg-red-500 px-3 py-3 rounded-xl">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center text-black">
          <button className="flex items-center gap-2 hover:text-blue-400">
            See All <FaArrowRightLong />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
