import React, { Component } from "react";
import { Card } from "antd";
import { graphql } from "react-apollo";
// import { TEST } from "./queries";
import { Container } from "./style";

class Home extends Component {
  render() {
    // console.log(this.props);

    // const {
    //   data: { loading, error }
    // } = this.props;

    // if (loading) {
    //   return <div>Loading...</div>;
    // }
    // if (error) {
    //   return <div>Error!!</div>;
    // }
    return (
      <Container>
        <Card>
          <div>Hello</div>
        </Card>
      </Container>
    );
  }
}

// export default graphql(TEST)(Home);
export default Home;
