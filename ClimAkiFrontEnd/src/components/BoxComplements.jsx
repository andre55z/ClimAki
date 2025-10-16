

export default function BoxComlements({Data, Emoji, ClassName, ClassNameData, Medida, ClassNameEmoji}){
    return(
        <div className={`${ClassName} flex flex-col items-center p-[4%] gap-3`}>
            <h1 className={`${ClassNameEmoji}`}>{Emoji}</h1>
            <h1 className={`${ClassNameData} font-outfit`}> {Data} {Medida}</h1>
        </div>
    )
}