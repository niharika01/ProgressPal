import { useCallback, useState } from "react";
import {
  Button,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import EmojiPicker, { EmojiStyle } from 'emoji-picker-react';

import { useApp } from "./RealmApp";
import { getUrl } from "../utils";
import urls from "../urls.json";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
const { base, createHabit } = urls;

export default function CreateHabitModal({ refetch }) {
  const [name, setName] = useState();
  const [emoji, setEmoji] = useState();
  const [goal, setGoal] = useState();
  const [deadline, setDeadline] = useState();
  const [open, setOpen] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const app = useApp();
  const userId = app.currentUser?.id;

  const clearInputs = () => {
    setName(undefined);
    setEmoji(undefined);
    setGoal(undefined);
    setDeadline(undefined);
  }

  const onCancel = () => {
    clearInputs();
    handleClose();
  }

  const onCreateSubmit = useCallback(() => {
    const body = JSON.stringify({
      userID: userId,
      name,
      emoji,
      goal,
      deadline,
    });

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
      .then(response => refetch())
      .catch(error => console.log(error))

    handleClose();
  }, [userId, name, emoji, goal, deadline, refetch])

  // Emoji picker
  const onEmojiClick = (emojiData) => {
    setEmoji(emojiData.emoji);
  }
  const onEmojiInputClick = () => {
    setShowEmojiPicker(!showEmojiPicker);
  }

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
            <div className="name-emoji-row">
              <TextField
                required
                className="name-input"
                error={name === ""}
                label="Habit name"
                placeholder="Ex: Gym, Read, Water plants"
                size="small"
                value={name}
                onChange={(e) => { setName(e.target.value) }}
              />
              <Button 
                variant="outlined"
                className="emoji-input"
                onClick={onEmojiInputClick}
                sx={{ borderRadius: "4px", width: "32px", height: "100%" }}
              >
                {emoji 
                  ? <div className="habit-emoji">{emoji}</div>
                  : <InsertEmoticonIcon />
                }
              </Button>
            </div>
            {showEmojiPicker &&
              <div className="emoji-picker">
                <EmojiPicker
                onEmojiClick={onEmojiClick}
                emojiStyle={EmojiStyle.NATIVE}
                width="100%"
                />
              </div>
            }

            <TextField
              required
              error={goal === ""}
              placeholder="Ex: 30, 60"
              label="Goal"
              size="small"
              value={goal}
              onChange={(e) => { setGoal(e.target.value) }}
            />
            <DatePicker
              minDate={dayjs()}
              value={deadline}
              onChange={setDeadline}
              label="Deadline"
              size="small"
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