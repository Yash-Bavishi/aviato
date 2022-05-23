import React from 'react'
import GoogleLogin from 'react-google-login'
import GoogleLogout from 'react-google-login'
import logo from '../assets/aviato.svg'
import img from '../assets/landing.png'
import { Link } from 'react-router-dom'
export default function Landing() {

	return (
		<div className="landing">
			<GoogleLogin
			clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
			buttonText={"Continue with Google"}
			className='google-sign'
			isSignedIn={true}
		    cookiePolicy={'single_host_origin'}
			uxMode='redirect'
			redirectUri={'http://localhost:3000/doggo'}
			/>
			<img className='logo' src={logo} alt="logo" />
			<h1>Aviato.</h1>			
			<h2>Take Better Notes / Minutes Of Meetings</h2>
			<div className="order">
				<div><span className='dot'>1</span><p>Join Your Meeting</p></div>
				<div><span className='dot'>2</span><p>Run the Chrome Extenstion </p><span id='link'> <u> Click here to download</u></span></div>
				<div><span className='dot'>3</span><p>Start Taking Notes :D</p></div>				
			</div>
			<img id='landing-img' src={img} alt="app" />
			
		</div>
	)
}
