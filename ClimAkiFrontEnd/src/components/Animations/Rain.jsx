import Lottie from "lottie-react"
import RainAnim from "../../assets/Animations/Rain.json"

export default function Rain({ClassName}){
    return(
        <div className={`${ClassName}`}>
            <Lottie
                animationData={RainAnim}
                autoPlay={true}
                loop={true}
            />
        </div>
    )
}