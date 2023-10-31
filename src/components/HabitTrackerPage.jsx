import { useCallback, useEffect, useState } from "react";
import { Container, Button, Typography } from "@mui/material";
import { useApp } from "./RealmApp";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import * as emoji from 'node-emoji'

import urls from "../urls.json";
const { base, getHabits } = urls;

import { getUrl } from "../utils";
import CreateHabitModal from "./CreateHabitModal";
import { toHaveAttribute } from "@testing-library/jest-dom/dist/matchers";

export function HabitTrackerPage() {
  const app = useApp();
  const userId = app.currentUser?.id;
  // const [submittedHabit, setSubmittedHabit] = useState(0);
  const [habits, setHabits] = useState();
  const [dates, setDates] = useState();
  
  const fetchHabits = useCallback(() => {
    fetch(getUrl(base, getHabits, {"userID": userId}), {
      method: "GET",
    })
      .then(response => response.json())
      .then(json => {setHabits(json.res)
      formatHabits(habits)})
      .catch(error => console.log(error));
  }, [userId])

  useEffect(() => {
    fetchHabits();
  }, [fetchHabits]);

console.log("habits are",habits)
  const events = [
  { title: 'muscle', start: new Date() },
  { title: 'unicorn', start: new Date() }
]
// map must be dates[title:,date:]
function formatHabits(habits) {
  var events=[]
  habits.forEach(habit=> {
    var dates= habit.dates
    dates.forEach(date=> {
      console.log("emoji??",emoji.get(habit.emoji))
      events.push({title:emoji.get(habit.emoji),start:date})
    });
  });
 console.log("EVENTS****",events)
 setDates(events)
}

  // a custom render function
function renderEventContent(eventInfo) {
  return (
    <>
     <b>{emoji.get(`${eventInfo.event.title}`)}</b>
    </>
  )
}

  return (
    <Container className="main-container" maxWidth="sm">
      <Typography component="p" variant="h5">
        Habits
      </Typography>
      <div className="add-progress-row">
        <div className="track-habits-bubbles">
          {habits?.map((habit) => {
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
        <div className="add-habit-wrapper">
          <CreateHabitModal refetch={fetchHabits} />
        </div>
      </div>
      <div className="habit-calendar">
       <Typography component="p" variant="h5">
        Habit Progress {`${emoji.get("chart_with_upwards_trend")}`}
      </Typography>
     <FullCalendar
        plugins={[dayGridPlugin]}
        initialView='dayGridMonth'
        weekends={true}
        events={dates}
        eventContent={renderEventContent}
        eventColor= '#ff0000'
      />
      </div>
    </Container>
  );
}