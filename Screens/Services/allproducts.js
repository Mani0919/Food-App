import img1 from "../../Screens/assests/img1.jpg";
import img2 from "../../Screens/assests/img2.jpg";
import img3 from "../../Screens/assests/img3.jpg";
import img4 from "../../Screens/assests/img4.jpg";
import img5 from "../../Screens/assests/img5.jpg";
import img6 from "../../Screens/assests/img6.jpg";
import img7 from "../../Screens/assests/img7.jpg";
import img8 from "../../Screens/assests/img8.jpg";
import img9 from "../../Screens/assests/img9.jpg";
import img10 from "../../Screens/assests/img10.jpg";

const images=[
    img1,img2,img3,img4,img5,img6,img7,img8,img9,img10
]
export const AllProducts = Array.from({ length: 30 }, (_, index) => ({
  _id: index + 1,
  name: `product${index + 1}`,
  price: Math.floor(Math.random() * 500) + 100,
  rating: Math.floor(Math.random() * 5) + 1, 
  image: images[Math.floor(Math.random() * images.length)],
  desc: `Product ${index + 1}`,
  address:"Gachibowli,Hyd",
  discount: `${Math.floor(Math.random() * 51) + 10}% off`,
  reviews: Array.from(
    { length: Math.floor(Math.random() * 3) + 1 }, 
    (_, reviewIndex) => ({
      name: `User${reviewIndex + 1}`,
      message: "Very Nice",
    })
  ),
}));
