import React from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "../styles/styles.css";

class FuelPriceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gallons: 0,
      date: new Date(),
      suggestedPrice: 0,
      actualPrice: 0,
    };
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

  render() {
    console.log(this.state);
    return (
      <form className="form">
        <div>
          <label>Number of Gallons Requested?</label>
          <input
            type="number"
            name="gallons"
            placeholder="Enter Number of Gallons."
            onChange={this.handleChange}
          ></input>
        </div>

        <div>
          <label>Delivery Address</label>
          <input type="text" placeholder="Address comes from profile." />
        </div>

        <DatePicker
          selected={this.state.date}
          onChange={this.handleDateChange}
          name="startDate"
          dateFormat="MM/dd/yyyy"
          placeholderText="Select Delivery Date"
        />

        <div>
          <label>Suggested Price=</label>
        </div>
        <div>
          <label>Total Amount= </label>
        </div>

        <input type="submit" value="Get Price" />
      </form>
    );
  }
}

export default FuelPriceForm;
