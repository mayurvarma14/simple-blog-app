import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Layout, Icon } from "antd";
import "./App.css";
import { Home } from "./Home";

const { Header, Content } = Layout;

const NotFound = () => {
  return <div>404 page not found!</div>;
};

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Layout>
            <Header className="header">
              <div>
                <Icon type="setting" theme="filled" />
                Simple Blog App
              </div>
            </Header>
            <Content className="content">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route component={NotFound} />
              </Switch>
            </Content>
            {/* <Footer className="footer">Footer</Footer> */}
          </Layout>
        </div>
      </Router>
    );
  }
}

export default App;
