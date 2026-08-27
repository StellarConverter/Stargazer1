import { useState } from 'react'
import { GrabObject } from '../Util/Grabber2.tsx'
import { LaunchEvent } from '../Mules/launch-event.ts'

function MainPage() 
{
    const initialList: LaunchEvent[] = [];
    const [mainList, setMainList] = useState<LaunchEvent[]>(initialList);

    const [prompt, setPrompt] = useState<string>('What is the capital of Texas?');
    const promptOnChange = (e:any) =>
    {
        setPrompt(e.target.value);
    };
    function submitPrompt()
    {
        alert(prompt);
    }

    GrabObject<LaunchEvent[]>('api/stupid').then(resp =>
    {
        setMainList(resp);
    });



    return (
        <div>
            <h4>Ask the LLM about upcoming launches.  In particular you can ask Stargazer to list what launches it knows about, and ask for details about particular lacunhes.  Assuming the LLM / tooling can figure it out.</h4>
            <div id="romptBox">
            <p>
                    <b>Prompt:</b>
                    <input type="text" value={prompt} onChange={promptOnChange} ></input>
                <button onClick={submitPrompt}>Go...</button>
                </p>
            </div>
            <div id="responseBox">
            <span id="responseContent">send it...</span>
            </div>

                <hr></hr>
            <p>Launches...</p>
            {mainList.map((item) => (
                <li>
                    <h4>Date: {item.launchDateString}</h4>
                    <h3>Launch Site: {item.launchSite}</h3>
                    <h2>Craft: {item.craftType}</h2>
                    <h3>Mission: {item.mission}</h3>
                    
                </li>
            ))}
            <p>end of list</p>
        </div>
    );
}

export default MainPage;