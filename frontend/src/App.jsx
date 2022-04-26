import React from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

require('dotenv').config()

function getRandomQuestion() {
  return axios
    .get("/api/questions/get_random_question/")
    .catch((err) => console.log(err));
}

function getAnswers(question_id){
  return axios
      .get("/api/questions/" + question_id + "/get_answers/")
      .catch((err) => console.log(err));
}

class App extends React.Component {
  
  constructor(props){
    super(props);
  }

  componentDidMount() {
    
  }
  render() {
    return (
        <main className='App'>
          <h1> Karmagarden </h1>
            <Question  />
        </main>
      );
  }
}

class Question extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      post_title: '',
      post_text: '',
      id: 0,
      answers:[]
    };
  }

  componentDidMount() {
    getRandomQuestion().then((question_response) => {
      this.setState(question_response.data);
       getAnswers(question_response.data.id)
        .then((answer_response) => this.setState({answers: answer_response.data}));
    });
 
  }

  onDragEnd = result => {
    const {destination, source, draggableId} = result;

    if(!destination) {
      return;
    }

    if(destination.droppableID === source.droppableId &&
      destination.index === source.index){
        return;
    }
    let newAnswers = [...this.state.answers];
    let movedAnswer = this.state.answers[source.index];
    newAnswers.splice(source.index,1);
    newAnswers.splice(destination.index, 0, movedAnswer);
    this.setState({answers: newAnswers})
  };

  render() {
    let answerComponents = this.state.answers.map(
      (ans, index) =>  (
        <Draggable key={index} draggableId={index.toString()} index={index} >  
          {(provided) => (
          <li className="answer-box"
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}>
              {ans.answer_text}
          </li>
          )}
        </Draggable>));
    return (
    <div className='question-container'>
      <DragDropContext onDragEnd = {this.onDragEnd} >
        <h3> {this.state.post_title} </h3>
        <div className='post-text'>
          {this.state.post_text}
        </div>
          <Droppable droppableId="256" >
            { (provided) => (
              <ul className='answer-list' ref={provided.innerRef} {...provided.droppableProps} >
                {answerComponents}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
    </div>
    );
  }
}

// class Answer extends React.Component {
//   render() {
//     return (<li className='answer-box' ref={this.props.innerRef}>
//               {this.props.answer_text}
//             </li>
//     );
//   }
// }

export default App;
