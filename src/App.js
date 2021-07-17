import React, { useState, useEffect } from 'react';
import axios from 'axios';
import css from './module.css'
import clsx from 'clsx';
import { AiOutlineArrowLeft, AiOutlineArrowRight} from "react-icons/ai";
import { withStyles, makeStyles,useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { IconButton, Box, MenuItem, Select, Grid } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import TableChartIcon from '@material-ui/icons/TableChart';
const drawerWidth = 240;


const useStyles = makeStyles((theme) => ({
  parent: {
    margin: '1%'
  },
  box: {
    display: 'flex',
  },
  icon: {
    color: theme.palette.common.black
  },
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    maxWidth: '100%'
  },
  hello: {
    display: 'flex',
    justifyContent: 'flex-end',
    '& > *': {
      margin: theme.spacing(1),
    }

  }
}))


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const App = () => {

  const classes = useStyles()
  const [ apiData, setApiData] = React.useState([]);
  const [ pageInput, setPageInput] = React.useState(1)
  const [ pageCount, setPageCount] = React.useState(0)
  const [ currentPage, setCurrentPage] = React.useState(1)
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };



  const fetchApiData = (pageNumber) => {
    let url = `https://api.github.com/users/facebook/repos?per_page=10&page=${pageNumber}`;

    axios.get( url )
      .then(response => {

          if (response.status == 200) {
            console.log(response.data)
            setApiData(response.data) 
          }

      })
      .catch(err => {
          console.log(err.message)
      });

  }

  React.useEffect(() => {
    
    // NOTE : Use headers to check the last page number and check in the link with rel='last'
    // curl -I https://api.github.com/users/facebook/repos?per_page=10 
    setPageCount(12) 

    fetchApiData(1)


  },[])


  const handleLeftArrow = () => {

    fetchApiData(currentPage-1)
    setCurrentPage(currentPage-1)
  }
  
  const handleRightArrow = ()=> {

    fetchApiData(currentPage+1)
    setCurrentPage(currentPage+1)
  }

  const handlePageInput = (e) => {
    fetchApiData(e.target.value)
    setCurrentPage(e.target.value)
  }


  return (
    <div className={classes.parent}>
      <div className={classes.root}>
        <CssBaseline />
        
        {/* Menu bar */}
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Facebook github repositories
            </Typography>
          </Toolbar>
        </AppBar>


        {/* Navigation bar drawer */}
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />

          <List>
              <ListItem button key='Table'>
                <ListItemIcon><TableChartIcon></TableChartIcon></ListItemIcon>
                <ListItemText primary='Table' />
              </ListItem>
          </List>
      
      </Drawer>



      {/* Table */}
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell >Owner type</StyledTableCell>
              <StyledTableCell >Watchers</StyledTableCell>
              <StyledTableCell >Download URL</StyledTableCell>
            </TableRow>
            </TableHead>

            <TableBody>
              {apiData.map((val) => (
                <StyledTableRow>
                  <StyledTableCell>{val.name}</StyledTableCell>
                  <StyledTableCell>{val.description}</StyledTableCell>
                  <StyledTableCell>{val.owner.type}</StyledTableCell>
                  <StyledTableCell>{val.watchers}</StyledTableCell>
                  <StyledTableCell>{val.downloads_url}</StyledTableCell>
                </StyledTableRow>
                
              ))}
            </TableBody>

          </Table>  
        </TableContainer>



        {/* table footer pagination */}
        <Box display='flex' flexDirection='row' className={classes.hello}>
          <Typography variant="body2">rows per page: 10</Typography>
          
          <Typography variant="body2">Current page: </Typography>
          
          <select 
            onChange={(e) => handlePageInput(e)}
            defaultValue={1}
            id='select1'
            value={currentPage}
          >
            {Array.from(Array(pageCount), (e, i) => {
              return <option value={i+1}>{i+1}</option>
            })}
          </select>
                  
          <IconButton 
            id='button1' 
            onClick={handleLeftArrow}
            disabled={currentPage == 1 ? true : false}
          >
            <AiOutlineArrowLeft className={classes.icon}/>
          </IconButton> 

          <IconButton 
            id='button2' 
            onClick={handleRightArrow}
            disabled={currentPage == 12 ? true : false}
          >
            <AiOutlineArrowRight className={classes.icon}/>
          </IconButton>
        </Box>

  
      </main>
    </div>

  </div>
  );
}

export default App;
