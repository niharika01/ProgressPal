import { useCallback, useState } from "react";
import {
  Button,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useApp } from "./RealmApp";
import { getUrl } from "../utils";
import urls from "../urls.json";
const { base, createHabit } = urls;

export default function CreateHabitModal({ setSubmittedHabit }) {
  const [name, setName] = useState();
  const [emoji, setEmoji] = useState();
  const [goal, setGoal] = useState();
  const [deadline, setDeadline] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const app = useApp();
  const userId = app.currentUser?.id;

  const onCancel = () => {
    setName(undefined);
    setEmoji(undefined);
    setGoal(undefined);
    setDeadline(undefined);
    handleClose();
  }

  const onCreateSubmit = useCallback(() => {
    const body = JSON.stringify({
      userID: userId,
      name,
      emoji,
      goal,
      deadline,
    })

    // check for required fields
    if (name == undefined || emoji == undefined || goal == undefined) {
      console.log("Required fields not filled: ", body)
      return;
    }

    // send request to createHabit endpoint
    console.log("sending POST createHabit with body: ", body)
    fetch(getUrl(base, createHabit), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    })
      .then(response => response.json())
      .then(json => console.log(json))
      .catch(error => console.log(error))

    // clear fields and close modal
    handleClose();
    setSubmittedHabit(0);
  }, [userId, name, emoji, goal, deadline, setSubmittedHabit])

  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="outlined"
        size="small"
        sx={{ borderRadius: "36px", height: "64px", width: "64px" }}
      >
        <AddIcon />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <div className="create-habit-modal">
          <Typography component="p" variant="h6">
            Create new habit
          </Typography>

          <div className="create-habit-input">
            <TextField
              required
              error={name===""}
              label="Habit name"
              placeholder="Ex: Gym, Read, Water plants"
              size="small"
              value={name}
              onChange={(e) => {setName(e.target.value)}}
            />
            <TextField
              required={true}
              error={emoji===""}
              label="Emoji"
              size="small"
              value={emoji}
              onChange={(e) => {setEmoji(e.target.value)}}
            />
            <TextField
              required
              error={goal===""}
              placeholder="Ex: 30, 60"
              label="Goal"
              size="small"
              value={goal}
              onChange={(e) => {setGoal(e.target.value)}}
            />
            <TextField
              label="Deadline"
              size="small"
              value={deadline}
              onChange={(e) => {setDeadline(e.target.value)}}
            />
          </div>

          <div className="modal-action-items">
            <Button
              onClick={onCancel}
              type="button"
              size="medium"
              variant="outlined"
              className="submit-habit-button"
            >
              Cancel
            </Button>
            <Button
              onClick={onCreateSubmit}
              variant="contained"
              type="button"
              size="medium"
              className="submit-habit-button"
            >
              Submit
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )  
}