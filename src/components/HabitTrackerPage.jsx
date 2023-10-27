import { useState, useEffect } from "react";
import { Container, Button, Typography } from "@mui/material";
import { useApp } from "./RealmApp";

import urls from "../urls.json";
const { base, getHabits } = urls;

import { getUrl } from "../utils";
import CreateHabitModal from "./CreateHabitModal";

export function HabitTrackerPage() {
  const app = useApp();
  const userId = app.currentUser?.id;
  const [submittedHabit, setSubmittedHabit] = useState(0);
  const [habits, setHabits] = useState();
  useEffect(() => {
    fetch(getUrl(base, getHabits, {"userID": userId}), {
      method: "GET",
    })
      .then(response => response.json())
      .then(json => setHabits(json.res))
      .catch(error => console.log(error));
  }, [userId, submittedHabit]);
  console.log(habits)

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

  return (
    <Container className="main-container" maxWidth="sm">
      <Typography component="p" variant="h5">
        Track progress
      </Typography>
      <div className="add-progress-row">
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
        <div className="add-habit-wrapper">
          <CreateHabitModal setSubmittedHabit={setSubmittedHabit} />
          {/* <Button
            variant="outlined"
            size="small"
            sx={{ borderRadius: "36px", height: "64px", width: "64px" }}
          >
            <AddIcon />
          </Button> */}
        </div>
      </div>
    </Container>
  );
}
