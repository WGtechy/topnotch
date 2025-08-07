
import { isOnline } from "../../utilities-config/onlineMode";

export const componentLoader = (
    <div className='loaderContainer'>
 <svg viewBox='0 0 50 50'>
      <circle
      cx='25'
      cy='25'
      r='20'
      />
    </svg>
    {/* {isOnline ? '': 'No internet'} */}
    </div>
  )


