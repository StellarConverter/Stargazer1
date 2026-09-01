import { useState } from 'react'
import { GrabObject } from '../Util/Grabber2.tsx'
import { LaunchEvent } from '../Mules/launch-event.ts'
import { PromptResponse } from '../Mules/prompt-response.ts'
import { PromptRequest } from '../Mules/prompt-request.ts'
import './assets/site.css';

function MainPage() 
{
    const [prompt, setPrompt] = useState<string>('How many Launches are scheduled for this month?');
    const promptOnChange = (e:any) =>
    {
        setPrompt(e.target.value);
    };

    const [primaryResponse, setPrimaryResponse] = useState("nothing yet...");

    function submitPrompt()
    {
        setPrimaryResponse("Sending...");
        var req = new PromptRequest();
        req.prompt = prompt;

        GrabObject<PromptResponse>('api/Prompt', "POST", req).then(rec =>
        {
            setPrimaryResponse(rec.content);
        });
    };

    return (
        <div className="full-width">
            <div>Ask the LLM about upcoming launches.  In particular you can ask Stargazer to list what launches it knows about, and ask for details about particular lacunhes.  Assuming the LLM / tooling can figure it out.</div>
            <div  className = "box-border">
            <div id="romptBox">

                    <div className="full-width left-align"><b>Prompt:</b></div>
                    <textarea className="full-width left-align prompt-box" rows={4} value={prompt} onChange={promptOnChange} ></textarea>
                        <button className="btn btn-primary" onClick={submitPrompt}>Go...</button>
                </div>
                <div id="responseBox">
                    <div className="prompt-reply-box" id="responseContent">{primaryResponse}</div>
                </div>
            </div>
        </div>
    );
}

export default MainPage;