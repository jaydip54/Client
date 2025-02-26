import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  Button,
} from "@mui/material";
import {
  Dashboard,
  AccountCircle,
  Brightness4,
  Brightness7,
  Menu,
  Close,
  ExitToApp,
  Lock,
  LocationCity,
  Map,
  People,
  Category,
  History,
  Email,
  Feedback,
  LocalShipping,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { clearProfile } from "../../redux/slices/profileSlice";
import PinDropIcon from '@mui/icons-material/PinDrop';
const AdminSidebar = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  let navigate = useNavigate();
  let dispatch = useDispatch();

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const handleLogout = () => {
    dispatch(clearProfile());
    dispatch(logout());
    navigate("/");
  };

  const sidebarContent = (
    <Box
      sx={{
        width: "240px",
        height: "100vh", // Full viewport height
        backgroundColor: darkMode ? "#1f2937" : "#ffffff",
        color: darkMode ? "white" : "black",
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
        alignItems: "center",
        transition: "background-color 0.3s ease",
        overflowY: "auto", // Enable vertical scrolling
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <h1>ADMIN</h1>
        <h2>Dashboard</h2>
      </div>

      {/* Sidebar List with Scrollable Content */}
      <List sx={{ width: "100%", flexGrow: 1 }}>
        <ListItem component={Link} to="/dashboard" onClick={toggleSidebar}>
          <ListItemIcon>
            <Dashboard sx={{ color: darkMode ? "white" : "black" }} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        <ListItem component={Link} to="/citymangement" onClick={toggleSidebar}>
          <ListItemIcon>
            <LocationCity sx={{ color: darkMode ? "white" : "black" }} />
          </ListItemIcon>
          <ListItemText primary="City Management" />
        </ListItem>

        <ListItem component={Link} to="/areamanagement" onClick={toggleSidebar}>
          <ListItemIcon>
            <Map sx={{ color: darkMode ? "white" : "black" }} />
          </ListItemIcon>
          <ListItemText primary="Area Management" />
        </ListItem>

        <ListItem component={Link} to="/usermanagement" onClick={toggleSidebar}>
          <ListItemIcon>
            <People sx={{ color: darkMode ? "white" : "black" }} />
          </ListItemIcon>
          <ListItemText primary="User Management" />
        </ListItem>

        <ListItem component={Link} to="/categorymanage" onClick={toggleSidebar}>
          <ListItemIcon>
            <Category sx={{ color: darkMode ? "white" : "black" }} />
          </ListItemIcon>
          <ListItemText primary="Category Management" />
        </ListItem>
        <ListItem component={Link} to="/packages" onClick={toggleSidebar}>
          <ListItemIcon>
            <LocalShipping sx={{ color: darkMode ? 'white' : 'black' }} />
          </ListItemIcon>
          <ListItemText primary="Packages" />
        </ListItem>
        <ListItem component={Link} to="/loginhistory" onClick={toggleSidebar}>
          <ListItemIcon>
            <History sx={{ color: darkMode ? "white" : "black" }} />
          </ListItemIcon>
          <ListItemText primary="Login History" />
        </ListItem>
        <ListItem component={Link} to="/parkingspacemanage" onClick={toggleSidebar}>
          <ListItemIcon>
            <PinDropIcon sx={{ color: darkMode ? 'white' : 'black' }} />
          </ListItemIcon>
          <ListItemText primary="Parking Space Manage" />
        </ListItem>

        <ListItem component={Link} to="/history" onClick={toggleSidebar}>
          <ListItemIcon>
            <History sx={{ color: darkMode ? "white" : "black" }} />
          </ListItemIcon>
          <ListItemText primary="Personal Login History" />
        </ListItem>

        <ListItem component={Link} to="/managesubscri" onClick={toggleSidebar}>
          <ListItemIcon>
            <Email sx={{ color: darkMode ? "white" : "black" }} />
          </ListItemIcon>
          <ListItemText primary="Manage Email Subscriptions" />
        </ListItem>

        <ListItem component={Link} to="/managefeedback" onClick={toggleSidebar}>
          <ListItemIcon>
            <Feedback sx={{ color: darkMode ? "white" : "black" }} />
          </ListItemIcon>
          <ListItemText primary="Manage Feedback" />
        </ListItem>

        <ListItem component={Link} to="admin/changepassword" onClick={toggleSidebar}>
          <ListItemIcon>
            <Lock sx={{ color: darkMode ? "white" : "black" }} />
          </ListItemIcon>
          <ListItemText primary="Change Password" />
        </ListItem>
      </List>

      {/* Logout Button */}
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 2 }}>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<ExitToApp />}
          onClick={handleLogout}
          sx={{
            backgroundColor: darkMode ? "#f44336" : "#d32f2f",
            color: "white",
            "&:hover": {
              backgroundColor: darkMode ? "#d32f2f" : "#c62828",
            },
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Top Navbar */}
      <nav
        style={{
          backgroundColor: darkMode ? "#1f2937" : "#ffffff",
          padding: "1rem",
          position: "fixed",
          width: "100%",
          zIndex: 100,
          color: darkMode ? "white" : "black",
          transition: "background-color 0.3s ease",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Menu Icon */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              onClick={toggleSidebar}
              style={{
                cursor: "pointer",
                marginRight: "1rem",
                transition: "transform 0.3s ease",
              }}
            >
              {isSidebarVisible ? (
                <Close style={{ fontSize: 24, transform: "rotate(180deg)" }} />
              ) : (
                <Menu style={{ fontSize: 24 }} />
              )}
            </div>
          </div>

          {/* Profile & Theme Toggle */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link
              to="/profile"
              style={{
                color: darkMode ? "white" : "black",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                marginRight: "1rem",
                transition: "opacity 0.3s ease",
              }}
            >
              <AccountCircle style={{ fontSize: 24 }} />
            </Link>
            <div onClick={toggleTheme} style={{ cursor: "pointer" }}>
              {darkMode ? (
                <Brightness7 style={{ fontSize: 24, color: "white" }} />
              ) : (
                <Brightness4 style={{ fontSize: 24 }} />
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar Drawer */}
      <Drawer anchor="left" open={isSidebarVisible} onClose={toggleSidebar}>
        {sidebarContent}
      </Drawer>

      {/* Page Content */}
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default AdminSidebar;
