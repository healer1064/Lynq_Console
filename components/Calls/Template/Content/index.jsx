// libraries
import { useState, useEffect, useContext, useMemo } from "react";
import { Switch } from "antd";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

// styles
import styles from "./styles.module.sass";

// context
import ProfileContext from "@/context/profile";

// requests
import {
	postOneToOneOptionReq,
	putOneToOneOptionReq,
} from "@/utils/requests/calls/template";

// components
import List from "../List";
import Loading from "@/components/common/Loading";

import { postProfileReq } from "@/utils/requests/public-profile";

const index = ({ data }) => {
	// context
	const { token, slugData } = useContext(ProfileContext);
	const { active_message, active_private_session, active_masterclass } =
		useMemo(() => slugData, [slugData]);

	// states
	const [active, setActive] = useState(
		active_message && active_private_session && active_masterclass
	);
	const [options, setOptions] = useState([
		{ id: 1, length: 15, status: false },
		{ id: 2, length: 30, status: false },
		{ id: 3, length: 60, status: false },
	]);
	const [loading, setLoading] = useState(false);

	console.log(options);
	console.log(slugData);

	useEffect(() => {
		if (data.length > 0) {
			data.forEach((item) => {
				if (item.duration == 15) {
					const arr = options;
					arr[0] = { ...item, status: item.isActive, length: item.duration };
					setOptions(arr);
				}
				if (item.duration == 30) {
					const arr = options;
					arr[1] = { ...item, status: true, length: item.duration };
					setOptions(arr);
				}
				if (item.duration == 60) {
					const arr = options;
					arr[2] = { ...item, status: true, length: item.duration };
					setOptions(arr);
				}
			});
		}
	}, [data]);

	// useEffect(() => {
	// 	options.filter((item) => item.status == true).length > 0
	// 		? setActive(true)
	// 		: setActive(false);
	// }, [options]);

	// on switch change
	async function onChange(checked) {
		const fetchOptions = {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-type": "application/json",
			},
		};
		const message = await fetch(
			`https://api.lynq.app/account/public-profile/toggle-feature/message?t=${token}`,
			fetchOptions
		);
		slugData.active_message = (await message.json()).active_message;

		const privateSession = await fetch(
			`https://api.lynq.app/account/public-profile/toggle-feature/private-session?t=${token}`,
			fetchOptions
		);
		slugData.active_private_session = (
			await privateSession.json()
		).active_private_session;

		const masterclass = await fetch(
			`https://api.lynq.app/account/public-profile/toggle-feature/masterclass?t=${token}`,
			fetchOptions
		);
		slugData.active_masterclass = (await masterclass.json()).active_masterclass;

		setActive(checked);
		setOptions((old) => [...old.map((d) => ((d.status = checked), d))]);
		toast.success(checked ? "Activated" : "Disactivated");
		/* if (options.filter((item) => item.status == true).length > 0) {
		} else {
			toast.info("Please set an option first.");
		} */
	}

	// handle click
	const handleClick = () => {
		if (options.filter((item) => item.status == true).length === 0) {
			toast.info("Please select an option first.");
		} else {
			var check = false;
			options
				.filter((item) => item.status == true)
				.forEach((element) => {
					if (
						element.price &&
						element.price != "" &&
						element.description != ""
					) {
						check = true;
					} else {
						check = false;
					}
				});
			if (check) {
				options.forEach((item) => {
					setLoading(true);
					// if (data.filter((d) => d.id == item.id).length > 0) {
					//   putOneToOneOptionReq(token, item.id, {
					//     id: item.id,
					//     name: item.name,
					//     teacherId: item.teacherId,
					//     description: item.description,
					//     duration: item.duration,
					//     price: item.price,
					//     isActive: item.status,
					//     cancellation_policy: item.cancellation_policy,
					//     material_needed: item.material_needed,
					//   })
					//     .then((res) => {
					//       setLoading(false);
					//       if (res.status == 200) {
					//         toast.success("All put good");
					//       } else {
					//         toast.error("Failed to save template options.");
					//       }
					//     })
					//     .catch(() => {
					//       setLoading(false);
					//       toast.error("Failed to save template options.");
					//     });
					// } else {
					if (item.status) {
						postOneToOneOptionReq(token, {
							id: uuidv4(),
							name: "string",
							teacherId: "string",
							description: item.description,
							duration: item.length,
							price: item.price,
							cancellation_policy: "string",
							material_needed: "string",
						})
							.then((res) => {
								setLoading(false);
								if (res.status == 200) {
									toast.success("All good");
								} else {
									toast.error("Failed to save template options.");
								}
							})
							.catch(() => {
								setLoading(false);
								toast.error("Failed to save template options.");
							});
					}
					// }
				});
			} else {
				toast.info("Please fill all fields.");
			}
		}
	};

	return (
		<div className={styles.content}>
			<div className={styles.switch_wrap}>
				<Switch
					checked={active}
					onChange={onChange}
					className={active ? styles.switch_on : styles.switch_off}
				/>
				<span>{active ? "Activate" : "Deactivate"}</span>
			</div>
			<p>Select the options to show on your public profile</p>
			<h3>Length</h3>
			<List options={options} setOptions={setOptions} />
			<button onClick={handleClick} className={styles.btn}>
				{loading ? <Loading /> : "Save"}
			</button>
		</div>
	);
};

export default index;
