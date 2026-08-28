import { useState } from 'react'
import { GrabObject } from '../Util/Grabber2.tsx'
import { LaunchEvent } from '../Mules/launch-event.ts'

export default function Peek() 
{
    const initialList: LaunchEvent[] = [];
    const [mainList, setMainList] = useState<LaunchEvent[]>(initialList);

        
    GrabObject<LaunchEvent[]>('api/stupid').then(resp =>
    {
        setMainList(resp);
    });
    

  return (
      <div>

          <p>Launches...</p>
          {mainList.map((item) => (
              <li>
                  <h4>Date: {item.launchDate}</h4>
                  <h3>Launch Site: {item.launchSite}</h3>
                  <h2>Craft: {item.craftType}</h2>
                  <h3>Mission: {item.mission}</h3>

              </li>
          ))}
            <p>end of list</p>
      </div>



  );
}

