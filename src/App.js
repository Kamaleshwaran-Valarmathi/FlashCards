import React, { useEffect, useRef, useState } from 'react'
import { QandA } from './QandA'
import { dummyQandA } from './QandA'
import { Topics } from './Topics'
import './App.css'

function App() {
  const [flashcards, setFlashCards] = useState([])
  const [topics, setTopics] = useState([])
  const [flashcardIdx, setFlashcardIdx] = useState(0)
  const [currentTopic, setCurrentTopic] = useState(1)
  const [shuffle, setShuffle] = useState(false)
  const [flip, setFlip] = useState(false)
  const topicEle = useRef()

  useEffect(() => {
    setTopics(Topics)
  }, [])

  useEffect(() => {
    setFlashCards(QandA)
  }, [])

  function randomShuffle(arr) {
    for (var i = arr.length-1; i >= 0; --i) {
      var j = Math.floor(Math.random() * i);
      var temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  }

  function handleSubmit(e) {
    e.preventDefault()
    var currentFlashcards = []
    QandA.forEach(flashcard => {
      if ((currentTopic == 1) || (flashcard.topicID == currentTopic))
        currentFlashcards.push(flashcard)
    })
    if (shuffle === true)
      currentFlashcards = randomShuffle(currentFlashcards)
    setFlashCards(currentFlashcards)
    setFlashcardIdx(0)
    setFlip(false)
  }

  function setCurrentTopicState(e) {
    e.preventDefault()
    setCurrentTopic(e.target.value)
  }

  function setShuffleState(e) {
    e.preventDefault()
    setShuffle(!shuffle)
  }

  function incFlashcardIdx(e) {
    e.preventDefault()
    setFlashcardIdx(flashcardIdx + ((flashcardIdx < (flashcards.length-1)) ? 1 : 0))
    setFlip(false)
  }

  function decFlashcardIdx(e) {
    e.preventDefault()
    setFlashcardIdx(flashcardIdx - ((flashcardIdx > 0) ? 1 : 0))
    setFlip(false)
  }

  return (
    <>
      <form className='header' onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='topic'><h6 style={{ margin:7 }}>Topic</h6></label>
          <select className='btn' id='topic' ref={topicEle} onChange={setCurrentTopicState}>
            {topics.map(topic => {
              return <option value={topic.id} key={topic.id}>{topic.topic}</option>
            })}
          </select>
        </div>
        <div className='form-group'>
          <button className={`btn ${shuffle ? 'on' : 'off'}`} onClick={setShuffleState}>Shuffle</button>
        </div>
        <div className='form-group'>
          <button className='btn'>Submit</button>
        </div>
      </form>

      <div className='container'>
        <div 
          className={`card ${flip ? 'flip' : ''}`}
          onClick={() => setFlip(!flip)}
        >
          <div className='front'>{((flashcards.length > 0) ? flashcards[flashcardIdx] : dummyQandA).question}</div>
          <div className='back'>{((flashcards.length > 0) ? flashcards[flashcardIdx] : dummyQandA).answer}</div>
        </div>
      </div>
      
      <div className='footer'>
        <button className='btn' onClick={decFlashcardIdx}>Prev</button>
        <button className='btn' onClick={incFlashcardIdx}>Next</button>
      </div>
    </>
  )
}

export default App;
