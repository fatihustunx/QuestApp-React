import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemSecondaryAction,
  Modal,
  Radio,
  Typography,
} from "@mui/material";
import React from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Avatar(props) {
  const { avatarId } = props;
  const [open, setOpen] = React.useState(false);

  const [selectedValue, setSelectedValue] = React.useState(avatarId);

  const saveAvatar = () => {
    fetch("/users/" + localStorage.getItem("currentUser"), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("tokenKey"),
      },
      body: JSON.stringify({ avatar: selectedValue }),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    saveAvatar();
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div>
      <Card sx={{ maxWidth: 345, margin: 20 }}>
        <CardMedia
          component="img"
          alt="User Avatar"
          image={`/avatars/avatar${selectedValue}.png`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Username
          </Typography>
          <Typography variant="body2" color="text.secondary">
            user info
          </Typography>
        </CardContent>
        <Button size="small" color="primary" onClick={handleOpen}>
          Change Avatar
        </Button>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <List
            dense
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {[0, 1, 2, 3, 4, 5, 6].map((key) => {
              const labelId = `checkbox-list-secondary-label-${key}`;
              return (
                <ListItem key={key}>
                  <CardMedia
                    style={{ maxWidth: 100 }}
                    component="img"
                    alt={`Avatar n°${key}`}
                    image={`/avatars/avatar${key}.png`}
                    title="User Avatar"
                  />
                  <ListItemSecondaryAction>
                    <Radio
                      edge="end"
                      value={key}
                      onChange={handleChange}
                      checked={"" + selectedValue === "" + key}
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Modal>
    </div>
  );
}

export default Avatar;
