import React from "react";

class UserData extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="main">
        <ol>
          {/* <H3> Fuel Quote History </H3> */}
          {this.props.data.map((item) => (
            <div className="user5">
              <li>
                <div className="user">No. of Gallons: {item.gallons}</div>
                <div className="user">Request date: {item.dated}</div>
                <div className="user">
                  Suggested Price: {item.suggestedPrice}
                </div>
                <div className="user">Suggested Price: {item.userAddress}</div>
                <div className="user">Actual Price: {item.actualPrice}</div>
              </li>
            </div>
          ))}
        </ol>
      </div>
    );
  }
}

export default UserData;
