import React from "react";
import {
  Container,
  Button,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import * as emoji from 'node-emoji'

export function HabitTrackerPage() {

  // we should query here for the buttons to display
  // find all habits by user ID --> return emojis & habit ID
  // For now we have this
  const habits = [
    {
      // "emoji": "💧",
      "emoji": "0x1F4A7",
      "habit_id": "water",
    },
    {
      // "emoji": "💪",
      "emoji": "0x1F4AA",
      "habit_id": "gym",
    },
  ]

const events = [
  { title: 'muscle', start: new Date() }
]

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
        Track progress
      </Typography>
      <div className="add-progress-row">
        <div className="track-habits-bubbles">
          {habits.map((habit) => {
            return (<Button
              variant="outlined"
              size="small"
              sx={{borderRadius: "36px", height: "64px", width: "64px"}}
            >
              {/* &#128167; */}
              {/* {habit.emoji} */}
              <span className="habit-emoji" role="img">
                {String.fromCodePoint(habit.emoji)}
              </span>
              
            </Button>)
          })}
        </div>
        <div className="add-habit-wrapper">
          <Button
            variant="outlined"
            size="small"
            sx={{borderRadius: "36px", height: "64px", width: "64px"}}
          >
            <AddIcon />
          </Button>
        </div>
      </div >
      <div className="divider"></div>
      <div className="habit-calendar">
       <Typography component="p" variant="h5">
        Habit Progress
      </Typography>
     <FullCalendar
        plugins={[dayGridPlugin]}
        initialView='dayGridMonth'
        weekends={false}
        events={events}
        eventContent={renderEventContent}
      />
      </div>
    </Container>
  )
}