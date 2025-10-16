import HotArrow from "../assets/HotArrow.png"
import ColdArrow from "../assets/ColdArrow.png"

export default function BoxTemp({minMaxT, typeTemp, ClassName, ClassNameTemp, ClassNameColdArrow, ClassNameHotArrow}){
    return(
        <div className={`${ClassName} flex flex-row items-center p-[5%] gap-5`}>
            {typeTemp == "minT" ? <img src={ColdArrow} className={`${ClassNameColdArrow}`}/> : <img src={HotArrow} className={`${ClassNameHotArrow}`}/> }
            <h1 className={`${ClassNameTemp} font-outfit`}>{minMaxT} ºC</h1>
        </div>
    )
}