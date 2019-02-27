import React, { Component } from 'react';
import './App.css';
import ReactMarkdown from "react-markdown";

class App extends Component {
  constructor() {
    super();
    this.state = { title: '', mkContent: '', direction:'horizontal' };
  }
  async componentWillMount() {
    const urlString = window.location.href ; //window.location.href
    const url = new URL(urlString);
    const getFile = url.searchParams.get("file");
    const contentJson = require(`./${getFile}`)
    this.setState({ title: contentJson[0].title, direction: contentJson[0].direction });
    const getContent = contentJson[0].content;
    // Get the contents from the Markdown file and put them in the React state, so we can reference it in render() below.
    const content = require(`./${getContent}`)
    fetch(content).then(res => res.text()).then(text => this.setState({ mkContent: text }));
  }
  render() {
    const { title, mkContent, direction } = this.state;
    if (direction === 'horizontal') {
      return <div className='test'>{title}<ReactMarkdown source={mkContent} /></div>;
    } else {
      return <div className='test1'>{title}<ReactMarkdown source={mkContent} /></div>;
    }
    
  }
}

export default App;
