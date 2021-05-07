import React, { useEffect, useState } from "react";
import { FaCode } from "react-icons/fa";
import Axios from "axios";
import { Row, Col, Card, Divider } from "antd";

import GridCard from "./Sections/GridCard";
const Meta = Card;

function LandingPage() {
	const [Date, setDate] = useState("");
	const [Chart, setChart] = useState([]);
	const [CurrentWeek, setCurrentWeek] = useState("");
	const [IsToday, setIsToday] = useState(false);
	const [Today, setToday] = useState("");

	useEffect(() => {
		Axios.get("/api/chart/getChart").then((response) => {
			setChart(response.data.chart);
			setCurrentWeek(response.data.week);
			setToday(response.data.week);
			setIsToday(true);
			console.log(response.data.chart);
		});
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (Date) {
			let variable = { date: Date };
			Axios.post("/api/chart/specificDateChart", variable).then((response) => {
				if (response.data.success) {
					setChart(response.data.chart);
					setCurrentWeek(response.data.week);

					if (response.data.week === Today) {
						setIsToday(true);
					} else {
						setIsToday(false);
					}
				} else {
					alert("failed to get chart");
				}
			});
		}
	};
	const handleDateChange = (e) => {
		setDate(e.target.value);
	};

	return (
		<div>
			<Row style={{ textAlign: "center" }}>
				<Col span={8} offset={8}>
					<h2>{Date ? CurrentWeek : Today} Weekly Chart</h2>
				</Col>
				<Col style={{ verticalAlign: "middle" }} span={8}>
					<form onSubmit={handleSubmit}>
						<input
							type='date'
							name='date'
							value={Date}
							onChange={handleDateChange}
						/>
						<button type='submit'>Submit</button>
					</form>
				</Col>
			</Row>
			<Divider style={{ margin: 0 }} />
			<GridCard isToday={IsToday} chart={Chart} />
		</div>
	);
}
export default LandingPage;
