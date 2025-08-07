import { useLocation } from "react-router-dom";

export default function useUrlSearchParams () {
    const pathName = useLocation()?.search?.split("?")[1]?.split('&');
    let obj = {}
    if(pathName?.length > 0) {
        for(let i = 0; pathName.length > i; i++){
            let newArr = pathName[i].split('=')
            obj[newArr[0]] = newArr[1] === 'undefined' ? undefined : newArr[1]
        }
    }

return ({...obj})

}
