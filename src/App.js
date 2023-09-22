import { useState } from 'react';
import { useForm } from 'react-hook-form';

import './App.css';

function SVGBackground() {
  return (
    <>
      <svg preserveAspectRatio="xMidYMid slice" viewBox="10 10 80 80">
        <defs>
          <style
            dangerouslySetInnerHTML={{
              __html:
                "@keyframes rotate {0% {transform: rotate(0deg);} 100% {transform: rotate(360deg);}}.out-top {    animation: rotate 20s linear infinite;    transform-origin: 13px 25px;}.in-top {    animation: rotate 10s linear infinite;    transform-origin: 13px 25px;}.out-bottom {    animation: rotate 25s linear infinite;    transform-origin: 84px 93px;}.in-bottom {    animation: rotate 15s linear infinite;    transform-origin: 84px 93px;}"
            }}
          />
        </defs>
        <path
          fill="#90E0EF"
          className="out-top"
          d="M37-5C25.1-14.7,5.7-19.1-9.2-10-28.5,1.8-32.7,31.1-19.8,49c15.5,21.5,52.6,22,67.2,2.3C59.4,35,53.7,8.5,37-5Z"
        />
        <path
          fill="#00B4D8"
          className="in-top"
          d="M20.6,4.1C11.6,1.5-1.9,2.5-8,11.2-16.3,23.1-8.2,45.6,7.4,50S42.1,38.9,41,24.5C40.2,14.1,29.4,6.6,20.6,4.1Z"
        />
        <path
          fill="#90E0EF"
          className="out-bottom"
          d="M105.9,48.6c-12.4-8.2-29.3-4.8-39.4.8-23.4,12.8-37.7,51.9-19.1,74.1s63.9,15.3,76-5.6c7.6-13.3,1.8-31.1-2.3-43.8C117.6,63.3,114.7,54.3,105.9,48.6Z"
        />
        <path
          fill="#0077B6"
          className="in-bottom"
          d="M102,67.1c-9.6-6.1-22-3.1-29.5,2-15.4,10.7-19.6,37.5-7.6,47.8s35.9,3.9,44.5-12.5C115.5,92.6,113.9,74.6,102,67.1Z"
        />
      </svg>
    </>
  )
}

function PoolTitle() {
  return (
    <div className="pool-title hoverable">
      <h1 onClick={() => window.location.reload()} style={{ display: 'block' }}>pool ✈️</h1>
    </div>
  )
}

function HowItWorks() {
  return (
    <section id="how-it-works">
      <div className="content" >
        <div className="box">
          <h2>How it works</h2>
          <ol>
            <li>Enter your departure schedule</li>
            <li>
              Get paired with your <em>PoolPal</em> via SMS (for higher match rate,
              plan early)
            </li>
            <li>
              Finalize details with your <em>PoolPal</em> and order and split the
              price of a car together
            </li>
            <li>Save money on your trip to the airport. safe travels!</li>
          </ol>
        </div>
        <div className="box">
          <p style={{ fontWeight: 600 }}>
            *Pool does not order your ride-share. we provide the contact information
            of someone who shares your itenerary for you to finalize ride details
            with.
          </p>
        </div>
        {/* <div id="onboard-buttons" style="margin-right: 10px; margin-top: 13px">
          <a href="./signup.html" class="small-button" id="signup-button">sign up</a>
      </div> */}
      </div>

      <a href="#about-us" className="scroll-link-bottom">
        about us
        <br /><span class="fa-solid fa-chevron-down"></span>
      </a>
    </section>
  )
}

function About() {
  return (
    <section id="about-us">
      <a href="#home" className="scroll-link-bottom">
        <span class="fa-solid fa-chevron-up"></span><br />
        join now
      </a>
      <div className="content" >
        <div className="box" id="about-us-content">
          <p>
            Save your money for the things you love. <br />
            <br />
            by Diego Scanlon and Pranav Padmanabhan
            <br />@ UChicago in 2023
          </p>
        </div>
      </div>
    </section>
  )
}

function WaitlistForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const [style, setStyle] = useState({
    form: {},
    success: { display: 'none' }
  });
  return (
    <>
      <form style={style.form} onSubmit={handleSubmit((data) => {
        fetch('https://us-east-1.aws.data.mongodb-api.com/app/data-ejyoo/endpoint/waitlist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data.name ? {
            name: data.name,
            phone: data.phone,
            email: data.email
          } : {
            phone: data.phone,
            email: data.email
          })
        }).then(() => setStyle({
          form: { display: 'none' },
          success: { display: 'block' }
        }));
      })}>
        <h2 className="title">join now</h2>
        <div><input type="text" id="name" className="custom-input" placeholder="first name (optional)" {...register('name')} /></div>
        <div><input type="tel" id="phone" className={`custom-input ${errors.phone ? 'error' : ''}`} placeholder={`${errors.phone ? '* ' : ''}U.S. phone number`} {...register('phone', { required: true })} /></div>
        <div><input type="email" id="email" className={`custom-input ${errors.email ? 'error' : ''}`} placeholder={`${errors.phone ? '* ' : ''}school email`} {...register('email', { required: true })} /></div>
        <div><button className="submit-button hoverable" type="submit">sign up</button></div>
      </form>
      <div style={style.success}>
        <h2>Thanks! We'll let you know when Pool becomes avaliable 🫡</h2>
      </div>
    </>
  )
}

export function Home() {
  const [style, setStyle] = useState({
    intro: { display: 'block' },
    form: { display: 'none' }
  });
  return (
    <>
      <div className="content" style={style.intro}>
        <div id="statement">
          <h1>Save money on your airport rideshares.</h1>
          <p>
            <b>Share and split rides</b> to and from airports with your classmates
            who have similar travel dates, times, and destinations.
          </p>
        </div>
        <div id="onboard-buttons">
          <button className="small-button hoverable" id="signup-button" onClick={() => setStyle({
            intro: { display: 'none' },
            form: {}
          })}>
            join now
          </button>
        </div>
      </div>
      <div className="content" style={style.form} id="sign-up-form">
        <WaitlistForm />
      </div>
      <a href="#how-it-works" className="scroll-link-bottom">
        how it works
        <br /><span class="fa-solid fa-chevron-down"></span>
      </a>
    </>
  )
}

export default function App() {
  return (
    <>
      <SVGBackground />
      <PoolTitle />
      <section id="home">
        <Home />
      </ section>
      <HowItWorks />
      <About />
    </>
  );
}
