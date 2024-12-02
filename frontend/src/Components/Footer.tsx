
const Footer = () => {
  return (
    <div className="border h-full bg-gray-800 text-white">
      <div className="flex justify-between p-10">
        <div className="flex flex-col items-center justify-center w-1/4">
          <div className="text-2xl font-bold">Restaurant</div>
          <div className="text-md mt-2">Delicious food made with love</div>
        </div>
        <div className="w-1/4 flex flex-col items-center justify-center">
          <div className="text-xl font-bold">About Us</div>
          <div className="flex flex-col text-md my-5 gap-3">
            <span>Home</span>
            <span>About Us</span>
            <span>Services</span>
            <span>Shop</span>
            <span>Contact Us</span>
          </div>
        </div>
        <div className="w-1/4 flex flex-col items-center justify-center">
          <div className="text-xl font-bold">Follow Us</div>
          <div className="flex flex-col text-md my-5 gap-3">
            <span>Facebook</span>
            <span>Instagram</span>
            <span>Twitter</span>
            <span>YouTube</span>
          </div>
        </div>
        <div className="w-1/4 flex flex-col items-center justify-center">
          <div className="text-xl font-bold">Contact Us</div>
          <div className="flex flex-col text-md my-5 gap-3">
            <span>+123 456 7890</span>
            <span>info@restaurant.com</span>
            <span>123 Food Street, City</span>
          </div>
        </div>
      </div>
      <div className="h-[50px]  border-t-2 flex items-center justify-center">
        <span className="text-md">
          &copy; 2024 Restaurant Name. All rights reserved.
        </span>
      </div>
    </div>
  );
};

export default Footer;
