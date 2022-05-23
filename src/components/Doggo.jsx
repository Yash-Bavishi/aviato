import React from 'react'
import happy from '../assets/happy.png'
import favortie from '../assets/favorite.png'
import momos from '../assets/momos.png'
import bday from '../assets/bday.png'
import enough from '../assets/enough.png'
import logo from '../assets/aviato.svg'
import calendar from '../assets/google-calendar.png'
import { useState, useEffect } from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import { gapi } from 'gapi-script'
import { Link } from 'react-router-dom'
const clientId = '636637600467-ti55hrk8lm8ehqbnk59q03mikbi3dg6i.apps.googleusercontent.com'
const API_KEY = "AIzaSyCGEmajONx4p3uSr1WQtMsEzwt45APVPWg"
const DISCOVERY_DOC = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest']
const SCOPES = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'
const NEW_SCOPE = 'https://www.googleapis.com/auth/calendar.readonly'

export default function Doggo() {


	var gapi = window.gapi
	let output;
	const handleCLick = () => {
		gapi.load('client:auth2', () => {
			console.log('loaded client')
			gapi.client.init({
				apiKey: API_KEY,
				clientId: clientId,
				discoveryDocs: DISCOVERY_DOC,
				scope: NEW_SCOPE
			})
			gapi.client.load('calendar', 'v3', () => console.log('loaded console'))
		})
	}

	useEffect(() => {
		gapi.load('client:auth2', () => {
			console.log('loaded client')
			gapi.client.init({
				apiKey: API_KEY,
				clientId: clientId,
				discoveryDocs: DISCOVERY_DOC,
				scope: NEW_SCOPE
			})
			gapi.client.load('calendar', 'v3', () => console.log('loaded console'))
		})
	})

	async function listUpcomingEvents() {
        let response;
        try {
          const request = {
            'calendarId': 'primary',
            'timeMin': (new Date()).toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': 10,
            'orderBy': 'startTime',
          };
          response = await gapi.client.calendar.events.list(request);
        } catch (err) {
			console.log('error')
			gapi.auth2.getAuthInstance().signIn()
          return;
        }

        const events = response.result.items;
        if (!events || events.length == 0) {
			console.log('no evets founds')
			output = 'No events found'
          return;
        }
        // Flatten to string to display
        output = events
		console.log(output)
      }

	const doggos = [happy, favortie, momos, bday, enough]
	const doggoArray = [
	 	{
	 		background: happy,
	 		p: "Hope your day is as good as his"
	 	},
	
	 	{
	 		background: favortie,
	 		p: "He is just happy to see you :)"
	 	},
	 	{
	 		background: momos,
	 		p: "He forgot to take MoMs today :("
	 	},
	 	{
	 		background: bday,
	 		p: "It’s his B’day."
	 	},
	 	{
	 		background: enough,
	 		p: "That’s Enough"
	 	},
	 ]

	let [dog, setDog ] = useState(doggoArray[0])
	let check;
	const [count, setCount ] = useState(1)
	const changeDog = () => {
	if(count < doggoArray.length){
	 	console.log(count)
	  	console.log('function changeDog clicked')
	  	setCount(count + 1)
	 	console.log(count)
	 	console.log(doggoArray[4])
	  	setDog(doggoArray[count])
	 	}
	  }

	console.log(count)
	console.log(doggoArray.length)
	
	if ( count === doggoArray.length) {
	 	check = 'url(' + calendar + ')'
	 }
	else {
	 	check = 'url(' + dog.background + ')'
	}
	
	const divStyle = {
		backgroundImage:  check,
	  	backgroundRepeat: 'no-repeat',
	  	backgroundSize: 'cover',
	  	width: '100vw',
	  	height: '100vh',
	  	display: 'flex',
	  	gap: '30px',
	  	justify_content: 'space-between',
	  }
	const dogButton = {
	 	position: 'absolute',
	 	right: '1.9375rem',
	 	bottom: '1.875rem',
	 	background: 'rgba(0,0,0,0.3)',
		border: '1px solid rgba(255,255,255,0.3)',
	 	borderRadius: '40px',
	 	width: '154px',
	 	height: '44px',
	 	color: '#fff',
	}

	const tempStyle = {
	 	color: 'black',
	  	width: '100vw',
	  	height: '100vh',
	  	display: 'flex',
	  	gap: '30px',
	  	justify_content: 'space-between',

	}
	
	const displayNone = {
	 	backgroundImage: 'url(' + logo +')'
	}

	const displayNone2 = {
	 	display: 'none'
	}
	

	const enoughStyle  = {
	 	width: '48.9375rem',
	 	height: '26.8125rem',
	}
	
	const onSuccess = (res) => {
	 	console.log('succeffujl')
	}
	
	const onFailure = (res) => {
		console.log('failure')
	}



	return (
		 <div className="doggo" style={count !== 5 ? divStyle : displayNone}>
		 <div className='content' >
		 	<div className="flex">
		 	<img className='logo' src={logo} alt="logo" />
		 	<h2>Aviato.</h2>
		 	<h1>{dog.p}</h1>
		 	<p>CONNECT.CALENDAR.NOW</p>
		 	<br />
			<Link to='/app' id='react-link' state={{ output: output }}>
		 	<div id='google-calendar' onClick={listUpcomingEvents}> <img src={calendar} alt="google-calendar" /><span>Connect Your Google Calendar</span></div>
			</Link>
		 	</div>
		 <img src={enough} style={count !== doggoArray.length ? displayNone2 : enoughStyle} alt="" />
		</div> 
			<button onClick={changeDog} style={count !== 5 ? dogButton : displayNone2}> Next  Doggo Pic -></button> 
		</div>
	)

}
