import React, { useCallback, useState } from "react";
import axios from "axios";
import Loading from "@/components/common/Loading";

const Bar = ({ children, progress, onClick }) => {
	return (
		<div
			style={{
				// position: "absolute",
				top: 0,
				left: 0,
				width: `${progress}%`,
				minWidth: "64px",
				maxWidth: "100%",
				height: "100%",
				backgroundColor: "#7e88f4",
				boxShadow: "0px 3px 6px 0px #a5adff",
				transition: " width .3s",
				borderRadius: "2px",
			}}
			onClick={onClick}
		>
			{children}
		</div>
	);
};

const UploadButton = ({ file, id, token, onUpload }) => {
	const [progress, setProgtress] = useState(0);
	const [loading, setLoading] = useState(false);

	const upload = useCallback(async () => {
		setLoading(true);
		console.log(file);
		const formData = new FormData();
		formData.append("image", file);

		// console.log(`https://api.lynq.app/async/${id}/upload?t=${token}`);

		axios
			.post(`https://api.lynq.app/async/${id}/upload?t=${token}`, formData, {
				headers: { "Content-Type": "multipart/form-data" },
				onUploadProgress: (progressEvent) => {
					setProgtress(
						parseInt(
							Math.round((progressEvent.loaded * 100) / progressEvent.total)
						)
					);
				},
			})
			.then((res) => {
				onUpload(res.data);
			})
			.catch((err) => {
				if (err.response) {
					//do something
					console.log(err.response);
				} else if (err.request) {
					//do something else
					console.log(err.request);
				} else if (err.message) {
					//do something other than the other two
					console.log(err.message);
				}
			});
	}, [id, token, file]);

	const height = 36;

	return (
		<>
			<button
				onClick={() => {
					if (file) {
						upload();
					} else {
						toast.info("Please select a document file first.");
					}
				}}
			>
				{loading ? <Loading /> : "Send"}
			</button>
			<div
				style={{
					position: "relative",
					width: "100%",
					height: height + "px",
				}}
			>
				<Bar progress={progress}></Bar>
			</div>
		</>
	);
};

export default React.memo(UploadButton);
