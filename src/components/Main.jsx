import React, { useEffect, useState } from 'react'
import calIcon from '../assets/calendar-icon.svg'
import linkIcon from '../assets/link-icon.svg'
import { useLocation } from 'react-router-dom'
import { gapi } from 'gapi-script';
import Orange from './Orange'
import Blue from './Blue'
import { wait } from '@testing-library/user-event/dist/utils';
import Notes from './Notes' 
const clientId = '636637600467-ti55hrk8lm8ehqbnk59q03mikbi3dg6i.apps.googleusercontent.com'
const API_KEY = "AIzaSyCGEmajONx4p3uSr1WQtMsEzwt45APVPWg"
const DISCOVERY_DOC = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest']
const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly'
export default function Main() {

	var gapi = window.gapi

	const [data, setData] = useState([])
	const [isDataFetched, setIsDataFetched ] =  useState(false)
	const [noTasks, setNoTasks] = useState(false)	
	const [defaultData, setDefaultData] = useState([{}])
	useEffect(() => {
		gapi.load('client:auth2', () => {
			gapi.client.init({
				apiKey: API_KEY,
				clientId: clientId,
				discoverDocs: DISCOVERY_DOC,
				scope: SCOPES
			})
			gapi.client.load('calendar', 'v3', () => listUpcomingEvents())
			
		})	
	

	}, [])

	// useEffect(() => {
	// 	const timer = setTimeout(() => {
	// 		listUpcomingEvents()
	// 	}, 2000);
	// 	return () => clearTimeout(timer)
	// }, []);
	console.log(data)
	console.log(defaultData, 'THIS IS DEFAULT DATA')

	async function listUpcomingEvents(){
		let response;
		let timeMax = new Date()
		timeMax.setUTCHours(23,59,59,999)
		try{
			const request = {
				'calendarId' : 'primary',
				'timeMin': (new Date()).toISOString(),
				'timeMax' : timeMax.toISOString(),
				'showDeleted': false,
				'singleEvents': true,
				'maxResults': 10,
				'orderBy' : 'startTime',
			};
			response = await gapi.client.calendar.events.list(request)
		} catch (err) {
			console.log(err)
			return
		}
		const events = response.result.items;
		if(!events || events.length == 0) {
			console.log('no events found')
			//output = 'no events found'
			setNoTasks(true)
		return;
		}
		//output = events;
		setData(events)
		setDefaultData(events[0])
		setIsDataFetched(true)
		//console.log(events)
	}

	console.log(defaultData,'THIS IS DEFAULT DATA')

	async function newListUpcomingEvents(timeMin, timeMax){
		let response;
		console.log('minimum time : ', timeMin.toISOString())
		console.log('maximum time : ', timeMax.toISOString())
		try{
			const request = {
				'calendarId' : 'primary',
				'timeMin': timeMin.toISOString(),
				'timeMax': timeMax.toISOString(),
				'showDeleted': false,
				'singleEvents': true,
				'maxResults': 10,
				'orderBy' : 'startTime',
			};
			response = await gapi.client.calendar.events.list(request)
		} catch (err) {
			setNoTasks(false)
			return
		}
		const events = response.result.items;
		if(!events || events.length == 0) {
			console.log('no events found')
			setNoTasks(true)
			console.log()
			//output = 'no events found'
		return;
		}
		//output = events;
		setData(events)
		setIsDataFetched(true)
		setNoTasks(false)
		//console.log(events)
	}

	console.log(noTasks)

	 const dateFunction = (e) => {
		let timeMin = new Date(e.target.value)
		timeMin.setUTCHours(0,0,0,0)
		let timeMax = new Date(e.target.value)
		timeMax.setUTCHours(23,59,59,59)
		 console.log('start =>', timeMin)
		 console.log('end =>', timeMax)
	 	// gapi.client.load('calendar', 'v3', newListUpcomingEvents(timeMin, timeMax))
		calendarRequest(timeMin,timeMax)
	 }

	
		// 		{ isDataFetched && data.map((data, index) => 
		// 			<Orange title={data} />
		// 		)}
		// 		<hr id='seperation' />
		// { isDataFetched && <Blue data={data} />}
		// 		<hr id='seperation' />

	const calendarRequest = (timeMin, timeMax) => {
		gapi.load('client:auth2', () => {
			gapi.client.init({
				apiKey: API_KEY,
				clientId: clientId,
				discoverDocs: DISCOVERY_DOC,
				scope: SCOPES
			})
			gapi.client.load('calendar', 'v3', () => newListUpcomingEvents(timeMin,timeMax))
			
		})	
	}


				// <div className='note-flex'>
				// 	<h2>TAKING NOTES FOR</h2>
				// 	<h1>Aviatio Related Meeting</h1>
				// 	<h3>10:30PM - 11:00PM</h3>
				// 	<textarea rows='40' cols='100' placeholder='Notes for meeting' id='textArea'  />
				// 	<button className='save-button'>Save button</button>
				// </div>

	let output;
	// const location = useLocation();
	// if (location.state.output === undefined) {
	// 	console.log('no tasks found')
	// } else {
	// 	console.log(location.state.output.start.dateTime)
	// 	output = location.state.output
	// }

	const dateConversion = (date) => {
		let newDate = new Date(date)
		return newDate.toLocaleTimeString('en-us', {hour: '2-digit', minute: '2-digit'})
	}




			// { isMeetingData ? <Notes />
			// { isMeetingData ? console.log('meeting data found') : console.log('meeting data not set yet')}

	const [meetingData, setMeetingData] = useState([])
	const [isMeetingData, isSetMeetingData] = useState(false)	

	if (isDataFetched) {

	}

	const tempData = {
		summary: 'Dummy Title',
		start: {
			dateTime: '2022-05-19T11:30:00+05:30',
		},
		end: {
			dateTime: '2022-05-19T12:30:00+05:30',
		}
	}

	console.log(data)
	console.log(tempData.summary)

	return(
		<div className="main">
			<div className="meetings">
				<div className="input-search">
					<input type="text" placeholder='Aviato. Better Notes' />
					<div> 
					<input type="date" onChange={e => dateFunction(e)}/>
					</div>
				</div>
				<hr id='seperation' />
				{ /*data.length && <Orange title={data} /> */}
	
				{
					!noTasks ? isDataFetched && data.map((data, index) => 
						{	//console.log((new Date(data.start.dateTime)).getDate())
							//console.log((new Date()).getDate())
							if( noTasks ) {
								data = [1]
								console.log('no tasks')
							}
							else if((new Date(data.start.dateTime).getDate()) !== (new Date()).getDate()) {
								return( 
									<Blue data={data} setMeetingData={setMeetingData} isSetMeetingData={isSetMeetingData} dateConversion={dateConversion}/> 
								)
						} 
							else if ((new Date(data.start.dateTime).getDate()) === (new Date()).getDate()) {
								return ( <Orange title={data} setMeetingData={setMeetingData} isSetMeetingData={isSetMeetingData} dateConversion={dateConversion}  />)
							}
							else {
								console.log('there are few tasks')
							}
						}
					)
				: <h4>No tasks found </h4>}	
		

			</div>
			<div className="notes">
			{ isDataFetched && isMeetingData  ?  <Notes meetData={meetingData} dateConversion={dateConversion}/> : isDataFetched && <Notes meetData={defaultData} dateConversion={dateConversion}/> }
			</div>
			<hr id="half" />
			
		</div>
	)
}
