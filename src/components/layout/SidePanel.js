import React from 'react';
import { 
  Drawer, 
  IconButton,
  ListItemButton,
  ListItemText,
  List, 
  ListItemIcon,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { useNavigate } from 'react-router-dom';

export default function SidePanel() {
  const [state, setState] = React.useState(false);
  const navigate = useNavigate();
  const itemsList = [
    {
      text: "Customers",
      icon: <PersonIcon />,
      onClick: () => navigate("/customers")
    },
    {
      text: "Trainings",
      icon: <FitnessCenterIcon />,
      onClick: () => navigate("/trainings")
    }
  ];

  return (
    <div>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={() => setState(true)}>
        <MenuIcon />
      </IconButton>
      <Drawer
        open={state}
        onClose={() => setState(false)}
        >
        <List>
          {itemsList.map((item , index) => {
            const {text, icon, onClick } = item;
            return (
              <ListItemButton key={text} onClick={onClick} sx={{ width: 200 }}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            );
          })}
        </List>
      </Drawer>
    </div>
  );
};