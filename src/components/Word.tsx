import { autofurigana } from "../../lib/autofurigana";

type Props = {
    word: string;
    reading: string;
}
const Word = ({ word, reading }: Props) => {

    const okurigana = autofurigana(word, reading)


    return (
        <div className="flex items-end text-3xl">
            {okurigana && okurigana.length > 0 ? (
                <div>
                    <div className="flex">
                        {okurigana.map((okurigana, index) => {
                            const [word, reading] = okurigana;
                            return (
                                <div key={index} className="text-[15px] h-[26px] whitespace-nowrap" style={{width: word.length * 30 + "px"}}>{reading}</div>
                            )
                        })}
                    </div>
                    <div>

                        {okurigana.map((okurigana, index) => {
                            const [word] = okurigana;
                            return (
                                <span key={index} className="text-3xl">{word}</span>
                            )
                        })}
                    </div>
                </div>
            ) : (
                <p>{reading}</p>
            )}
        </div>
    )
}
export default Word


    // if (array[1]) {
    //     return (
    //         <div key={array[0] + i} className="flex flex-col">
    //             <p className="pl-1 text-sm">{array[1]}</p>
    //             <p>{array[0]}</p>
    //         </div>
    //     );
    // } else {
    //     return (
    //         <p key={array[0] + i} className="self-end">
    //             {array[0]}
    //         </p>
    //     );
    // }