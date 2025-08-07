import React from 'react'

const PartnersLogo = () => {
  const partners = [{img: 'logo.png'},
  {img: 'logo.png'},
  {img: 'logo.png'},
  {img: 'logo.png'},
  {img: 'logo.png'}
  ]
  return (
    <div className='partnersContainer'>
      <h2 className='title'>Partners</h2>
      <div className='partnersContainerLogos'>

      {partners.map((item, i)=>(<div className='partnersContainerLogosLogo' key={i}>
        <img src={item.img} alt='logo' onContextMenu={(e) => e.preventDefault()} />
      </div>))}
      </div>
    </div>
  )
}

export default PartnersLogo

