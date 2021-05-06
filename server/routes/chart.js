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

module.exports = router;
