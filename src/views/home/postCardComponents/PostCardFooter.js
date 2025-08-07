import React, { useCallback, useState } from 'react'

const PostCardFooter = ({cardLeftIcons, cardRightIcons, isMobile }) => {
  const [iconName, setIconName] = useState(false)
  const handleMouseOver = useCallback(name=>()=>{
    if(!isMobile){
    setIconName(name)
  }
  },[isMobile])
  return (
    <section className="cardFooter">
        <div className="cardFooterLeft">
          {cardLeftIcons.map(
            (item, btnIndex) =>
              item.display  && (
                <div className="cardBtn" key={btnIndex} onMouseOut={handleMouseOver('')} onMouseOver={handleMouseOver(item.name)}  onClick={item.action}>
                  {/* {displayIconContent === item.name && (
                      <span className="iconPopup">{item.name} </span>
                    )} */}

                      {iconName === item.name && <span className='iconName' >{item?.name}</span>}
                  <item.iconName className={item.iconClassName} />
                  {item?.count && (
                    <span className="countIcon">{item?.count}</span>
                  )}
                </div>
              )
          )}
        </div>

        <div className="cardFooterRight">
          {cardRightIcons.map(
            (item, btnIndex) =>
              item.display && (
                <div className="cardBtn" onClick={item.action} key={btnIndex}>
                  {item?.iconName && <item.iconName className={item.iconClassName} />}
                  {item?.likes && <span>{item?.likes}</span>}
                </div>
              )
          )}
        </div>
      </section>
  )
}

export default PostCardFooter