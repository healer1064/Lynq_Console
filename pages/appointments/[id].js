import Head from "next/head";
import React, { useEffect, useContext, useState } from "react";
import Fade from "react-reveal/Fade";
import { useRouter } from "next/router";

// context
import ProfileContext from "../../context/profile";

// utils
import { fullDate, getTime } from "../../utils/dates";

// components
import PageLoading from "../../components/common/PageLoading";
import Navbar from "../../components/Navbar";
import Leftbar from "../../components/Leftbar";

const AppointmentDetails = () => {
  // router
  const router = useRouter();

  // context
  const { token } = useContext(ProfileContext);

  // id
  const { id } = router.query;

  // state
  const [data, setData] = useState(null);

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
                      <p>Name field not in backend</p>
                    </div>
                    <div className="info__col">
                      <strong>Duration</strong>
                      <p>No field in my fake data</p>
                    </div>
                    <div className="info__col">
                      <strong>Price</strong>
                      <p>${data.display_price || 0}</p>
                    </div>
                    <div className="info__col">
                      <strong>Day</strong>
                      <p>{fullDate(data.starting_date)}</p>
                    </div>

                    <div className="info__col">
                      <strong>Time</strong>
                      <p>{getTime(data.starting_date)}</p>
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
                      <p>lynq.app/xyzxyz (No value in my fake data)</p>
                    </div>

                    <label className="signup-form__terms">
                      <input
                        type="checkbox"
                        //   checked={terms}
                        //   onChange={(e) => {
                        //     setTerms(e.target.checked);
                        //     if (errors.termsError) {
                        //       setErrors({ ...errors, termsError: false });
                        //     }
                        //   }}
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
                    <div
                      style={{
                        background: "#80c904",
                        padding: "6px 25px",
                        color: "white",
                        borderRadius: "8px",
                        cursor: "pointer",
                        zIndex: "100",
                        alignSelf: "flex-start",
                      }}
                    >
                      Send
                    </div>

                    <div
                      style={{ marginTop: "50px" }}
                      className="appointment-request__btns"
                    >
                      <button
                        // onClick={() => handleDelete()}
                        className="reject"
                      >
                        {/* {deleteLoading && <Loading color="#fff" />} */}
                        DELETE
                      </button>
                      <button
                        // onClick={() => handleEdit()}
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
