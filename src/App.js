import "./App.css";
import React from "react";
import axios from "axios";
import { TextGenerateEffect } from "./components/ui/text-generate-effect";
import Container from '@mui/material/Container';

class App extends React.Component {
  state = {
    advice: "",
    loading: false,
    error: null,
  };

  componentDidMount() {
    this.fetchadvice();
  }

  fetchadvice = () => {
    this.setState({ loading: true, error: null });
    axios
      .get("https://api.adviceslip.com/advice")
      .then((response) => {
        const { advice } = response.data.slip;
        this.setState({ advice, loading: false });
      })
      .catch((error) => {
        this.setState({ error: "Failed to fetch advice.", loading: false });
      });
  };

  render() {
    const { advice, loading, error } = this.state;

    return (
      <Container>
        <div className="card">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <TextGenerateEffect words={advice} />
          )}
        </div>
        <button className="button" onClick={this.fetchadvice}>
          Get Advice
        </button>
        </Container>
      
    );
  }
}

export default App;
