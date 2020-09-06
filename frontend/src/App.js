import React, {useState} from 'react';
import './App.css';
import google from 'google'

function App() {

  const [input, setInput] = useState('')
  const [val, setVal] = useState('')
  const [ret, setRet] = useState('')
  google.protocol = 'https'
  const clickHandler = (event) => {
    event.preventDefault()

    google.resultsPerPage = 25
    var nextCounter = 0

    google('node.js best practices', function (err, res){
      if (err) console.error(err)

      for (var i = 0; i < res.links.length; ++i) {
        var link = res.links[i];
        console.log(link.title + ' - ' + link.href)
        console.log(link.description + "\n")
      }

      if (nextCounter < 4) {
        nextCounter += 1
        if (res.next) res.next()
      }
    })
  }

  const inputHandler = (event) => {
    setInput(event.target.value)
  }



  return (
    <div>
      <form>
        <input type="text" name='test' onChange={inputHandler}></input>
        <input type='Submit' onClick={clickHandler}></input>
      </form>
    </div>
  );
}

export default App;
