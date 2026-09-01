import { GrabObject } from '../Util/Grabber2';
import { useState } from 'react'
import { HomeSummaryInfo } from '../Mules/home-summary-info';
import { useNavigate } from 'react-router-dom';
import './assets/site.css';

export default function LandingPage()
{
    const navigate = useNavigate();

    const goToMainPage = () =>
    {
        navigate("/main");
    };

    const goToPeekPage = () =>
    {
        navigate("/peek");
    };

    /*
    setTimeout(() =>
    {
        goToMainPage();
        //goToPeekPage();
    }, 1000);
    */

    return (
        <div>
            <h2>A simple AI chatbot</h2>
            <p></p>
            <button className="btn btn-primary" onClick={goToMainPage}>Ask the chatbot about upcoming Launches...</button>
            <p></p>
            <button className="btn btn-secondary" onClick={goToPeekPage}>Look at the raw dataset</button>
        </div>
    );
}
