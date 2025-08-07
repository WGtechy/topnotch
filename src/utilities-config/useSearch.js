

const useSearch = ({value, placeholder, setValue, data})=>{

    return (
        <div className='searchContainer'>
            <input 
                type='search' 
                placeholder={placeholder} 
                defaultValue={value}
                onChange={e=>setValue(e.target.value)}
            />
            <div className='searchResult'>
                {data.length > 0 && data.map((item, i)=>(
                    <div key={i} className='resultItem'>
                        {item?.content}
                    </div>
                ))}
            </div>
        </div>
    )
};

export {useSearch}