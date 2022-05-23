import React from 'react'

export default function Notes({meetData, dateConversion}) {
	console.log(meetData, "THIS IS meetData")
	console.log(meetData.summary)
	return (
	<div className="note-flex">
		<h2>TAKING NOTES FOR</h2>
		<h1>{meetData.summary}</h1>
		<h3>{dateConversion(meetData.start.dateTime)} - {dateConversion(meetData.end.dateTime)}</h3>
		<textarea  cols="100" rows="40" placeholder='Notes for meeting' id='textArea' />
		<button className='save-button'>Save Button</button>
	</div>
	)
}
