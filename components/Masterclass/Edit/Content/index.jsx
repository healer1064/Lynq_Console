// libraries
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

// styles
import styles from "./styles.module.sass";

// context
import ProfileContext from "@/context/profile";

// icons
import { BsChevronLeft } from "react-icons/bs";

// requests
import { getMasterclass, putMasterclass } from "@/utils/requests/masterclass";

// components
import Form from "../Form";
import PageLoading from "@/components/common/PageLoading";

const index = () => {
  // context
  const { token } = useContext(ProfileContext);

  // states
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  // router
  const router = useRouter();

  // params
  const { id } = router.query;

  useEffect(() => {
    if (token && id) {
      getMasterclass(token)
        .then((res) => {
          if (res.error) {
            toast.error("Failed to get masterclasses.");
          } else {
            setData(res.find((item) => id == item.id));
          }
        })
        .catch(() => toast.error("Failed to get masterclass."));
    }
  }, [token, id]);

  // handle submit
  const handleSubmit = (_reqData) => {
    setLoading(true);
    putMasterclass(token, id, _reqData)
      .then((res) => {
        setLoading(false);
        console.log(res);
        if (res.status !== 200) {
          toast.error("Failed to edit the masterclass");
        } else {
          router.push("/masterclass");
        }
      })
      .catch(() => {
        setLoading(false);
        toast.error("Failed to edit the masterclass.");
      });
  };

  return data ? (
    <div className={styles.content}>
      <a className={styles.back} onClick={() => router.back()}>
        <BsChevronLeft /> Back
      </a>
      <h2>New Masterclass</h2>
      <Form data={data} handleSubmit={handleSubmit} buttonLoading={loading} />
    </div>
  ) : (
    <PageLoading />
  );
};

export default index;
