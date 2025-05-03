import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BsCalendar4 } from "react-icons/bs";
import { BiUserCircle } from "react-icons/bi";
import Swal from "sweetalert2";

import BreadCrumb from "../../BreadCrumb/BreadCrumb";

const History = () => {
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        setLoading(true);
        const userRes = await axios.get(`${import.meta.env.VITE_API_AUTH}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userData = userRes.data;
        setUser(userData);

        const historyRes = await axios.get(
          `${import.meta.env.VITE_API_BOOKING}/booking/history/${userData.id}`
        );
        setBookings(historyRes.data);
      } catch (error) {
        console.error("Error fetching booking history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const handleCancelBooking = (bookingId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This booking will be cancelled.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#008000", // hijau
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
      background: "#c19d68",
      color: "#fff",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(`${import.meta.env.VITE_API_BOOKING}/booking/cancel/${bookingId}`);
          if (res.status === 200) {
            setBookings((prev) =>
              prev.map((b) =>
                b.id === bookingId ? { ...b, status: "canceled" } : b
              )
            );
            Swal.fire({
              title: "Cancelled!",
              text: "Your booking has been cancelled.",
              icon: "success",
              background: "#c19d68",
              color: "#fff",
              confirmButtonColor: "#008000",
            });
          }
        } catch (err) {
          console.error("Failed to cancel booking:", err);
          Swal.fire({
            title: "Error!",
            text: "Failed to cancel booking.",
            icon: "error",
            background: "#c19d68",
            color: "#fff",
            confirmButtonColor: "#d33",
          });
        }
      }
    });
  };
  

  return (
    <section>
      <BreadCrumb title="Booking History" />
      {/* Check Availability */}
      <div className="bg-whiteSmoke dark:bg-normalBlack py-20 2xl:py-[120px]">
        <div className="Container">
          {/* section title */}
          <div className="text-center px-5">
            <p className="text-base leading-7 md:leading-10 lg:leading-[40px]  text-khaki font-normal font-Lora">
              Booking Records
            </p>
            <h3
              className="text-lightBlack dark:text-white text-2xl sm:text-3xl md:text-4xl lg:text-[40px] 2xl:text-[45px] leading-5 md:leading-7 lg:leading-10  2xl:leading-[45px]
            font-medium font-Garamond"
            >
              Your Booking History
            </h3>
          </div>

          {/* Section content */}
          <div className="mt-14 2xl:mt-[60px]">
            <div className="grid gap-6 3xl:gap-[30px]">
              {loading ? (
                <p className="text-center text-gray dark:text-lightGray mt-10">Loading booking history...</p>
              ) : bookings.length > 0 ? (
                bookings.map((booking) => (
                <div
                  className=" 2xl:flex items-center bg-white dark:bg-lightBlack col-span-6 md:col-span-3 2xl:row-span-2 2xl:col-start-4 2xl:col-end-7 group overflow-hidden 2xl:w-[645px]"
                  data-aos="fade-down"
                  data-aos-duration="1000"
                >
                  <div className="flex flex-col justify-between px-3 sm:px-7 py-5 md:py-[30px] 2xl:py-2 2xl:w-[346px] ">
                    <div className=" flex items-center justify-start ">
                      <div className="flex items-center">
                        <span className="w-7 h-7 md:w-9 md:h-9  grid items-center justify-center">
                          <BiUserCircle size={20} className="text-khaki " />
                        </span>
                        <p className="text-sm md:text-base  leading-[38px] text-gray dark:text-lightGray font-medium font-Lora">
                          {user?.name}
                        </p>
                      </div>
                      <div className="flex items-center ml-3">
                        <span className="w-7 h-7 md:w-9 md:h-9  grid items-center justify-center">
                          <BsCalendar4 size={16} className="text-khaki" />
                        </span>
                        <p className="text-sm md:text-base  leading-[38px] text-gray dark:text-lightGray font-medium font-Lora">
                          {booking.created_at}
                        </p>
                      </div>
                    </div>
                    <h5 className="text-[22px] 2xl:text-3xl mt-3 leading-6  md:leading-7 2xl:leading-[38px] text-lightBlack dark:text-white font-medium font-Garamond hover:text-khaki dark:hover:text-khaki transition-all duration-300">
                      Room Number: {booking.room_number}
                    </h5>
                    <p className="text-sm lg:text-base leading-[26px] text-gray dark:text-lightGray font-normal font-Lora pt-3 pb-5 2xl:pb-[27px]">
                      Room Type: {booking.type}
                    </p>
                    <p className="text-sm lg:text-base leading-[26px] text-gray dark:text-lightGray font-normal font-Lora pt-3 pb-5 2xl:pb-[27px]">
                      Status: {booking.status}
                    </p>
                    <p className="text-sm lg:text-base leading-[26px] text-gray dark:text-lightGray font-normal font-Lora pt-3 pb-5 2xl:pb-[27px]">
                      Check-In: {booking.check_in_date}
                    </p>
                    <p className="text-sm lg:text-base leading-[26px] text-gray dark:text-lightGray font-normal font-Lora pt-3 pb-5 2xl:pb-[27px]">
                      Check-Out: {booking.check_out_date}
                    </p>
                    <Link to={"#"}>
                      <button 
                        className="btn-primary mb-2 sm:h-[42px] 2xl:h-[49px]  lg:before:top-[3.2rem] 2xl:before:top-[3.5rem] "
                        onClick={() => handleCancelBooking(booking.id)}
                        disabled={booking.status !== "pending"}  
                      >
                        CANCEL BOOKING
                      </button>
                    </Link>
                  </div>
                </div>
                ))
              ) : (
                <p className="text-center text-gray dark:text-lightGray mt-10">
                  No booking history found.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default History;
