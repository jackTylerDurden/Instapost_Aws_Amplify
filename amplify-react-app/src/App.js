import React, { useState, useEffect } from 'react'
import { API } from 'aws-amplify'
import './App.css';

function App() {
  const [serviceCalls, updateServiceCalls] = useState(0)
  const [nicknames, updateNicknames] = useState([])
  const [hashtags, updateHashtags] = useState([])

  async function fetchServiceCalls(){
    const data = await API.get('instapostapi','/service-calls')    
    updateServiceCalls(data.serviceCalls)
  }
  async function fetchNicknames(){
    const data = await API.get('instapostapi','/nicknames')    
    updateNicknames(data.nicknames)    
  }
  async function fetchHashtags(){
    const data = await API.get('instapostapi','/hashtags')    
    updateHashtags(data.hashtags)    
  }
  useEffect(() => {
    fetchServiceCalls()
    fetchNicknames()
    fetchHashtags()
  }, [])
  return (
    <div className="App">
      <h2>Instapost</h2>
      <div>
        Service calls - {serviceCalls}
      </div>
      <div>
        <h3>Nicknames</h3>
        {
          nicknames.map((item) =>             
            <h5 key={item}>{item}</h5>
          )
        }
        <br/>
        <h3>Hashtags</h3>
        {
          hashtags.map((item) => 
            <h5 key={item}>{item}</h5>
          )
        }
      </div>   
      <br/>         
    </div>
  );
}

export default App;
