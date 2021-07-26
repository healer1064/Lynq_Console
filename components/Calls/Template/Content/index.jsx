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
import { IoTrainOutline } from "react-icons/io5";
import { useCallback } from "react";

const index = ({ data }) => {
	// context
	const { token, slugData } = useContext(ProfileContext);
	const {
		active_message = false,
		active_private_session = false,
		active_masterclass = false,
	} = useMemo(() => slugData ?? {}, [slugData]);

	// states
	const [active, setActive] = useState(
		active_message && active_private_session && active_masterclass
	);
	const [options, setOptions] = useState([
		{ length: 15, status: false, tags: [] },
		{ length: 30, status: false, tags: [] },
		{ length: 60, status: false, tags: [] },
	]);
	useEffect(async () => {
		if (token) {
			const res = await fetch(
				`https://api.lynq.app/account/event-type?t=${token}`
			);
			const bulletpoints = await res.json();
			console.log(bulletpoints);
			setOptions(
				Object.values({
					15: { duration: 15, status: false, tags: [] },
					30: { duration: 30, status: false, tags: [] },
					60: { duration: 60, status: false, tags: [] },
					...bulletpoints.reduce((acc, c) => {
						acc[c.duration] = c;
						c["status"] = true;
						return acc;
					}, {}),
				})
			);
		}
	}, []);

	useEffect(() => {
		console.log(options);
	}, [options]);
	const [loading, setLoading] = useState(false);

	/* useEffect(() => {
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
	}, [data]); */

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

		setActive(checked);
		setOptions((old) => [...old.map((d) => ((d.status = checked), d))]);
		toast.success(checked ? "Activated" : "Disactivated");
		/* if (options.filter((item) => item.status == true).length > 0) {
		} else {
			toast.info("Please set an option first.");
		} */
	}

	// handle click
	const handleClick = useCallback(() => {
		if (options.filter((item) => item.status == true).length === 0) {
			toast.info("Please select an option first.");
		} else {
			setLoading(true);
			const toBeExecuted = options.filter((d) => d.price && d.price != "");

			const toBeDeleted = toBeExecuted.filter(
				(d) => d.id && d.status === false
			);
			const toBeUpdated = toBeExecuted.filter((d) => d.id && d.status === true);
			const toBeRecreated = toBeExecuted.filter(
				(d) => !d.id && d.status === true
			);

			toBeDeleted.forEach(async (d) => {
				await fetch(
					`https://api.lynq.app/account/event-type/${d.id}?t=${token}`,
					{
						method: "DELETE",
						headers: {
							Accept: "application/json",
							"Content-Type": "application/json",
						},
					}
				);
			});

			toBeUpdated.forEach(async (d) => {
				await fetch(
					`https://api.lynq.app/account/event-type/${d.id}?t=${token}`,
					{
						method: "PUT",
						headers: {
							Accept: "application/json",
							"Content-Type": "application/json",
						},
						body: JSON.stringify(d),
					}
				);
				toast.success("Updated succesfully");
				toBeRecreated.length === 0 && setLoading(false);
			});

			toBeRecreated.forEach((d) => {
				const data = {
					id: uuidv4(),
					name: "string",
					teacherId: "string",
					description: d.description,
					tags: d.tags,
					duration: d.duration,
					price: d.price,
					cancellation_policy: "string",
					material_needed: "string",
				};

				postOneToOneOptionReq(token, data)
					.then((res) => {
						d.id = data.id;
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
			});

			!toBeExecuted.length && toast.info("Please fill all fields.");
		}
	}, [token, options]);

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
