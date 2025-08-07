import { toast } from "react-toastify";
import { toastObject } from "../redux/toastObject";
import axiosInstance from "./axios";

const CHUNK_SIZE = 10 * 1024 * 1024; // 200MB chunk size
const fileInput = document.querySelector("#fileInput")
const uploadBtn = document.querySelector("#uploadBtn")
const progressBar = document.querySelector("#progressBar")
let file, fileName, totalChunks, uploads;

const uploadImage = ({progressBar, l})=>{
    

}
// Listen for file input change event
fileInput.addEventListener('change', ()=>{
    file = fileInput.files[0];
    fileName = Date.now().toString() +"_"+file.name;
    totalChunks = Math.cell(file.size /CHUNK_SIZE);
    // console.log("file", file, "totalChunks ", totalChunks);
    // console.log("fileName ", fileName);
});

// Listen for upload button click event
uploadBtn.addEventListener('click', async()=>{
    if(!file){
        toast.warning('Select a file', toastObject)
    }
    uploadBtn.disabled = true;
    try{
        // Start the upload timing;
        const startTime = new Date();
        let completeRes = null

        // Initiate multipar upload
        const requestBody = {fileName}; 
        const res = await axiosInstance.post("/media-crud-initiate", requestBody)
        if(res.uploadId){
            // console.log({uploadId: res.uploadId});
            const uploadPromises = [];
            let uploadedChunks = 0;
            let start = 0, end;

            for(let i = 0; i < totalChunks; i++){
                end = start + CHUNK_SIZE;
                const chunk = file.slice(start, end);
                const formData = new FormData();
                formData.append('index', i);
                formData.append('totalChunks', totalChunks);
                formData.append('fileName', fileName );
                formData.append('file', chunk );
                const uploadPromise= await axiosInstance.post("/media-crud", formData).then(()=>{
                    updateApp()
                })
                uploadPromises.push(uploadPromise);
                completeRes = uploadPromise;
                start = end
            }
            function updateApp(){
          // Check the promise in the backend
              uploadedChunks++
              const progress = Math.floor((uploadedChunks / totalChunks) * 100);
              // updateProgressBar(progress)
          }
            await Promise.all(uploadPromises)

            // Complete multipart upload
            let data = completeRes.message.data;
            if(!data){
                toast.error('Error completing your upload', toastObject)
            }

            const endTime = new Date();
            const timeElapsed = (endTime - startTime) / 1000;
            toast.success("Successfully uploaded", toastObject);
            // resetProgressBar();

        }
    } catch{
        toast.error("Error uploading file 82", toastObject)
    }
})