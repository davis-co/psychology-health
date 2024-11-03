import React, {
  useEffect,
  useState,
} from 'react';

const CountdownTimer = ({ initialTime , onComplete }) => {
      const [timeLeft, setTimeLeft] = useState(initialTime);
  
      useEffect(() => {
          if (timeLeft <= 0) {
              if (onComplete) onComplete();
              return;
          }
  
          const timerId = setInterval(() => {
              setTimeLeft((prevTime) => prevTime - 1);
          }, 1000);
  
          return () => clearInterval(timerId);
      }, [timeLeft, onComplete]);
  
      const formatTime = (seconds) => {
          const days = Math.floor(seconds / 86400);
          const hours = Math.floor((seconds % 86400) / 3600);
          const minutes = Math.floor((seconds % 3600) / 60);
          const secs = seconds % 60;
  
          return { days, hours, minutes, secs };
      };
  
      const { days, hours, minutes, secs } = formatTime(timeLeft);
  
      return (
        <div className='sticky top-0 z-20 flex w-full bg-white py-2'>
            <div dir='ltr' className="grid auto-cols-max grid-flow-col gap-2 text-right">      
              <div className="flex flex-col">
                  <span className="font-mono countdown lg:text-3xl">
                      <span style={{ "--value": hours }}></span> :
                  </span>
              </div>
              <div className="flex flex-col">
                  <span className="font-mono countdown lg:text-3xl">
                      <span style={{ "--value": minutes }}></span> :
                  </span>
              </div>
              <div className="flex flex-col">
                  <span className="font-mono countdown lg:text-3xl">
                      <span style={{ "--value": secs }}></span> 
                  </span>
              </div>
          </div>
        </div>
          
      );
  };
  
  export default CountdownTimer;
  