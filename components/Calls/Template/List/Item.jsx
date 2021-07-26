// libraries
import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { Tooltip } from "antd";

// styles
import styles from "./styles.module.sass";

// context
import ProfileContext from "@/context/profile";

// icons
import {
	BsCircleFill,
	BsCircle,
	BsExclamationCircleFill,
} from "react-icons/bs";
import { BiDollar } from "react-icons/bi";

// requests
import { listingPriceReq } from "@/utils/requests/calls/template";

import Descriptions from "./Descriptions";

const Item = ({ data, options, setOptions }) => {
	// context
	const { token } = useContext(ProfileContext);

	// state
	const [price, setPrice] = useState("");
	const [listingPrice, setListingPrice] = useState("");
	const [descriptions, setDescriptions] = useState("");
	const [loading, setLoading] = useState(false);

	// handle click
	const onClick = (_data) => {
		const obj = { ..._data, status: !_data.status, price };
		const arr = options.map((_item) => {
			return _item.id == _data.id ? obj : _item;
		});
		setOptions(arr);
	};

	// handle price change
	useEffect(() => {
		if (price !== "") {
			setLoading(true);
			listingPriceReq(token, price)
				.then((res) => {
					setLoading(false);
					setListingPrice(res.simulated_price);
				})
				.catch(() => {
					setLoading(false);
					toast.error("Failed to fetch listing price!");
				});
		} else {
			setListingPrice("");
		}
	}, [price]);

	useEffect(() => {
		const obj = { ...data, price, description: descriptions };
		const arr = options.map((item) => {
			return item.id == data.id ? obj : item;
		});
		setOptions(arr);
	}, [listingPrice, descriptions]);

	return (
		<div className={styles.item}>
			<div>
				<h6
					onClick={() => onClick(data)}
					className={data.status ? styles.active : ""}
				>
					{data.status ? <BsCircleFill /> : <BsCircle />} {data.length} min
				</h6>
				{data.status && (
					<div className={styles.price}>
						<label onClick={(e) => e.stopPropagation()} htmlFor="price">
							<p>Price</p>
							<span>
								<BiDollar />
								<input
									id="price"
									value={price}
									onChange={(e) => setPrice(e.target.value)}
									type="number"
								/>
							</span>
						</label>
						<label
							className={styles.listing}
							onClick={(e) => e.stopPropagation()}
							htmlFor="listing-price"
						>
							<p>
								Listing Price{" "}
								<Tooltip
									className={styles.tooltip}
									title="The price a customer pays to purchase the service and that
                  includes Lynq's fees."
								>
									<BsExclamationCircleFill />
								</Tooltip>
							</p>
							{price != "" && (
								<span>
									<BiDollar />
									<input id="listing-price" value={listingPrice} disabled />
									{loading && <img src="/img/Rolling-dark.svg" alt="rolling" />}
									{" "}
								</span>
							)}
						</label>
						<Descriptions
							onChange={(list) => {
								console.log(list);
								setDescriptions(list.join('\n'))
							}}
						/>
						{/* <div className={styles.desc_box}>
							<h3>Description</h3>
							<input
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								maxLength="35"
								onClick={(e) => e.stopPropagation()}
								placeholder="Give a short description of the topics you can treat during this time"
							/>
							<span>{description.length}/35</span>
						</div> */}
					</div>
				)}
			</div>
		</div>
	);
};

export default Item;
