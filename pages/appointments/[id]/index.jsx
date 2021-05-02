import Head from "next/head";
import { useEffect, useContext, useState } from "react";
import Fade from "react-reveal/Fade";
import { useRouter } from "next/router";
import moment from "moment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// context
import ProfileContext from "../../../context/profile";

// components
import PageLoading from "../../../components/common/PageLoading";
import Loading from "../../../components/common/Loading";
import Modal from "../../../components/common/Modal";

const AppointmentDetails = () => {
  // router
  const router = useRouter();

  // context
  const { token, slugData } = useContext(ProfileContext);

  // id
  const { id } = router.query;

  // states
  const [data, setData] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const fetchAppointment = async () => {
    let config = {
      method: "GET",
      headers: {
        Accept: "application/json",
        ContentType: "application/json",
      },
    };

    const response = await fetch(
      `https://api.lynq.app/account/appointments/${id}?t=${token}`,
      config
    );

    const data = await response.json();

    setData(data);
  };

  const onDelete = () => {
    setDeleteLoading(true);
    async function reject() {
      const response = await fetch(
        `https://api.lynq.app/account/appointments/${data.id}/cancel?t=${token}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      return await response;
    }

    reject()
      .then((res) => {
        setDeleteLoading(false);
        console.log("res reject", res);
        if (res.status === 200) {
          router.push("/appointments");
        } else {
          toast.error("An error has occurred");
          console.log("res reject error", res);
        }
      })
      .catch((err) => {
        setDeleteLoading(false);
        toast.error("An error has occurred");
        console.log(err);
      });
  };

  const toggle = (_data) => {
    setIsOpen(true);
  };

  useEffect(() => {
    if (token && id) {
      fetchAppointment();
    }
  }, [token, id]);

  const getFromTime = (date) => {
    let now = moment();
    let start = moment(date);

    return start.from(now);
  };

  return (
    <>
      <Head>
        <title>Appointment - Lynq</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="content-wrp">
        {!data ? (
          <PageLoading />
        ) : (
          <>
            {isOpen && (
              <Modal
                setModal={setIsOpen}
                onDelete={onDelete}
                loading={deleteLoading}
                data={data}
              />
            )}
            <div className="appointment-new">
              <Fade>
                <div style={{ marginTop: "-30px" }} className="content-wrp">
                  <div className="appointment-request">
                    <a
                      className="appointment-request__back"
                      style={{ cursor: "pointer" }}
                      onClick={() => router.back()}
                    >
                      Back
                    </a>
                    <h2>Appointment</h2>
                    <div className="info__col">
                      <p>{"Received: " + getFromTime(data.create_date)}</p>
                    </div>
                    <div className="info__col">
                      <strong>Event type</strong>
                      <p>{data.activity_name}</p>
                    </div>
                    <div className="info__col">
                      <strong>Duration</strong>
                      <p>{data.session_duration} mins</p>
                    </div>
                    <div className="info__col">
                      <strong>Price</strong>
                      <p>${data.display_price || 0}</p>
                    </div>
                    <div className="info__col">
                      <strong>Day</strong>
                      <p>
                        {moment(data.starting_date).format(
                          "dddd, MMMM DD, YYYY"
                        )}
                      </p>
                    </div>

                    <div className="info__col">
                      <strong>Time</strong>
                      <p>{moment(data.starting_date).format("hh:mm a")}</p>
                    </div>
                    <div style={{ display: "flex" }}>
                      <div
                        style={{ marginRight: "30px" }}
                        className="info__col"
                      >
                        <strong>Client's First Name</strong>
                        <p>{data.first_name}</p>
                      </div>
                      <div className="info__col">
                        <strong>Client's Last Name</strong>
                        <p>{data.last_name}</p>
                      </div>
                    </div>
                    <div className="info__col">
                      <strong>Client's Email</strong>
                      <p>{data.email}</p>
                    </div>
                    <div
                      style={{
                        width: "100%",
                        height: "2px",
                        background: "#7E88F4",
                        margin: "10px 0 20px",
                      }}
                    />
                    <p>
                      Invitation sent at:{" "}
                      <span style={{ color: "#7E88F4", fontWeight: "500" }}>
                        {moment(data.create_date).format(
                          "ddd, DD MMM, yyyy, hh:mm a"
                        )}
                      </span>{" "}
                    </p>
                    <div className="info__col">
                      <strong>Invitation URL</strong>
                      <a
                        style={{ color: "black" }}
                        href={`https://us.lynq.app/${slugData.slug}/${data.id}`}
                        target="_blank"
                      >
                        https://us.lynq.app/{slugData.slug}/{data.id}
                      </a>
                    </div>
                    <div className="appointment-request__btns">
                      <button
                        onClick={toggle}
                        className="cancel"
                        style={{ position: "relative" }}
                      >
                        {deleteLoading && <Loading color="#dd677a" />}
                        Cancel Appointment
                      </button>
                      <button
                        onClick={() =>
                          router.push(`/appointments/edit/${data.id}`)
                        }
                        className="modify"
                      >
                        Modify Appointment
                      </button>
                    </div>
                  </div>
                </div>
              </Fade>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AppointmentDetails;
