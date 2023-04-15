import { useState, useEffect } from 'react'
import  React from 'react'
import './App.css'
import { GrEdit } from 'react-icons/gr'
import { TiDeleteOutline } from 'react-icons/ti'


function App() {
  const [flightNum, setFlightNum] = useState("")
  const [flightArray, setFlightArray] = useState([1000, 1111, 1112].map((flightNumber, i) => {
    return { 
      flightcod: flightNumber,
      fromairportcod: 1,
      toairportcod: 2,
      company: "TAP",
      duration: 2,
      planecod: 1 
    }
  }))

  const [showFlights, setShowFlights] = useState(true)

  const [planeArray, setPlaneArray] = useState([])
  
  const [showEditBlock, setShowEditBlock] = useState(false)

  const fetchPlanes = async () => {
    const response = await fetch('http://localhost:3001/planes')
    const data = await response.json()
    setPlaneArray(data)
  }
  
  const fetchFlights = async () => {
    const response = await fetch('http://localhost:3001/flights')
    const data = await response.json()
    setFlightArray(data)
  }

  const deleteFlight = async (e) => {
    const { flightcod } = e.currentTarget.dataset;
    const response = await fetch(`http://localhost:3001/flight/${flightcod}`, {
      method: 'DELETE'
    })
    await fetchFlights()
  }

  useEffect(() => {
    fetchFlights()
    fetchPlanes()
  }, [])

  useEffect(() => {
    if (flightNum && flightNum.toString().length === 4) {
      let filteredFlightArray = flightArray.filter((flight) => {
        return flight.flightcod === flightNum
      })
      console.log(filteredFlightArray)
      setFlightArray(filteredFlightArray)
    } else if (flightNum.toString().length > 1 && flightArray.length === 1) {
      fetchFlights()
    }
  }, [flightNum])

  // {
  //   "flightcod": 1001,
  //   "fromairportcod": 1,
  //   "toairportcod": 2,
  //   "company": "TAP",
  //   "duration": 2,
  //   "planecod": 1
  // }


  return (
    <div className="App">
      <button onClick={()=> setShowFlights(!showFlights)}>Toggle Flights</button>
      {showFlights ? <>
      <h1>Flights</h1>xc
      <label>Flight Number</label>``
      <input type="number" value={flightNum} placeholder={'FlightNo'} onChange={(e) => setFlightNum(parseInt(e.target.value || 0))}/>

      <div className="flightContainer">
        {
          flightArray.map((flight, i) => {
            const { flightcod, fromairportcod, toairportcod, company, duration } = flight
            return ( 
              <FlightCard {...{
                flightcod, 
                flight, 
                deleteFlight, 
                fromairportcod, 
                company, 
                toairportcod, 
                duration,
                showEditBlock,
                setShowEditBlock,
              }}/>
              // FlightCard(flightcod, flight, deleteFlight, fromairportcod, company, toairportcod, duration)
              )
        })
        }
      </div>
      </>
    : <>
    <h1>Planes</h1>
    <div className="planeContainer">
        {
          planeArray.map((plane, i) => {
            const { planecod, name, modelcod } = plane
            return ( 
              <div key={name} className="planeCard">
                <div className="planeCardTopSection">
                  <div className="planeCardTopSectionPlaneContainer">plane: <h2>{plane.name}</h2></div>
                  <div className="planeCardTopSectionIconContainer">
                    <div className="iconContainer">
                      <GrEdit size={'3rem'} />
                    </div>
                    <div data-name={name} className="iconContainer">
                      <TiDeleteOutline size={'3.5rem'} />
                    </div>
                  </div>
                </div>
                <div className="planeCardBottomSection">
                  <div className="planeCardBottomSectionLeftContainer">
                    <p>Plane Code: <strong>{planecod}</strong></p>
                  </div>
                  <div className="planeCardBottomSectionRightContainer">
                    <p>Model Code: <strong>{modelcod}</strong></p>
                  </div>
                </div>
              </div>
              )
        })
        }
      </div>
    <></>
    </>}
    </div>
  )
}

export default App
function FlightCard({flightcod, flight, deleteFlight, fromairportcod, company, toairportcod, duration, showEditBlock, setShowEditBlock}) {
  console.log(flightcod)
  const toggleEditBlock = () => setShowEditBlock(!showEditBlock)
  return <div key={flightcod} className="flightCard">
    <div className="flightCardTopSection">
      <div className="flightCardTopSectionFlightContainer">Flight: <h2>{flight.flightcod}</h2></div>
      <div className="flightCardTopSectionIconContainer">
        <div className="iconContainer">
          <GrEdit size={'3rem'} onClick={toggleEditBlock}/>
        </div>
        <div data-flightcod={flightcod} onClick={deleteFlight} className="iconContainer">
          <TiDeleteOutline size={'3.5rem'} />
        </div>
      </div>
    </div>
    <div className="flightCardBottomSection">
      <div className="flightCardBottomSectionLeftContainer">
        <p>From: &nbsp;
          {!showEditBlock && <strong>{fromairportcod}</strong>}
          {showEditBlock && 
          <input type='number' value={fromairportcod} placeholder={'From'} onChange={(e) => setFromAirportCod(parseInt(e.target.value || 0))}/>
          }
          </p>
        <p>Company: <strong>{company}</strong></p>
      </div>
      <div className="flightCardBottomSectionRightContainer">
        <p>To: <strong>{toairportcod}</strong></p>
        <p>Duration: <strong>{duration}</strong></p>
      </div>
    </div>
  </div>
}

