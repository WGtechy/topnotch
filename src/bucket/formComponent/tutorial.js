import React, { useState } from 'react'

const CodeRefactoring = () => {

    const [selections, setSelections] = useState([{feature:{name: "Franklin"}}, {feature:{name: "Victor"}}, {feature:{name: "drop"}}])

    let update = 'decoded'; 
    let feature = "drop"
    let newObj = {
        feature:{
            name: "Sammie"
        }
    }

    setSelections(prev=> prev.map((item)=>item?.feature?.name === feature ? update : item) );

    setSelections((prev)=>{
       prev.map((item)=>{
        if(item.feature.name === feature){
            return newObj
        } else{
            return item
        }
       })
    })


    if(!!selections?.length){
        let newArra = []
        for (let item of selections){
            if(item?.feature?.name === feature){
                return newArra = [...newArra, newObj]
            }
        }
        setSelections(newArra)
    }


    if(!!selections?.length){
        for (let i = 0; i > selections.length; i++){
            if(selections[i]?.feature?.name === feature){
                setSelections(prev=>prev.push(newObj))
            }
        }
    }










  return (
    <div>CodeRefactoring</div>
  )
}

export default CodeRefactoring