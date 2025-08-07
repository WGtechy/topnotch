
export default function useStreamId(link){
    let streamId
    if(['youtu.be'].includes(link)){
        streamId = link.split('/')[3]
    } else if(['youtube.com']){
        streamId = link.split('=')[1]

    }

    return streamId
}