export const serverLoadingOptions = {
    onUploadProgress: (progressEvent)=>{
        const {loaded, total} = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
    }
}