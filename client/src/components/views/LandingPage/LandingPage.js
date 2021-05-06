import React, { useEffect, useState } from "react";
import { FaCode } from "react-icons/fa";
import Axios from "axios";
import { Row, Col, Card, List, Avatar } from "antd";
const Meta = Card;

function LandingPage() {
	const [Date, setDate] = useState("");
	const [Chart, setChart] = useState([]);
	useEffect(() => {
		Axios.get("/api/chart/getChart").then((response) => {
			setChart(response.data.chart);
		});
	}, []);
	const handleSubmit = (e) => {
		e.preventDefault();
		let variable = { date: Date };
		Axios.post("/api/chart/specificDateChart", variable).then((response) => {
			if (response.data.success) {
				setChart(response.data.chart);
			} else {
				alert("failed to get chart");
			}
		});
		setDate("");
	};
	const handleDateChange = (e) => {
		setDate(e.target.value);
	};
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input
					type='date'
					name='date'
					value={Date}
					onChange={handleDateChange}
				/>
				<button type='submit'>Submit</button>
			</form>
			<List
				style={{ marginLeft: "5%" }}
				itemLayout='horizontal'
				dataSource={Chart}
				renderItem={(item) => (
					<List.Item>
						<span style={{ position: "absolute" }}>{item.rank}</span>
						<List.Item.Meta
							style={{ paddingLeft: "40px" }}
							avatar={<Avatar shape='square' size='large' src={item.cover} />}
							title={<span>{item.title}</span>}
							description={item.artist}
						/>
					</List.Item>
				)}
			/>
		</div>
	);
}
export default LandingPage;
