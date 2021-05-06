const express = require("express");
const router = express.Router();
const { getChart } = require("../billboard-top-100.js");

//=================================
//             Chart
//=================================
router.get("/getChart", (req, res) => {
	function getFormatDate(date) {
		var year = date.getFullYear();
		var month = 1 + date.getMonth();
		month = month >= 10 ? month : "0" + month;
		var day = date.getDate();
		day = day >= 10 ? day : "0" + day;
		return year + "-" + month + "-" + day;
	}
	var date = getFormatDate(new Date());

	getChart("hot-100", date, (err, chart) => {
		if (err) res.status(400).json({ success: false, err });
		else res.status(200).json({ success: true, chart: chart.songs });
	});
});

router.post("/specificDateChart", (req, res) => {
	getChart("hot-100", req.body.date, (err, chart) => {
		if (err) res.status(400).json({ success: false, err });
		else res.status(200).json({ success: true, chart: chart.songs });
	});
});

module.exports = router;
// 날짜 값을 입력받아 입력한 날짜 당시의 차트 렌더링되게.
// 1~10위권은 부각되게? 1~10위 버튼, 11~20위 버튼 ...
//날짜 입력란 고칠것
// a태그로 감싸서 유투브에 `${title}-${artist}`식으로 검색할수있게 만들것
// 가수 || 곡 제목으로 검색해 빌보드 히스토리 보여주기.
