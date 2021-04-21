import React from "react";

class UserData extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {/* <H3> Fuel Quote History </H3> */}
        {this.props.data.map((item) => (
          <div>
            {item.fullname}
            Gallons: {item.gallons}
            Suggested Price: {item.suggestedPrice}
            {item.userAddress}
            <div>{item.dated}</div> {item.actualPrice}
          </div>
        ))}
      </div>
    );
  }
}

export default UserData;
