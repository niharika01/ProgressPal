import { useCallback, useEffect, useState } from "react";
import { Container, Button, Typography } from "@mui/material";
import { useApp } from "./RealmApp";

import urls from "../urls.json";
const { base, getHabits } = urls;

import { getUrl } from "../utils";
import CreateHabitModal from "./CreateHabitModal";

export function HabitTrackerPage() {
  const app = useApp();
  const userId = app.currentUser?.id;
  // const [submittedHabit, setSubmittedHabit] = useState(0);
  const [habits, setHabits] = useState();
  
  const fetchHabits = useCallback(() => {
    fetch(getUrl(base, getHabits, {"userID": userId}), {
      method: "GET",
    })
      .then(response => response.json())
      .then(json => setHabits(json.res))
      .catch(error => console.log(error));
  }, [userId])

  useEffect(() => {
    fetchHabits();
  }, [fetchHabits]);

  return (
    <Container className="main-container" maxWidth="sm">
      <Typography component="p" variant="h5">
        Track progress
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
    </Container>
  );
}
