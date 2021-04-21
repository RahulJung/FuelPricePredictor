import React from "react";
import DatePicker from "react-datepicker";
import UserData from "./UserData.jsx";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/styles.css";
import Axios from "axios";
import Login from "./Login.jsx";
class FuelPriceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gallons: 0,
      date: "",
      suggestedPrice: 0,
      actualPrice: 0,
      data: [],
      isLoggedin: true,
    };
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getPrice = this.getPrice.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.addPrice = this.addPrice.bind(this);
    this.getQuote = this.getQuote.bind(this);
  }

  componentDidMount() {
    this.getQuote(this.props.id);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleDateChange(date) {
    this.setState({
      date: date,
    });
  }

  getPrice() {
    const currPrice = 1.5;
    let locationFactor;
    let rateHistory;
    let gallons = 0;
    const profit = 0.1;
    this.props.data[0].st === "TX"
      ? (locationFactor = 0.02)
      : (locationFactor = 0.04);
    this.state.gallons >= 1000 ? (gallons = 0.02) : (gallons = 0.03);
    this.props.data.length >= 1 ? (rateHistory = 0.001) : (rateHistory = 0);
    let margin = currPrice * (locationFactor - rateHistory + gallons + profit);
    let suggestedPrice = currPrice + margin;
    let actualPrice = this.state.gallons * suggestedPrice;
    return [suggestedPrice, actualPrice];
  }

  handleClick(e) {
    e.preventDefault();
    let price = this.getPrice();
    this.setState({
      suggestedPrice: price[0],
      actualPrice: price[1],
    });
  }
  getQuote(id = this.props.id) {
    Axios.get(`/getQuote/${id}`)
      .then((res) => {
        this.setState({
          data: res.data,
        });
      })
      .catch((err) => {
        console.log("Error getting data in getQuote");
      });
  }

  addPrice(e) {
    e.preventDefault();
    let add = String(
      this.props.data[0].add1 +
        " " +
        this.props.data[0].add2 +
        " " +
        this.props.data[0].city +
        " " +
        this.props.data[0].st +
        " " +
        this.props.data[0].zip
    );
    let date = String(this.state.date);
    Axios.post("/addPrice", {
      fullname: this.props.data[0].fullname,
      userAddress: add,
      suggestedPrice: this.state.suggestedPrice,
      actualPrice: this.state.actualPrice,
      date: date.split(" ").slice(0, 4).join(" "),
      gallons: this.state.gallons,
      userId: this.props.id,
    })
      // .then((res) => {
      //   this.setState({
      //     gallons: 0,
      //     date: "",
      //     suggestedPrice: 0,
      //     actualPrice: 0,
      //   });
      // })
      .then((res) => {
        console.log("Posted user price quote", res.data);
        this.getQuote(this.props.id);
      })
      .catch((err) => {
        console.log("Error Posting dataa in addprice");
      });
  }

  render() {
    console.log("this is date", this.state.date);
    if (this.state.isLoggedin) {
      return (
        <div>
          <div className="form2">
            <form onSubmit={this.addPrice}>
              <div className="user">
                <label>Number of Gallons Requested</label>
                <input
                  type="number"
                  name="gallons"
                  placeholder="Enter Number of Gallons."
                  value={this.state.gallons}
                  onChange={this.handleChange}
                  required
                ></input>
              </div>
              <div className="user">
                <label>Address1</label>
                <input
                  type="text"
                  defaultValue={this.props.data[0].add1}
                  required={true}
                  readOnly={true}
                />
              </div>
              <div className="user">
                <label>Address2</label>
                <input
                  type="text"
                  defaultValue={this.props.data[0].add2}
                  required={true}
                  readOnly={true}
                />
              </div>
              <div className="user">
                <label>City</label>
                <input
                  type="text"
                  defaultValue={this.props.data[0].city}
                  required={true}
                  readOnly={true}
                />
              </div>
              <div className="user">
                <label>State</label>
                <input
                  type="text"
                  defaultValue={this.props.data[0].st}
                  required={true}
                  readOnly={true}
                />
              </div>
              <div className="user">
                <label>Zip</label>
                <input
                  type="text"
                  defaultValue={this.props.data[0].zip}
                  required={true}
                  readOnly={true}
                />
              </div>
              <div className="user">
                <label>Select date</label>
                <DatePicker
                  selected={this.state.date}
                  onChange={this.handleDateChange}
                  name="startDate"
                  format="MM/dd/yyyy"
                  value={this.state.date}
                  placeholderText="Select Delivery Date"
                  required
                />
              </div>

              <div className="user">
                <label>Suggested Price : {this.state.suggestedPrice}</label>
              </div>
              <div className="user">
                <label>Total Amount : {this.state.actualPrice} </label>
              </div>
              <div>
                <button
                  className="back"
                  type="submit"
                  onClick={this.handleClick}
                >
                  Get Price{" "}
                </button>
              </div>
              <button className="reviewBtn"> Submit </button>
              <button
                className="back"
                onClick={() => {
                  this.setState({ isLoggedin: false });
                }}
              >
                Logout
              </button>
            </form>
          </div>
          <UserData data={this.state.data} />
        </div>
      );
    } else {
      return (
        <div className="main">
          <Login />
        </div>
      );
    }
  }
}

export default FuelPriceForm;
