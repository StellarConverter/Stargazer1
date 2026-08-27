import { GrabObject } from '../Util/Grabber2';
import { useState } from 'react'
import { HomeSummaryInfo } from '../Mules/home-summary-info';
import { useNavigate } from 'react-router-dom';

export default function LandingPage()
{
    const [launchCount, setLaunchCount] = useState(-1);

    const navigate = useNavigate();

    const goToMainPage = () =>
    {
        navigate("/main");
    };


    setTimeout(() =>
    {
        //GrabObject<HomeSummaryInfo>('api/home').then(resp => setLaunchCount(resp.launchCount));
        goToMainPage();
    }, 1000);//LOLCAT -- replace timeout with proper retry error retry [as this fails the first time due to the server starting up]

    return (
        <div>
            <h1>Stargazer</h1>
            <h2>{launchCount == -1 ? 'Loading..' : launchCount +' Launches'}</h2>
            <h2>A simple React app which does some stuff</h2>
            <p></p>
            <button onClick={ goToMainPage }>Go to Main...</button>
        </div>
    );
}
