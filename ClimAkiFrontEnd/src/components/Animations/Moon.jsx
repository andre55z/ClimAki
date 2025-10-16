import Lottie from "lottie-react"
import MoonAnim from "../../assets/Animations/Moon.json"

export default function Moon({ClassName}){
    return(
        <div className={`${ClassName}`}>
            <Lottie
                animationData={MoonAnim}
                autoPlay={true}
                loop={true}
            />
        </div>
    )
}