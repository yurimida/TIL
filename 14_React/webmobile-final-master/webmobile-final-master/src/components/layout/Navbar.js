import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import LoginPage from '../auth/LoginPage'
import { signIn , signOut , signUp } from '../../store/actions/AuthActions'
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));
const Navbar = (props) => {
  const { auth, profile , user ,  signOut } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  function handleProfileMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  }
  function handleMobileMenuClose() {
    setMobileMoreAnchorEl(null);
  }
  function handleMenuClose() {
    setAnchorEl(null);
    handleMobileMenuClose();
  }
  function handleMobileMenuOpen(event) {
    setMobileMoreAnchorEl(event.currentTarget);
  }
  const menuId = 'primary-search-account-menu';
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const NotLogin = (
    <div className={classes.sectionDesktop}>
      <Link to='/projectList' style={{ color: "white" , marginTop:"2.5%" }}>
          <p>Project </p>
       </Link>&nbsp;&nbsp;
      <Link to='/postList' style={{ color: "white",  marginTop:"2.5%" }}>
          <p>Post </p>
       </Link>&nbsp;&nbsp;
      <div style={{marginTop:'2%'}}>
      <LoginPage />
      </div>
    </div>
  );
  const UserMenu = (
    <div className={classes.sectionDesktop}>
      <Link to='/projectList' style={{ color: "white" ,   marginTop:"2.5%" }}>
          <p>Project </p>
       </Link>&nbsp;&nbsp;
      <Link to='/postList' style={{ color: "white",  marginTop:"2.5%" }}>
          <p>Post </p>
       </Link>&nbsp;&nbsp;
      <Link to='/mypage' style={{ color: "white",  marginTop:"2.5%"}}>
          <p>MyPage </p>
       </Link>&nbsp;&nbsp;
      <Link to='/' onClick={signOut} style={{ color: "white", paddingRight:"15%", marginTop:"2.5%"}}>
          <p>LogOut </p>
       </Link>&nbsp;&nbsp;
    </div>
  );
  const AdminMenu = (
    <div className={classes.sectionDesktop}>
      <Link to='/projectList' style={{ color: "white" ,   marginTop:"2.5%" }}>
          <p>Project </p>
       </Link>&nbsp;&nbsp;
      <Link to='/postList' style={{ color: "white",  marginTop:"2.5%" }}>
          <p>Post </p>
       </Link>&nbsp;&nbsp;
      <Link to='/mypage' style={{ color: "white",  marginTop:"2.5%"}}>
          <p>MyPage </p>
       </Link>&nbsp;&nbsp;
      <Link to='/admin' style={{ color: "white",  marginTop:"2.5%"}}>
          <p>Admin</p>
       </Link>&nbsp;&nbsp;
      <Link to='/' onClick={signOut} style={{ color: "white", paddingRight:"15%", marginTop:"2.5%"}}>
          <p>LogOut </p>
       </Link>&nbsp;&nbsp;
    </div>
  );
  const NotLoginMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <Link to='/projectList' onClick={handleMobileMenuClose.bind(this)} style={{color: "rgb(66, 66, 66)"}} >
            <p style={{margin:"10px"}}>Project</p>
         </Link>&nbsp;&nbsp;
        <Link to='/postList' onClick={handleMobileMenuClose.bind(this)} style={{color: "rgb(66, 66, 66)"}}>
            <p style={{margin:"10px"}}>Post</p>
         </Link>&nbsp;&nbsp;
          Login
        <div style={{marginTop:'2%', marginRight:'20px'}} value="login">
          <LoginPage />
          </div>
      </Menu>
  );
  const UserMenuMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <Link to='/projectList' onClick={handleMobileMenuClose.bind(this)} style={{color: "rgb(66, 66, 66)"}} >
            <p style={{margin:"10px"}}>Project</p>
         </Link>&nbsp;&nbsp;
        <Link to='/postList' onClick={handleMobileMenuClose.bind(this)} style={{color: "rgb(66, 66, 66)"}}>
            <p style={{margin:"10px"}}>Post</p>
         </Link>&nbsp;&nbsp;
        <Link to='/mypage' onClick={handleMobileMenuClose.bind(this)} style={{color: "rgb(66, 66, 66)"}}>
            <p style={{margin:"10px"}}>MyPage</p>
         </Link>&nbsp;&nbsp;
        <Link to='/' onClick={handleMobileMenuClose.bind(this)} style={{color: "rgb(66, 66, 66)"}}>
            <p style={{margin:"10px"}}>LogOut</p>
         </Link>&nbsp;&nbsp;
      </Menu>
  );
  const AdminMenuMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <Link to='/projectList' onClick={handleMobileMenuClose.bind(this)} style={{color: "rgb(66, 66, 66)"}} >
            <p style={{margin:"10px"}}>Project</p>
         </Link>&nbsp;&nbsp;
        <Link to='/postList' onClick={handleMobileMenuClose.bind(this)} style={{color: "rgb(66, 66, 66)"}}>
            <p style={{margin:"10px"}}>Post</p>
         </Link>&nbsp;&nbsp;
        <Link to='/admin' onClick={handleMobileMenuClose.bind(this)} style={{color: "rgb(66, 66, 66)"}}>
            <p style={{margin:"10px"}}>Admin</p>
         </Link>&nbsp;&nbsp;
        <Link to='/' onClick={handleMobileMenuClose.bind(this)} style={{color: "rgb(66, 66, 66)"}}>
            <p style={{margin:"10px"}}>LogOut</p>
         </Link>&nbsp;&nbsp;
      </Menu>
  );
  if(user){
    if(user.grade ==="normal"){
      return (
        <div className={classes.grow}>
          <AppBar position="static">
            <Toolbar style={{ backgroundColor: "#424242" }}>
              <Link to='/'><i className="nes-logo" style={{ marginRight:'10px', marginBottom:'2px'}}></i> </Link>&nbsp;
              <Link to='/main' style={{ color: "white", marginTop:'5px' }}>MarioPlan </Link>&nbsp;&nbsp;
              <div className={classes.grow} />
              {UserMenu}
              <div className={classes.sectionMobile}>
                <IconButton
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
          {UserMenuMobileMenu}
        </div>
      )
  }
  else if(user.grade ==="admin"){
    return (
      <div className={classes.grow}>
        <AppBar position="static">
          <Toolbar style={{ backgroundColor: "#424242" }}>
            <Link to='/'><i className="nes-logo" style={{ marginRight:'10px', marginBottom:'2px'}}></i> </Link>&nbsp;
            <Link to='/main' style={{ color: "white" }}>MarioPlan </Link>&nbsp;&nbsp;
            <div className={classes.grow} />
            {AdminMenu}
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {AdminMenuMobileMenu}
      </div>
    )
  }
  }
  else{
    return (
      <div className={classes.grow}>
        <AppBar position="static">
          <Toolbar style={{ backgroundColor: "#424242" }}>
            <Link to='/'><i className="nes-logo" style={{ marginRight:'10px', marginBottom:'2px'}}></i> </Link>&nbsp;
            <Link to='/main' style={{ color: "white" }}>MarioPlan </Link>&nbsp;&nbsp;
            <div className={classes.grow} />
            {NotLogin}
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {NotLoginMobileMenu}
      </div>
    )
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (credentials) => dispatch(signIn(credentials)),
    signOut : () => dispatch(signOut()),
    signUp : (newUser) => dispatch(signUp(newUser)),
  };
};
const mapStateToProps = (state) => {
  const auth = state.firebase.auth;
  const uid = state.firebase.auth.uid;
  const users = state.firestore.data.users;
  const user = users ? users[uid] : null;
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    user: user,
  }
}
export default compose(
  connect(mapStateToProps , mapDispatchToProps),
  firestoreConnect([
    { collection: 'users', },
  ]),
)(Navbar)