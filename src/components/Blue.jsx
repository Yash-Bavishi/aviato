import React from "react";

export default function Blue({data, dateConversion, setMeetingData, isSetMeetingData}) {
	let date = data.start.dateTime
	let finalDate = (new Date(date)).getDate()
//	console.log(finalDate)
	const getData = (newData) => {
		setMeetingData(newData)
		isSetMeetingData(true)
	}


	return(
		<div onClick={() => getData(data)}>
		<div className="card-2">
			<span id="date-box-blue"> { finalDate }</span>
			<div>
				<h4> {data.summary} </h4>
				<p> {dateConversion(data.start.dateTime)} - {dateConversion(data.end.dateTime)}</p>
			</div>
			<div className="note-link">
				View Note ->
			</div>
		</div>
		<hr id='seperation' />
		</div>
	)
}
