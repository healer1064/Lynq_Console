import Head from "next/head";
import { useEffect, useContext, useState } from "react";
import Fade from "react-reveal/Fade";
import { useRouter } from "next/router";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// context
import ProfileContext from "../../context/profile";

// components
import PageLoading from "../../components/common/PageLoading";
import Navbar from "../../components/Navbar";
import Leftbar from "../../components/Leftbar";
import Loading from "../../components/common/Loading";

const AppointmentDetails = () => {
  // router
  const router = useRouter();

  // context
  const { token, slugData } = useContext(ProfileContext);

  // id
  const { id } = router.query;

  // states
  const [data, setData] = useState(null);
  const [message, setMessage] = useState(false);
  const [checkbox, setCheckbox] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

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

  const sendEmail = () => {
    setLoading(true);
    async function send() {
      const response = await fetch(
        `https://api.lynq.app/account/appointments/${id}/_email?t=${token}`,
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

    send().then((res) => {
      console.log("res", res);
      setLoading(false);
      if (res.status === 200) {
        setMessage(true);
      } else {
        console.log(res);
        toast.error(res.message);
      }
    });
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

  useEffect(() => {
    if (token && id) {
      fetchAppointment();
    }
  }, [token, id]);

  console.log(data);

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
      <Navbar active="appointments" />
      <ToastContainer />
      <div className="page-wrp">
        <Leftbar active="appointments" />
        <div className="content-wrp">
          {!data ? (
            <PageLoading />
          ) : (
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
                    {message ? (
                      <div>
                        <p
                          style={{
                            fontStyle: "italic",
                            color: "#7E88F4",
                            marginBottom: "5px",
                            fontSize: "13px",
                          }}
                        >
                          The invitation was sent:{" "}
                          {moment().format("dddd, DD MMMM - hh:mm a")}
                        </p>
                        <p
                          style={{
                            fontStyle: "italic",
                            fontSize: "13px",
                            marginTop: "0px",
                          }}
                        >
                          Payment Status: {data.status.replace("_", " ")}
                        </p>
                      </div>
                    ) : (
                      <>
                        <label className="signup-form__terms">
                          <input
                            type="checkbox"
                            checked={checkbox}
                            onChange={(e) => {
                              setCheckbox(e.target.checked);
                            }}
                          />
                          <div className="checkmark"></div>
                          <span>
                            <strong
                              style={{ fontWeight: "bold" }}
                              Send
                              the
                              invitation
                              to
                              your
                              client
                            >
                              Send the invitation to your client
                            </strong>
                          </span>
                        </label>
                        {checkbox && (
                          <button
                            style={{ position: "relative" }}
                            className="send-invite-btn"
                            onClick={sendEmail}
                          >
                            {loading && <Loading />}
                            Send
                          </button>
                        )}
                      </>
                    )}
                    <div className="appointment-request__btns">
                      <button
                        onClick={onDelete}
                        className="reject"
                        style={{ position: "relative" }}
                      >
                        {deleteLoading && <Loading color="#fff" />}
                        DELETE
                      </button>
                      <button
                        onClick={() =>
                          router.push(`/appointments/edit/${data.id}`)
                        }
                        className="accept"
                      >
                        {/* {editLoading && <Loading />} */}
                        EDIT
                      </button>
                    </div>
                  </div>
                </div>
              </Fade>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AppointmentDetails;
