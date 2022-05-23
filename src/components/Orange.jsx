import { wait } from "@testing-library/user-event/dist/utils";
import React from "react";
import linkIcon from '../assets/link-icon.svg'
export default function Orange( {title, dateConversion, setMeetingData, isSetMeetingData} ) {
	// console.log(title)
	// console.log(title.summary)
	// console.log(title.hangoutLink)

	const getData = (newData) => {
		setMeetingData(newData)
		isSetMeetingData(true)
	}

	return (
	<div onClick={() => getData(title)}>
		<div className="card-1">
			<span id="date-box-orange"> TODAY </span>
			<div>
				<h4> {title.summary} </h4>
				<p> {dateConversion(title.start.dateTime)} - {dateConversion(title.end.dateTime)} </p>
			</div>
			<div className="meeting-link">
				<a href={title.hangoutLink}>Join meeting</a>
				<img src={linkIcon} alt="" />
			</div>
	</div>
	<hr id='seperation' /> 	
		</div>
	)
}
