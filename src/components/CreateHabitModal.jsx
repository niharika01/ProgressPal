import { useCallback, useState } from "react";
import {
  TextField,
  Button,
  Modal,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useApp } from "./RealmApp";
// import { getUrl } from "../utils";
// import urls from "../urls.json";
// const { base, getHabits } = urls;


export default function CreateHabitModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const app = useApp();
  const userId = app.currentUser?.id;
  console.log("userId", userId);

  const onSubmit = useCallback(() => {
    // send request to createHabit endpoint
    handleClose();
  }, [])

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
        <div>hello</div>
      </Modal>
    </div>
  )  
}