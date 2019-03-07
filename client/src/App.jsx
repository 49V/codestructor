import React, {Component} from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import axios from 'axios';

import CoursesNew     from  './Pages/Courses/Create.jsx'
import CoursesIndex   from  './Pages/Courses/Index.jsx';
import CoursesShow    from  './Pages/Courses/Show.jsx';
import CoursesUpdate  from  './Pages/Courses/Update.jsx'
import ProblemsNew    from  './Pages/Problems/Create.jsx';
import ProblemsShow   from  './Pages/Problems/Show.jsx';
import ProblemsUpdate from  './Pages/Problems/Update.jsx';

// import route Components here
import {
  Route,
  Link,
  Switch
} from 'react-router-dom'

const Home = () => (
  <div>
    <h2> Home </h2>
  </div>
);

class App extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  
  constructor(props) {
    super(props);
    const { cookies } = props;
    cookies.set('id', 3);
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:3001/admin/v1/users/${this.props.cookies.get('id')}.json`)
    .then(response => {
      this.setState({ user: response.data });
    })
    .catch(error => console.log(error))
  } 



  render() {
    return (
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/courses">Courses</Link></li>
        </ul>

        <button className='devHelper' onClick={ () => { 
            this.props.cookies.set('id', this.state.user.id === 3 ? 4 : 3)
            this.componentDidMount()
            }
          }> Logged in as: {(this.state.user.teacher ? 'Teacher' : 'Student')} </button>
        
        {/* All of our routes are defined here */}
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/courses" exact render={(props) => <CoursesIndex {...props} teacher={this.state.user.teacher} /> } />
          <Route path="/courses/new" exact render={ (props) => <CoursesNew {...props} teacher={this.state.user.teacher} /> } />
          <Route path="/courses/:id" exact render={ (props) => <CoursesShow {...props} teacher={this.state.user.teacher} /> } /> 
          <Route path="/courses/:id/edit" exact render={ (props) => <CoursesUpdate {...props} teacher={this.state.user.teacher} /> } />
          <Route path="/courses/:id/problems/new" exact render={ (props) => <ProblemsNew {...props} teacher={this.state.user.teacher} /> } /> 
          <Route path="/courses/:id/problems/:id" exact render={ (props) => <ProblemsShow {...props} teacher={this.state.user.teacher} /> } />
          <Route path="/courses/:id/problems/:id/edit" exact render={ (props) => <ProblemsUpdate {...props} teacher={this.state.user.teacher} /> } />
          <Route render={() => {return <h1>You just 404'd</h1>}} />
        </Switch>
      </div>
    );
  }
}
export default withCookies(App);
