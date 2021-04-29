// libraries
import Link from "next/link";

const NewAppointmentButton = ({ isLeft }) => {
  return (
    <Link href="/appointments/new">
      {/* <div className="appointments-top__btn">
        <img src="/img/appointments-btn-plus.svg" alt="" />
        <span>New Appointment</span>
      </div> */}
      <div
        className={`appointments-top__newApp ${isLeft ? "toLeft" : "toRight"}`}
      >
        <img src="/img/appointments-btn-plus.svg" alt="" />
        <span>New Appointment</span>
      </div>
    </Link>
  );
};

export default NewAppointmentButton;
