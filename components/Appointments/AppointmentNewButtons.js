// libraries
import Link from "next/link";

const AppointmentNewButtons = () => {
  return (
    <div className="appointment-new__btns">
      <Link href="/appointments">
        <button className="appointment-new__btns__cancel">Cancel</button>
      </Link>
      <button className="appointment-new__btns__publish">PUBLISH</button>
    </div>
  );
};

export default AppointmentNewButtons;
