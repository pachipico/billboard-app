import React, { useState } from "react";
import { Divider, Card, List, Avatar } from "antd";
import {
	UpCircleOutlined,
	DownCircleOutlined,
	YoutubeFilled,
} from "@ant-design/icons";
const { Meta } = Card;

function GridCard(props) {
	const topRanked = [];
	const rest = [];
	props.chart.map((song) => {
		if (song.rank <= 10) {
			topRanked.push(song);
		} else {
			rest.push(song);
		}
	});
	const positionChanges = (currentPosition, previousPosition) => {
		let current = Number(currentPosition);
		let previous = Number(previousPosition);
		if (props.isToday) {
			if (currentPosition < previousPosition) {
				return (
					<div style={{ width: "3%" }}>
						<UpCircleOutlined
							style={{
								fontSize: "1.5rem",
								color: "green",
							}}
						/>
					</div>
				);
			}
			if (currentPosition > previousPosition) {
				return (
					<div style={{ width: "3%" }}>
						<DownCircleOutlined
							style={{
								fontSize: "1.5rem",
								color: "red",
							}}
						/>
					</div>
				);
			} else {
				return <div style={{ width: "3%" }}></div>;
			}
		} else {
			return <div style={{ width: "3%" }}></div>;
		}
	};
	const renderList = props.chart.map((song) => {
		if (song.rank <= 10) {
			return (
				<>
					<List.Item>
						<div style={{ position: "absolute", marginLeft: "20px" }}>
							{song.rank}
						</div>
						<List.Item.Meta
							style={{ paddingLeft: "60px" }}
							avatar={<Avatar shape='square' size='large' src={song.cover} />}
							title={
								<p style={{ textDecoration: "none" }} target='_blank'>
									{song.title}
								</p>
							}
							description={song.artist}
						/>
						<List.Item.Meta title='lyrics' />
						<List.Item.Meta
							style={{
								textAlign: "right",
								paddingRight: "10px",
							}}
							description={
								<a
									href={`https://www.youtube.com/results?search_query=${song.title}&${song.artist}`}
									target='_blank'
								>
									Search on{" "}
									<span
										style={{
											color: "red",
											fontWeight: "bold",
										}}
									>
										YouTube
										<YoutubeFilled style={{ marginLeft: "3px" }} />
									</span>
								</a>
							}
						/>
						<div style={{ textAlign: "right", padding: "10px" }}>
							<p style={{ margin: " 10px" }}>
								Peak: {song.position.peakPosition}
							</p>
							<p style={{ margin: " 10px" }}>
								Weeks on Chart: {song.position.weeksOnChart}
							</p>
						</div>

						{positionChanges(song.rank, song.position.positionLastWeek)}
					</List.Item>
					<Divider style={{ margin: "0" }} />
				</>
			);
		} else {
			return (
				<>
					<List.Item>
						<div style={{ position: "absolute", marginLeft: "20px" }}>
							{song.rank}
						</div>
						<List.Item.Meta
							style={{ paddingLeft: "60px" }}
							avatar={<Avatar shape='square' size='large' src={song.cover} />}
							title={
								<a
									style={{ textDecoration: "none" }}
									href={`https://www.youtube.com/results?search_query=${song.title}&${song.artist}`}
									target='_blank'
								>
									{song.title}
								</a>
							}
							description={song.artist}
						/>
						<span style={{ textAlign: "right", paddingRight: "10px" }}>
							<p style={{ margin: " 10px" }}>
								Peak: {song.position.peakPosition}
							</p>
							<p style={{ margin: " 10px" }}>
								Weeks on Chart: {song.position.weeksOnChart}
							</p>
						</span>

						{positionChanges(song.rank, song.position.positionLastWeek)}
					</List.Item>
					<Divider style={{ margin: "0" }} />
				</>
			);
		}
	});

	return renderList;
	// <List
	// 	style={{ marginLeft: "3%" }}
	// 	itemLayout='horizontal'
	// 	dataSource={topRanked}
	// 	renderItem={(item) => {
	// 		return (
	// 			<List.Item>
	// 				<span style={{ position: "absolute" }}>{item.rank}</span>
	// 				<List.Item.Meta
	// 					style={{ paddingLeft: "40px" }}
	// 					avatar={<Avatar shape='square' size='large' src={item.cover} />}
	// 					title={<span>{item.title}</span>}
	// 					description={item.artist}
	// 				/>
	// 			</List.Item>
	// 		);
	// 	}}
	// />
}

export default GridCard;
