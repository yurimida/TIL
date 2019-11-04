import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import firebase from 'firebase';
import './admin.css';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Redirect } from 'react-router-dom';

class Admin extends Component {
  handleChange = (e) => {
    const firestore = firebase.firestore();
    const grade = e.target.value;
    const uid = e.target.name;
    firestore
      .collection('users')
      .doc(uid)
      .update({
        grade: grade,
      });
    };
  handleSubmit = (e) => {
      e.preventDefault();
      this.props.gradeChange(this.state)
    };
  render() {
    const { auth, users } = this.props;
    if (auth.grade !== 'admin') return <Redirect to='/' />;
    return (
      <div className="card admin-list section">
        <table class="centered highlight">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Grade</th>
              <th>Check</th>
            </tr>
          </thead>
          {users &&
            users.map(user => {
              return (
                <tbody>
                  <tr>
                    <td>
                      {user.firstName}
                      {user.lastName}
                    </td>
                    <td>{user.email}</td>
                    <td>{user.grade}</td>
                    <td>
                      <Select
                        value={user.grade}
                        onChange={this.handleChange}
                        inputProps={{
                          name: user.uid,
                        }}>
                        <MenuItem value="admin">admin</MenuItem>
                        <MenuItem value="team">team</MenuItem>
                        <MenuItem value="normal">normal</MenuItem>
                      </Select>
                      <span />
                    </td>
                  </tr>
                </tbody>
            );
          })}
        </table>
      </div>

    )
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.firebase.profile,
    notifications: state.firestore.ordered.notifications,
    users: state.firestore.ordered.users,
  }
}
export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'users', },
    { collection: 'notifications', limit: 3, orderBy: ['time', 'desc'] },
    { collection: 'posts'},
    { collection: 'projects'},
    
  ])
)(Admin)
