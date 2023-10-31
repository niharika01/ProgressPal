import { useState, useEffect } from "react";
import { Container, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import * as emoji from 'node-emoji'
// import { useApp } from "./RealmApp";
// import { urls } from "../constant";
// import { getUrl } from "../get-url.js";
import { useApp } from "./RealmApp";

import urls from "../urls.json";
const { base, getHabits } = urls;

import { getUrl } from "../utils";
import CreateHabitModal from "./CreateHabitModal";

export function HabitTrackerPage() {
  const app = useApp();
  const userId = app.currentUser?.id;
  console.log("user here",userId);
  const [habits, setHabits] = useState([]);
  const [habitEvents,setHabitEvents] = useState({ title: 'muscle', start: new Date() })
  
  useEffect(() => {
    fetch(getUrl(base, getHabits, {"userID": userId}), {
      method: "GET",
    })
      .then(response => response.json())
      .then(json => {setHabits(json.res)
    setHabitEvents(formatHabitEvents(json.res))})
      .catch(error => console.log(error));
  }, [userId]);
  console.log('here',habits)

  // we should query here for the buttons to display
  // find all habits by user ID --> return emojis & habit ID
  // For now we have this
  // const habits = [
  //   {
  //     // "emoji": "💧",
  //     emoji: "0x1F4A7",
  //     _id: "water",
  //   },
  //   {
  //     // "emoji": "💪",
  //     emoji: "0x1F4AA",
  //     _id: "gym",
  //   },
  // ];

function formatHabitEvents(habits)  {
  console.log("here 1235",habits)
  eventArray=[]
  habits.map((habit, index) => {
     datesArray.append(elem.dates)
               console.log("key is---",elem)
eventArray.append(habit.dates)
               console.log("v is",v)
               setHabitEvents(habitEvents[k.dates])
            }),
    console.log("something is ",something)
  
    return [{ title: 'muscle', start: new Date() },{ title: 'unicorn', start: new Date() }]
}

// const events(habits) = [
//  // { title: 'muscle', start: new Date() }

// ]

  // a custom render function
function renderEventContent(eventInfo) {
  return (
    <>
     <b>{emoji.get(`${eventInfo.event.title}`)}</b>
    </>
  )
}

  // const onAddHabitClick = () => {
  //   fetch(`${urls.base}${urls.createHabit}`)
  //     .then(response => response.json())
  //     .then(json => console.log(json))
  //     .catch(error => console.log(error))
  // }

  return (
    <Container className="main-container" maxWidth="sm">
      <Typography component="p" variant="h5">
        Habits
      </Typography>
      <div className="add-progress-row">
        {habits.length==0?<Typography component="p" variant="h7">
        You are not tracking any habits yet.
      </Typography>:
      <div className="track-habits-bubbles">
          {habits?.map((habit) => {
            console.log(habit)
            return (
              <Button
                key={habit._id}
                variant="outlined"
                size="small"
                sx={{ borderRadius: "36px", height: "64px", width: "64px" }}
              >
                <span className="habit-emoji" role="img">
                  {habit.emoji}
                  {/* {String.fromCodePoint(habit.emoji)} */}
                </span>
              </Button>
            );
          })}
        </div>
        }
        <div className="add-habit-wrapper">
          <CreateHabitModal />
          {/* <Button
            variant="outlined"
            size="small"
            sx={{ borderRadius: "36px", height: "64px", width: "64px" }}
          >
            <AddIcon />
          </Button> */}
        </div>
      </div >
      <div className="divider" padding="100px"></div>
      <div className="habit-calendar">
       <Typography component="p" variant="h5">
        Habit Progress {`${emoji.get("chart_with_upwards_trend")}`}
      </Typography>
     <FullCalendar
        plugins={[dayGridPlugin]}
        initialView='dayGridMonth'
        weekends={true}
        events={habitEvents}
        eventContent={renderEventContent}
        eventColor= '#ff0000'
      />
      </div>
    </Container>
  );
}
