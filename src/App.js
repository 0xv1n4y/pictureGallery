import React,{useState} from 'react'
import Gallery from './Gallery'

import axios from "axios"
const apiKey ="636e1481b4f3c446d26b8eb6ebfe7127"





const App = () => {
  const[search,setSearch]=useState("")
  const[data,setData]=useState([])
  const[sign,setSign]=useState("false")
const changeHandler=(e=>{
  setSearch(e.target.value)
})

const submitHandler=(e=>{
  e.preventDefault();
  
     axios.get (`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${search}&per_page=24&format=json&nojsoncallback=1`
    ).then(response=>
    setData(response.data.photos.photo)
  )
  
  
})
  return (
    <div className='app'>
      <center>
        <h1> Search For Wallpapers</h1>
        <form onSubmit={submitHandler}>
          <input size="30"type="text"  id="hello"name="search" value={search} onChange={changeHandler}/><br/><br/>
          <input type="submit" name="search" id="hai"/><br/><br/>
        </form>
        <br/>
        {
          data.length>=1?<Gallery data={data}/>:<h1 style={{color:"Tomato"}}>Are You Looking For Somthing ?</h1>
        }
      </center>
      
    </div>
  )
}

export default App
