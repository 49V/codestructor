import React, {Component} from 'react';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3001/admin/v1/users.json')
    .then(response => {
      this.setState({
        users: response.data,
      })
    })
    .catch(error => console.log(error))
  }

  render() {
    return (
      <div className="lists-container">
      </div>
);
  }
}
export default App;
