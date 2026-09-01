import { useState, useEffect} from 'react'
import { GrabObject } from '../Util/Grabber2.tsx'
import { LaunchEvent } from '../Mules/launch-event.ts'
import { HomeSummaryInfo } from '../Mules/home-summary-info';
import './assets/site.css';

export default function Peek() 
{
    const initialList: LaunchEvent[] = [];
    const [mainList, setMainList] = useState<LaunchEvent[]>(initialList);
    const [launchCount, setLaunchCount] = useState(0);


        useEffect(() =>
        {
            GrabObject<LaunchEvent[]>('api/stupid').then(resp =>
            {
                setMainList(resp);
                GrabObject<HomeSummaryInfo>('api/home').then(resp => setLaunchCount(resp.launchCount));
            });
  }, []); // Empty array ensures single execution

        

    

  return (
      <div>
          <p>List of Launches...</p>
          {
              mainList.map((item, index) => (
              <div key={ index} className="full-width box-border">
                  <div className="left-align"><b>Date:</b> {item.launchDate}</div>
                  <div className="left-align"><b>Launch Site:</b> {item.launchSite}</div>
                  <div className="left-align"><b>Craft:</b> {item.craftType}</div>
                  <div className="mission-text">Mission: {item.mission}</div>
              </div>
              ))}
          <p>Count: { launchCount }</p>
      </div>



  );
}

