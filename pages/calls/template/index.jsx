// libraries
import { useState, useContext, useEffect } from "react";
import Head from "next/head";
import { toast } from "react-toastify";

// context
import ProfileContext from "@/context/profile";

// requests
import { getOneToOneOptionReq } from "@/utils/requests/calls/template";

// components
import Content from "@/components/Calls/Template/Content";
import PageLoading from "@/components/common/PageLoading";

const index = () => {
	// context
	const { token, slugData } = useContext(ProfileContext);

	// states
	const [data, setData] = useState(null);
	const [activePrivateSession, setActivePrivateSession] = useState(false);

	useEffect(() => {
		if (token) {
			getOneToOneOptionReq(token)
				.then((res) => {
					if (res.status == 200) {
						res
							.json()
							.then((data) => setData(data))
							.catch(() => {
								toast.error("Failed to get the options.");
							});
					} else {
						toast.error("Failed to get the options.");
					}
				})
				.catch(() => toast.error("Failed to get the options."));
		}
	}, [token]);

	useEffect(() => {
		if (slugData) {
			setActivePrivateSession(slugData.active_private_session);
		}
	}, [slugData]);

	return (
		<div className="content-wrp">
			<Head>
				<title>Calls Template | Lynq</title>
			</Head>
			{data ? <Content data={data} activePrivateSession={activePrivateSession} /> : <PageLoading />}
		</div>
	);
};

export default index;
