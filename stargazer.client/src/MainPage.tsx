import { useState } from 'react'
import { GrabObject } from '../Util/Grabber2.tsx'
import { LaunchEvent } from '../Mules/launch-event.ts'
import { PromptResponse } from '../Mules/prompt-response.ts'
import { PromptRequest } from '../Mules/prompt-request.ts'

function MainPage() 
{
    const [prompt, setPrompt] = useState<string>('How many Launches are scheduled between August 20th and August 30th?');
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
                <span id="responseContent">{primaryResponse}</span>
            </div>
        </div>
    );
}

export default MainPage;