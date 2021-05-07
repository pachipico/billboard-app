const express = require("express");
const router = express.Router();
const { getChart } = require("../billboard-top-100.js");

//=================================
//             Chart
//=================================
router.get("/getChart", (req, res) => {
	let today = "";

	function getToday() {
		var date = new Date();
		var year = date.getFullYear();
		var month = ("0" + (1 + date.getMonth())).slice(-2);
		var day = ("0" + date.getDate()).slice(-2);

		today = year + "-" + month + "-" + day;
		return today;
	}

	getToday();
	console.log(today);
	getChart("hot-100", today, (err, chart) => {
		if (err) res.status(400).json({ success: false, err });
		else
			res.status(200).json({ success: true, chart: chart.songs, week: today });
	});
});

router.post("/specificDateChart", (req, res) => {
	getChart("hot-100", req.body.date, (err, chart) => {
		if (err) res.status(400).json({ success: false, err });
		else
			res
				.status(200)
				.json({ success: true, chart: chart.songs, week: req.body.date });
	});
});

module.exports = router;

// 1~10위권은 부각되게? 1~10위 버튼, 11~20위 버튼 ...

// 가수 || 곡 제목으로 검색해 빌보드 히스토리 보여주기.
// ??
