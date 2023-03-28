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
    end: new Date(2023,2,12,1,30)
},
{
    title: "Yearly Checkup",
    start: new Date(2023,2,10,4),
    end: new Date(2023,2,10,5,30)
},
{
    title: "CTScan Appointment",
    start: new Date(2023,2,21,3),
    end: new Date(2023,2,21,3,30)
},
{
    title: "CTScan Evaluation",
    start: new Date(2023,2,28,9),
    end: new Date(2023,2,28,10,30)
},]

function App() {
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState(events);
  const [glob, setGlob] = useState(null);
  function handleAddEvent() {    
      setAllEvents([...allEvents, newEvent]);
  }

  return (
      <div className="App">
          <view style={{position:'absolute',right:40}}>
            <text>Logged in as: One Medical</text>
          </view>
          <h1>DocCalendar</h1>
          <h3>Patient: Mary Roshvenster</h3>

          <div>
              

              <input type="text" placeholder="Appointment Title" style={{ width: "10%"}} value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
              <DateTimePicker   value={glob} style={{ marginRight: "10px" }} selected={newEvent.start} onChange={(e) => setNewEvent({ ...newEvent, start:e,end:e,setGlob},setGlob(e))} />
              
              <button stlye={{ marginTop: "10px" ,marginRight:"20px"}} onClick={handleAddEvent}>
                  Add Event
              </button>
          </div>
          <Calendar localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" style={{ height: 500, margin: "50px" }} />
      </div>
  );
}

export default App;