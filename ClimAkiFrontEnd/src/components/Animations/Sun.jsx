import Lottie from "lottie-react";
import SunAnimation from "../../assets/Animations/Sun.json"

export default function Sun({ClassName}){
    return(

        <div className={`${ClassName}`}>
            <Lottie
                animationData={SunAnimation}
                autoPlay={true}
                loop={true}
            />
        </div>
    )
}