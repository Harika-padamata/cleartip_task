import React, {useState, useEffect} from 'react'
import HotelList from './hotelList'
import './App.css'
const API_URL = 'https://mocki.io/v1/4775a500-cf31-4bee-8a65-0c849b6e4d0c'

const App = () => {
  const [hotels, setHotels] = useState([])
  const [searchText, setSearchText] = useState('')
  const [showFavorites, setShowFavorites] = useState(false)
  const [sortByPrice, setSortByPrice] = useState(false)

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setHotels(data))
      .catch((error) => console.error('Error fetching data:', error))
  }, [])

  const filterHotels = () => {
    let filteredHotels = hotels
    // Filter by search text
    if (searchText) {
      const searchTextLower = searchText.toLowerCase()
      filteredHotels = filteredHotels.filter(
        (hotel) =>
          hotel.name.toLowerCase().includes(searchTextLower) ||
          hotel.id.toString().includes(searchTextLower),
      )
    }
    // Filter by favorites
    if (showFavorites) {
      filteredHotels = filteredHotels.filter((hotel) => hotel.favorite)
    }
    // Sort by price
    if (sortByPrice) {
      filteredHotels.sort((a, b) => a.price - b.price)
    }
    return filteredHotels
  }

  const handleFav = (item)=>{
    const updatedLIst = hotels.map(hotel=>{
      if(hotel.id == item.id){
        hotel.favorite = !hotel.favorite
      }
      return hotel
    })
    setHotels(updatedLIst)

  }

  return (
    <div className="app">
        <div className='stick-menu'>
        <div className='search-bar'>        
          <input
          className='row'
            type="text"
            placeholder="Goa"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
         
        </div>
        <div className={showFavorites?"chip":"chip-normal"} onClick={() => setShowFavorites(!showFavorites)}>
          Favorites
        </div> 
        <div className={sortByPrice?"chip":"chip-normal"} onClick={() => setSortByPrice(!sortByPrice)}>
          Price
        </div>{' '}
        </div>
      <HotelList hotels={filterHotels()} handleFav={handleFav} />{' '}
    </div>
  )
}
export default App
