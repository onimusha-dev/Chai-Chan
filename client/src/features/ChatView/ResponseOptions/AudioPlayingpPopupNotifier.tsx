// import { useDataContext } from "@/context/DataContext"
// import { useUiContext } from "@/context/UiContext"
// import { useEffect } from "react"

// const AudioPlayingpPopupNotifier = () => {

//     const {currentPlayingAudio, setCurrentPlayingAudio} = useDataContext()
//     const { isAudioPlaying } = useUiContext()

//     const handleAudioChange = () => {
//         console.log('new audio seted up')
//     }

//     useEffect(()=>{
//         return handleAudioChange()
//     }, [currentPlayingAudio, setCurrentPlayingAudio])

//     return (
//         <div className={`${isAudioPlaying ? 'z-80 bottom-35' : 'z-60 bottom-10'}
//     fixed right-10 z-60 bg-accent px-5 py-10 rounded-2xl border `}
//         >

//             {currentPlayingAudio}</div>
//     )
// }

// export default AudioPlayingpPopupNotifier