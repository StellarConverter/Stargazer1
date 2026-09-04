import { useState } from 'react'
//import { GrabObject } from '../Util/Grabber2.tsx'
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

    const [primaryResponse, setPrimaryResponse] = useState("Enter a prompt and click Go...");
    const [loading, setLoading] = useState(false);
    const [freshTerm, setFreshTerm] = useState("");


    const fetchData = async () =>
    {
        setPrimaryResponse("Sending...");
        setFreshTerm("");
        var req = new PromptRequest();
        req.prompt = prompt;

        try
        {
            setLoading(true);

            var options: any = {};
            options.method = "POST";
            options.headers = { 'Content-Type': 'application/json' };
            options.body = JSON.stringify(req);

            const response = await fetch('api/Prompt', options);
            if (!response.ok || !response.body)
            {
                throw response.statusText;
            }

            const reader = response.body.getReader();
            
            const decoder = new TextDecoder();
            var fullResponse = "";
            var lastTerm = ""; //used to highlight the last word that came back from the LLM, for a nice visual effect.

            while (true)
            {
                const { value, done } = await reader.read();
                if (done)
                {
                    break;
                }

                const decodedJsonChunk = decoder.decode(value, { stream: true });
                var splitChunks = decodedJsonChunk.split('"')
                    .filter(rec => rec !== '[' && rec !== ']' && rec !== ',' && rec !== "");
                var chunkString = "";
                lastTerm = "";
                for (let i = 0; i < splitChunks.length; i++)
                {
                    var token = splitChunks[i];
                    chunkString += token;
                    lastTerm = token;
                }

                fullResponse += chunkString;

                //now cut off the lastTerm before we show it...
                var fullResponseWithoutLastTerm = fullResponse;
                if (lastTerm && lastTerm.length > 0)
                {
                    fullResponseWithoutLastTerm = fullResponseWithoutLastTerm.substring(0, fullResponse.length - lastTerm.length);
                }
                setFreshTerm(lastTerm);
                setPrimaryResponse(fullResponseWithoutLastTerm);
            }

            //done...
            setLoading(false);
            setPrimaryResponse(fullResponse + lastTerm);
            setFreshTerm("");
        } catch (error)
        {
            setLoading(false);
            alert("Error: " + error);
        }
    };

    function submitPrompt()
    {
        fetchData();
    };

    function getGoBtnClass() : string
    {
        if (loading)
        {
            return "btn";
        }
        else
        {
            return "btn btn-primary";
        }
    }

    return (
        <div className="full-width">
            <div><i>Ask the LLM about upcoming space launches.  Typically there are about 10-12 upcoming launches - launch info is pulled live
                from the web site <b>spaceflightnow.com</b></i></div>
            <div  className = "box-border">
                <div id="romptBox">
                    <div className="full-width left-align"><b>Prompt:</b></div>
                    <textarea className="full-width left-align prompt-box" rows={4} value={prompt} onChange={promptOnChange} ></textarea>
                    <p></p>
                    <button className={getGoBtnClass()} onClick={submitPrompt}>Go...</button>
                </div>
                <div className="full-width left-align"><b>Response:</b></div>
                <div className="prompt-reply-box">
                    {primaryResponse}<span className="prompt-fresh-term">{freshTerm}</span>
                </div>
            </div>
        </div>
    );
}

export default MainPage;