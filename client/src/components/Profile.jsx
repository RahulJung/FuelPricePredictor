import React from "react";
import FuelPriceForm from "./FuelPriceForm.jsx";
import Usa_states from "./Usa_states.jsx";
import Axios from "axios";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
      isComplete: false,
      data: [],
    };
    this.handleClick = this.handleClick.bind(this);
    this.addUserData = this.addUserData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
  }

  componentDidMount() {
    this.getUserInfo(this.props.id);
  }

  getUserInfo(id = this.props.id) {
    Axios.get(`/userInfo/${id}`)
      .then((res) => {
        this.setState({
          data: res.data,
        });
      })
      .catch((err) => {
        console.log("Error getting dataa");
      });
  }
  handleClick() {
    this.setState({
      isComplete: true,
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  addUserData(e) {
    e.preventDefault();
    Axios.post("/profile", {
      name: this.state.name,
      address1: this.state.address1,
      address2: this.state.address2,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
      userId: this.props.id,
    })
      .then(() => {
        console.log("Data Posted");
      })
      .then(() => {
        this.handleClick();
      })
      .catch((err) => {
        console.log("Error posting profile");
      });
  }
  //function takes x and returns option tags with value attributue x
  // (x) => <option valu='x'>x</option>
  makeStateOption(_states) {
    return _states.map((_state) => {
      return <option value={_state}>{_state}</option>;
    });
  }

  render() {
    console.log("this is idererereasdasd", this.state.data);
    if (!this.state.isComplete && this.state.data.length <= 0) {
      return (
        <div>
          <form>
            <div className="profile_form">
              <div className="input_group container-flex">
                <label>Full name</label>
                <input
                  type="text"
                  name="name"
                  maxLength="50"
                  onChange={this.handleChange}
                  required
                />
              </div>

              <div className="input_group  container-flex">
                <label>Address1</label>
                <input
                  type="text"
                  name="address1"
                  maxLength="100"
                  onChange={this.handleChange}
                  required
                />
              </div>

              <div className="input_group container-flex">
                <label>Address2</label>
                <input
                  type="text"
                  name="address2"
                  maxLength="100"
                  onChange={this.handleChange}
                />
              </div>

              <div className="input_group container-flex">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  maxLength="100"
                  onChange={this.handleChange}
                  required
                />
              </div>

              <div className="input_group container-flex">
                <label>State</label>
                <select
                  name="state"
                  id=""
                  required
                  onChange={this.handleChange}
                >
                  <option>Select a state</option>
                  {/* define state options here */}

                  {this.makeStateOption(Usa_states)}
                </select>
              </div>

              {/* more additions go below here */}

              <div className="input_group container-flex">
                <label>Zipcode</label>
                <input
                  type="number"
                  name="zip"
                  id=""
                  minLength="5"
                  maxLength="9"
                  onChange={this.handleChange}
                  required
                />
              </div>

              <div className="input_group container-flex">
                <button value="submit" type="submit" onClick={this.addUserData}>
                  submit
                </button>
              </div>
            </div>
          </form>
          {/* inform */}
        </div>
      );
    } else {
      return (
        <div>
          <FuelPriceForm />
        </div>
      );
    }
  }
}

export default Profile;
