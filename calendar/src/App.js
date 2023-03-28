import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DateTimePicker from "react-datetime-picker";
import "react-datepicker/dist/react-datepicker.css";
import "react-clock/dist/Clock.css";
import img from "./logo.png"
import "./App.css";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});
const events = [{
    title: "Dentist Appointment",
    start: new Date(2023,2,12,12,30),
    end: new Date(2023,2,12,1,30),
    resource:"Must not eat before appointment"
},
{
    title: "Yearly Checkup",
    start: new Date(2023,2,10,4),
    end: new Date(2023,2,10,5,30),
    resource:""
},
{
    title: "CTScan Appointment",
    start: new Date(2023,2,21,3),
    end: new Date(2023,2,21,3,30),
    resource:"No metal items allowed."

},
{
    title: "CTScan Evaluation",
    start: new Date(2023,2,28,9),
    end: new Date(2023,2,28,10,30),
    resource:""
},]

function App() {
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "",resource:"" });
  const [allEvents, setAllEvents] = useState(events);
  const [glob, setGlob] = useState(null);
  const [day, setDay] = useState({title:"No selected appointment",start:"No selected date",resource:"None"});

  function handleAddEvent() {    
      setAllEvents([...allEvents, newEvent]);
  }

  return (
      <div className="App">
        <div style={{ position: 'absolute', top: 50, left: 50 }}>
        <img  width={150} left="20" height={150} src={img} alt="logo"/>
      </div>
          <view style={{position:'absolute',right:40}}>
            <text>Logged in as: <b>One Medical</b></text>
          </view>
          <h1>DocCalendar</h1>
          <h3>Patient: Mary Roshvenster</h3>

          <div>
              

              <input type="text" placeholder="Appointment Title" style={{ width: "10%"}} value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
              <DateTimePicker   value={glob} style={{ marginRight: "10px" }} selected={newEvent.start} onChange={(e) => setNewEvent({ ...newEvent, start:e,end:e,setGlob},setGlob(e))} />
              <input type="text" placeholder="Notes" style={{ width: "10%"}} value={newEvent.resource} onChange={(e) => setNewEvent({ ...newEvent, resource: e.target.value })} />
              <button stlye={{ marginTop: "10px" ,marginRight:"20px"}} onClick={handleAddEvent}>
                  Add Event
              </button>
          </div>
          
          <Calendar onSelectEvent={(date)=>setDay(date)} localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" style={{ height: 500, margin: "50px" }} />
          <div style={{ borderBottom: '1px solid black', height: '10px' }} />          <view>
            <text style={{fontweight:'bold',position:'absolute',top:740,left:750,width:"20%",fontSize:20}}>
              <b>Selected Appointment Details:</b>
            </text>
            <text style={{fontweight:'bold',position:'absolute',top:800,left:980,width:"20%"}}>
              Appointment Date:
            </text>
            <text style={{fontweight:'bold',position:'absolute',top:800,left:280,width:"20%"}}>
              Appointment Tittle:
            </text>
            <text style={{fontweight:'bold',position:'absolute',top:860,left:280,width:"20%"}}>
              Appointment Notes:
            </text>
            <input style={{fontweight:'bold',position:'absolute',top:820,left:400,width:"20%"}}
                value = {String(day.title)}
            /><input style={{fontweight:'bold',position:'absolute',top:820,left:1100,width:"20%"}}
                value = {String(day.start)}
            />
            <input style={{fontweight:'bold',position:'absolute',top:880,left:400,width:"20%"}}
                value = {String(day.resource)}
            />
            

            
        </view>
      </div>

  );
}

export default App;