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
import "./CalendarPage.css";
import { useNavigate } from "react-router-dom";


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
var events = []


function CalendarPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [refopen, referalOpen] = useState(false);
  const [allEvents, setAllEvents] = useState(events);
  const [isDetails,setOpenDetails] = useState(false);
  var [event,setEvent] = useState("");


  function Popup() {
    const [appointment, setAppointment] = useState({
      title: "",
      start: "",
      end: "",
      resource: "",
      notes: ""
    });
  
    function handleAddEvent() {
      setAllEvents([...allEvents, appointment]);
      setIsOpen(!isOpen);
    }
  
    const handleSubmit = (event) => {
      event.preventDefault();

    }
  
    return (
      <div className="popup">
        <h2>Appointment Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-grid">
            <div className="form-field">
              <label htmlFor="title">Title:</label>
              <input id="title" type="text" value={appointment.title} onChange={(e) => setAppointment({...appointment, title: e.target.value})} />
            </div>
            <div className="form-field">
              <label htmlFor="start">Date:</label>
              <input id="start" type="datetime-local" value={appointment.start} onChange={(e) => setAppointment({...appointment, start: e.target.value, end: e.target.value})} />
            </div>
            <div className="form-field">
              <label htmlFor="resource">Doctor:</label>
              <input id="resource" type="text" value={appointment.resource} onChange={(e) => setAppointment({...appointment, resource: e.target.value})} />
            </div>
            <div className="form-field">
              <label htmlFor="notes">Notes:</label>
              <textarea id="notes" rows="1" cols="30" value={appointment.notes} onChange={(e) => setAppointment({...appointment, notes: e.target.value})} />
            </div>
          </div>
          <button style={{position:'absolute',top:200,left:260}} type="submit" onClick={handleAddEvent}>Create Appointment</button>
        </form>
      </div>
    );
  }
  

  

  function ViewAppointment() {  
    return (
      <div className="popup">
        <h2>Appointment Details</h2>
        <form>
          <div className="input-grid">
            <div className="form-field">
              <label htmlFor="title">Title:</label>
              <input id="title" type="text" value={event.title}/>
            </div>
            <div className="form-field">
              <label htmlFor="start">Date:</label>
              <input id="start" type="datetime-local" value={format(new Date(event.start), "yyyy-MM-dd'T'HH:mm")} />
            </div>
            <div className="form-field">
              <label htmlFor="resource">Doctor:</label>
              <input id="resource" type="text" value={event.resource}/>
            </div>
            <div className="form-field">
              <label htmlFor="notes">Notes:</label>
              <textarea id="notes" rows="1" cols="30" value={event.notes} />
            </div>
          </div>
          <button style={{position:'absolute',top:200,left:260}} type="submit" onClick={toggleViewAppointment}>Close</button>
        </form>
      </div>
    );
  }
  
  const navigate = useNavigate();

  
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  

  const logout = (event) =>  {
    event.preventDefault();
    navigate("/")

  }
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
    const newEvents = [
      {
        title: "Dentist Appointment",
        start: new Date(2023, 3, 12, 12, 30),
        end: new Date(2023, 3, 12, 1, 30),
        resource: "Dr Von",
        notes: "Can't eat before Appointment"
      },
      {
        title: "Yearly Checkup",
        start: new Date(2023, 3, 10, 4),
        end: new Date(2023, 3, 10, 5, 30),
        resource: "Doctor Stevens",
        notes: ""
      },
      {
        title: "CTScan Appointment",
        start: new Date(2023, 3, 21, 3),
        end: new Date(2023, 3, 21, 3, 30),
        resource: "Doctor Emily",
        notes: "No metal items allowed"
      },
      {
        title: "CTScan Evaluation",
        start: new Date(2023, 3, 23, 2, 30),
        end: new Date(2023, 3, 23, 4),
        resource: "Doctor Zhang",
        notes: ""
      }
    ];
    setAllEvents(newEvents);
  };
  const toggleViewAppointment = (e) => {
    setOpenDetails(!isDetails);
    setEvent(e);
  }
  
  return (
      <div className="App">
        <div style={{ position: 'absolute', top: 50, left: 50 }}>
        {/* <img  width={150} left="20" height={150} src={img} alt="logo"/> */}
     </div>
          <view style={{position:'absolute',right:40}}>
            <text >Logged in as: <b>One Medical    </b></text>
            <button className="button" onClick={logout}> Logout</button>
          </view>

          <h1>DocCalendar</h1>
          <div>
          <p>Patient Selected:</p>


        <select onChange={handleSelectChange}>

          <option value="">--Select a patient--</option>
          <option value="option1">Mary Roberts</option>
          <option value="option2">Henry Styles</option>
          <option value="option3">Therman Uma</option>
          <option value="option3" > - New Patient Code: 3842 -</option>

        </select>
        </div>`

          <div className="app">
          <button onClick={togglePopup}>Add Appointment</button>
          {isOpen && <Popup />}
        </div>
              


          <Calendar onSelectEvent={(e)=>toggleViewAppointment(e)}  localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" style={{ height: 500, margin: "50px" }} />
          {isDetails && <ViewAppointment />}

      </div>

  );
}

export default CalendarPage;