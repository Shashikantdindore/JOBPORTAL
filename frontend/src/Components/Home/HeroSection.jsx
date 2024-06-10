import React from 'react'
import { FaBuilding, FaSuitcase, FaUser, FaUserPlus } from 'react-icons/fa'

const HeroSection = () => {

  const details = [
    {
      id: 1,
      title: "1,25,224 +",
      subtitle: "Live Jobs",
      icon: <FaSuitcase />
    },
    {
      id: 2,
      title: "544 +",
      subtitle: "Companies",
      icon: <FaBuilding />


    },
    {
      id: 3,
      title: "5,25,451 +",
      subtitle: "Job Seekers",
      icon: <FaUser />

    },
    {
      id: 4,
      title: "1,55,124 +",
      subtitle: "Employers",
      icon: <FaUserPlus />
    }

  ]
  return (
    <div className="heroSection">
      <div className="container">
        <div className="title">
          <h1>Looking For A Better <span style={{ color: "#b3344f" }}> Opportunity?</span>  Join Us And Make Things Happen </h1>

          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto sunt, expedita magni aliquam ipsa autem excepturi at, velit asperiores quidem recusandae vel adipisci, a natus! Quasi amet sunt voluptates quis animi quos. Aliquid corrupti explicabo fugiat magni assumenda numquam tempora dicta, quo non, quas cupiditate. Sint officia quia quasi quae doloremque aliquid earum ipsa!</p>

        </div>
        <div className="image">
          <img src="main.webp" alt="hero" />
        </div>
      </div>

      <div className="details">
        {details.map((element) => {
          return (
            <div className="card" key={element.id}>
              <div className="icon" >{element.icon}</div>
              <div className="content">
                <p>{element.title}</p>
                <p>{element.subtitle}</p>
              </div>

            </div>
          );


        }) }
      </div>
    </div>
  )
}

export default HeroSection