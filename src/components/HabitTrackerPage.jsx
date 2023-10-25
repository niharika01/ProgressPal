import React from "react";
import {
  Container,
  Button,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
// import { useApp } from "./RealmApp";
// import { urls } from "../constant";
// import { getUrl } from "../get-url.js";

export function HabitTrackerPage() {
  // const app = useApp()
  // const userID = app.getCurrentUserID();
  // // const username = "divya.gupta@mongodb.com";
  // const [habits2, setHabits] = useState();
  // useEffect(() => {
  //   fetch(getUrl(urls.getHabits, {"userID": userID}), {
  //     method: "GET",
  //   })
  //     .then(response => response.json())
  //     .then(json => setHabits(json))
  //     .catch(error => console.log(error));
  // }, []);
  
  // we should query here for the buttons to display
  // find all habits by user ID --> return emojis & habit ID
  // For now we have this
  const habits = [
    {
      // "emoji": "💧",
      "emoji": "0x1F4A7",
      "_id": "water",
    },
    {
      // "emoji": "💪",
      "emoji": "0x1F4AA",
      "_id": "gym",
    },
  ]

  // const onAddHabitClick = () => {
  //   fetch(`${urls.base}${urls.createHabit}`)
  //     .then(response => response.json())
  //     .then(json => console.log(json))
  //     .catch(error => console.log(error))
  // }

  return (
    <Container className="main-container" maxWidth="sm">
      <Typography coomponent="p" variant="h5">
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
      </div>
    </Container>
  )
}