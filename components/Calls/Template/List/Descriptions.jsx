import React, { useState } from "react";

// styles
import styles from "./styles.module.sass";

const Description = ({ value, placeholder, onChange }) => {
	return (
		<div className={styles.description}>
			<input
				value={value}
				maxLength="35"
				placeholder={placeholder}
				onChange={onChange}
			/>
			<span>{value.length}/35</span>
		</div>
	);
};

const Descriptions = ({ onChange }) => {
	const [descriptions, setDescriptions] = useState([""]);

	return (
		<div>
			<div className={styles.desc_box}>
				<h3>Description</h3>
				{descriptions.map((v, i) => (
					<Description
						key={i}
						value={v}
						placeholder={`Bullet point ${i+1}`}
						onChange={(e) => {
							const value = e.currentTarget.value;
							setDescriptions((old) => {
								old[i] = value;
								const array = [...old];
								onChange?.(array);
								return array;
							});
						}}
					/>
				))}
			</div>
			<button
				className={styles.addButton}
				onClick={() => {
					setDescriptions((old) => {
						if (old.length < 5) {
							return [...old, ""];
						}
						return old;
					});
				}}
			>
				+
			</button>
		</div>
	);
};

export default React.memo(Descriptions);
