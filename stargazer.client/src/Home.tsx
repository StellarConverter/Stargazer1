import { useState } from 'react'
import { Grabbit2 } from '../Util/Grabber2.tsx'
import { LaunchEvent } from '../Mules/launch-event.ts'

function Home() 
{
    const initialList: LaunchEvent[] = [];
    const [mainList, setMainList] = useState<LaunchEvent[]>(initialList);

    setTimeout(()=>
    {
        Grabbit2<LaunchEvent[]>('api/stupid').then(resp =>
        {
            setMainList(resp);
        })
    }, 50);

    //Grabbit2('weatherforecast').then(resp => { alert('Grabbits promise THEN'); alert(resp); });


    


    return (
        <div>
            <p>Startgazer Home</p>
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

export default Home;