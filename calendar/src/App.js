import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DateTimePicker from "react-datetime-picker";
// import "react-datepicker/dist/react-datepicker.css";
import "react-clock/dist/Clock.css";
// import img from "./logo.png"
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
    resource:"Dr Von",
    notes:"Cant eat before Appointment"
},
{
    title: "Yearly Checkup",
    start: new Date(2023,2,10,4),
    end: new Date(2023,2,10,5,30),
    resource:"Doctor Stevens",
    notes:""

},
{
    title: "CTScan Appointment",
    start: new Date(2023,2,21,3),
    end: new Date(2023,2,21,3,30),
    resource:"Doctor Emily",
    notes:"No metal items allowed"

},
{
    title: "CTScan Evaluation",
    start: new Date(2023,2,28,9),
    end: new Date(2023,2,28,10,30),
    resource:"Dctor Mendez",
    notes:""
},]


function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [allEvents, setAllEvents] = useState(events);
  const [isDetails,setOpenDetails] = useState(false);
  const [event,setEvent] = useState("");

  function Popup() {
    const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "",resource:"",notes:""});

    function handleAddEvent() {
      setAllEvents([...allEvents, newEvent]);
    }

    const handleSubmit = (event) => {
      event.preventDefault();
    }
  
    return (
  <div className="popup">
        <label style={{position:'absolute',top:0,right:240}}>
              Appointment Details
        </label>
        <form onSubmit={handleSubmit}>
  
  
          <div className="input-grid">
            
            <label>
              Title:
              <input type="title" value={newEvent.title} onChange={(e) => setNewEvent({...newEvent,title:e.target.value})} />
            </label>
            <label>
              Date:
              <DateTimePicker type="date" value={newEvent.start} onChange={(e) => setNewEvent({...newEvent,start:e,end:e})} />
            </label>
            <label>
              Doctor:
              <input type="doctor"value={newEvent.resource} onChange={(e) =>setNewEvent({...newEvent,resource:e.target.value})} />
            </label>
            <label  style={{position:'absolute',top:90,right:270}}>
              Notes:
              <input  style={{position:'absolute',width:210}} value={newEvent.notes} type="notes"  onChange={(e) =>setNewEvent({...newEvent,notes:e.target.value})} />
            </label>
          </div>
          <button style={{position:'absolute',top:130,right:250}} type="submit" onClick={handleAddEvent}>Create Appointment</button>
        </form>
      </div>
    );
  }

  function Appointment() {  
    return (
      <div className="popup">
            <label style={{position:'absolute',top:0,right:240}}>
                  Appointment Details
            </label>
      
      
              <div className="input-grid">
                
                <label>
                  Title:
                  <input type="title" value={event.title}  />
                </label>
                <label>
                  Date:
                  <DateTimePicker type="date" value={event.start}  />
                </label>
                <label>
                  Doctor:
                  <input type="doctor"value={event.resource}  />
                </label>
                <label  style={{position:'absolute',top:90,right:270}}>
                  Notes:
                  <input  style={{position:'absolute',width:210}} value={event.notes} type="notes"   />
                </label>
                <button style={{position:'absolute',top:130,right:320}} type="submit" onClick={toggleAppoinmtnet}>Close</button>

              </div>
          </div>
        );
      }

  
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  const toggleAppoinmtnet = (e) => {
    setOpenDetails(!isDetails);
    setEvent(e);
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

          <div className="app">
          <button onClick={togglePopup}>Add Appointment</button>
          {isOpen && <Popup />}
        </div>
              


          <Calendar onSelectEvent={(e)=>toggleAppoinmtnet(e)}  localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" style={{ height: 500, margin: "50px" }} />
          {isDetails && <Appointment />}

      </div>

  );
}

export default App;