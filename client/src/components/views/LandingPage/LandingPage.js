import React, { useEffect, useState } from "react";
import { FaCode } from "react-icons/fa";
import Axios from "axios";
import { Row, Col, Card, List, Avatar } from "antd";
const Meta = Card;

function LandingPage() {
	const [Chart, setChart] = useState([]);
	useEffect(() => {
		Axios.get("/api/chart/getChart").then((response) => {
			setChart(response.data.chart);
		});
	}, []);

	return (
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
	);
}
export default LandingPage;
