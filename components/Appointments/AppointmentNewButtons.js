// libraries
import Link from "next/link";

// components
import Loading from "../common/Loading";

const AppointmentNewButtons = ({ handleBook, loading }) => {
  return (
    <div className="appointment-new__btns">
      <Link href="/appointments">
        <button className="appointment-new__btns__cancel">Cancel</button>
      </Link>
      <button
        style={{ position: "relative" }}
        className="appointment-new__btns__publish"
        onClick={handleBook}
      >
        {loading && <Loading />} Book
      </button>
    </div>
  );
};

export default AppointmentNewButtons;
