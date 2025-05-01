import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../Components/Testimonial/testimonials.css";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

// import required modules

const Rooms = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded] = useState(false);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [availableRooms, setAvailableRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider({
    breakpoints: {
      "(min-width: 320px)": {
        slides: { perView: 1, spacing: 20 },
      },
      "(min-width: 768px)": {
        slides: { perView: 2, spacing: 20 },
      },
      "(min-width:992px)": {
        slides: { perView: 3, spacing: 20 },
      },
    },
    loop: true,
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      // setLoaded(true);
    },
  });

  const fetchAvailableRooms = async () => {
    if (!checkIn || !checkOut) {
      Swal.fire("Date Required", "Please select both check-in and check-out dates.", "warning");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5003/available-rooms", {
        params: {
          check_in_date: checkIn,
          check_out_date: checkOut,
        },
      });

      setAvailableRooms(response.data);

      localStorage.setItem("room_history", JSON.stringify(response.data));
      localStorage.setItem("refresh_counter", "0");
    } catch (err) {
      console.error("Failed to fetch rooms:", err);
      Swal.fire("Error", "An error occurred while fetching available rooms.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedRooms = localStorage.getItem("room_history");
    const counter = parseInt(localStorage.getItem("refresh_counter") || "0");
  
    if (savedRooms && counter < 3) {
      setAvailableRooms(JSON.parse(savedRooms));
      localStorage.setItem("refresh_counter", (counter + 1).toString());
    } else {
      localStorage.removeItem("room_history");
      localStorage.removeItem("refresh_counter");
    }
  }, []);

  const navigate = useNavigate();

  const handleRoomClick = (room) => {
    navigate("/room_details", {
      state: {
        room,
        selectedInDate: checkIn,
        selectedOutDate: checkOut,
      },
    });
  };

  return (
    <div className="bg-whiteSmoke dark:bg-lightBlack">
      <div className="relative z-[1] ">
        <div
          className="Container-Hero bg-lightBlack dark:bg-normalBlack  grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 items-center justify-center font-Lora py-3 lg:py-4 xl:py-5 2xl:py-6 border-t-[3px] border-t-khaki mt-[-75px]  left-0 right-0 z-[1]"
          data-aos="fade-down"
          data-aos-duration="1000"
        >
          <div className="p-1">
            <p className="text-sm text-lightGray ml-3">Check In</p>
            <div className="flex items-center pt-[2px] ">
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="border-none bg-transparent focus:outline-transparent focus:border-transparent text-white focus:border-none outline-0  text-sm lg:text-base focus:ring-transparent"
                required
              />
            </div>
          </div>
          <div className="p-1">
            <p className="text-sm text-lightGray ml-3">Check Out</p>
            <div className="flex items-center pt-[2px] ">
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="border-none bg-transparent focus:outline-transparent focus:border-transparent text-white focus:border-none outline-0  text-sm lg:text-base focus:ring-transparent"
                required
              />
            </div>
          </div>

          <div className="text-center mt-3 md:mt-0">
            <button 
              onClick={fetchAvailableRooms}
              className="w-[200px] h-10 lg:h-[50px] text-[16px] bg-khaki font-Garamond border border-khaki text-white mx-auto col-span-2  md:col-span-1 lg:col-span-1 relative z-10 before:absolute before:top-0 before:right-0 before:-z-10 before:w-0 before:h-full before:bg-lightBlack before:transition-all before:duration-500 hover:before:w-full hover:before:left-0">
              {loading ? "Loading..." : "Check Available Room"}
            </button>
          </div>
        </div>
      </div>

      {/* Rooms section heading */}
      <div className=" py-20 2xl:py-[120px] w-full bg-[url('/images/home-1/section-shape2.png')] bg-no-repeat bg-top bg-opacity-[0.07]">
        <div className="Container ">
            {availableRooms.length === 0 && !loading && (
            <div className="text-center text-gray-500 font-Lora text-base mt-10">
              <p className="text-lightBlack dark:text-white">
                No data available. Please enter both check-in and check-out dates to check room availability.
              </p>
            </div>
          )}
          {availableRooms.map((room, index) => (
            <div className="relative">
              <div className="mt-14 2xl:mt-[60px] keen-slider " ref={sliderRef}>
                <div className="keen-slider__slide number-slide1" key={index}>
                  <div data-aos="fade-up-left" data-aos-duration="1000">
                    <div className="overflow-x-hidden 3xl:w-[410px] group relative">
                      <div className="font-Garamond">
                        <div className="px-5 3xl:px-6 py-2 inline-flex bg-khaki text-sm  items-center justify-center text-white  absolute top-[10px] right-[10px] font-Lora font-normal leading-[26px]">
                          <span className="">${room.price}</span>
                          <span className="mx-2">|</span>
                          <span>Night</span>
                        </div>

                        <div className=" border-[1px] border-[#e8e8e8] dark:border-[#424242] border-t-0">
                          <div className="py-6 px-[30px]">
                            <h4 className="text-sm leading-[26px] text-khaki uppercase font-semibold">
                              Room #{room.room_number}
                            </h4>
                            <div
                              onClick={() => handleRoomClick(room)}
                              className="cursor-pointer hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-all duration-200"
                            >
                              <h2 
                                className="text-2xl lg:text-[28px] leading-[26px] font-semibold text-lightBlack dark:text-white py-4">
                                {room.type} Rooms
                              </h2>
                            </div>
                            <p className="text-sm font-normal text-gray  dark:text-lightGray font-Lora">
                              {room.status === "available"
                                ? "Available"
                                : room.status === "occupied"
                                ? "Occupied"
                                : "Unavailable"
                              }
                            </p>
                          </div>
                          <div className="  border-t-[1px] border-[#e8e8e8] dark:border-[#424242] py-5">
                            <div className="px-[30px] flex items-center justify-between">
                              <div className="">
                                <span className="font-Lora text-base flex items-center ">
                                  <img
                                    src="/images/home-1/room-bottom-icon.png"
                                    alt=""
                                  />
                                  <span className="ml-[10px] text-gray dark:text-lightGray">
                                    2 King Bed
                                  </span>
                                </span>
                              </div>
                              <span className="w-[1px] h-[25px] bg-[#ddd] dark:bg-gray"></span>
                              <ul className="flex items-center text-khaki space-x-[5px]">
                                <li>
                                  <FaStar />
                                </li>
                                <li>
                                  <FaStar />
                                </li>
                                <li>
                                  <FaStar />
                                </li>
                                <li>
                                  <FaStar />
                                </li>
                                <li>
                                  <FaStar />
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* slider breckpoints */}
              <div className="mx-auto ">
                {loaded && instanceRef.current && (
                  <div className="dots flex items-center justify-center">
                    {[
                      ...Array(
                        instanceRef.current.track.details.slides.length
                      ).keys(),
                    ].map((idx) => {
                      return (
                        <button
                          key={idx}
                          onClick={() => {
                            instanceRef.current?.moveToIdx(idx);
                          }}
                          className={
                            "dot" + (currentSlide === idx ? " active" : "")
                          }
                        ></button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rooms;
