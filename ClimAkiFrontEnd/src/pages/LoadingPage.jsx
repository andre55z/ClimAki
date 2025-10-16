import Lottie from "lottie-react"
import LoadingAnim from "../assets/Animations/LoadingAnim.json"


export default function LoadingPage(){
    return(
        <div className="flex flex-col items-center lg:mt-[10%] mt-[60%] w-full min-h-full">
            <h1 className="text-[150%] font-color-default  text-center pl-[10%] pr-[10%] ">Permita o acesso a sua localização para a estimativa do clima na sua região</h1>
            <div className="w-[150%] mt-[-50%]">
                <Lottie
                    animationData={LoadingAnim}
                    autoPlay={true}
                    loop={true} 
                />
            </div>
        </div>
    )
}