import './App.css';
import { useState } from 'react';
import axios from "axios"
import { useEffect } from 'react';

function App() {

  const [profile, newProfile] = useState([{ 'name': "", 'birthday': '' }])
  const [removeFirst, newRemove] = useState(false)

  function getDocHeight() {
    var D = document;
    return Math.max(
      D.body.scrollHeight, D.documentElement.scrollHeight,
      D.body.offsetHeight, D.documentElement.offsetHeight,
      D.body.clientHeight, D.documentElement.clientHeight
    );
  }

  window.onscroll = function (ev) {
    if ((window.innerHeight + window.scrollY) >= getDocHeight()) {
      // you're at the bottom of the page
      console.log("Bottom of page");
      getinfo()
    }
  };

  useEffect(() => {
    getinfo()
  }, [])


  function getinfo() {

    if (removeFirst === false) {
      newProfile(nice => nice.filter((img, i) => i !== 0));
      newRemove(true)
    }

    document.getElementById('profilez').style.display = 'grid'

    axios.get('https://randomuser.me/api/?results=5')

      .then(function (response) {
        window.removeEventListener('scroll', function () {
          console.log('nice')
        })
        for (let x = 0; x < 5; x++) {
          var name = (response.data.results[x].name.first)
          var lastname = (response.data.results[x].name.last)
          var gender = (response.data.results[x].gender)
          newProfile(profile => [...profile, { 'name': name + " " + lastname, 'birthday': gender }]);
        }
      })
  }



  return (
    <div className="App">

      <div id='profilez' className='profiles'>
        {profile.map((name, index) => (
          <button key={index}>{name.name} : {name.birthday}</button>
        ))}
      </div>
    </div>
  );
}

export default App;
