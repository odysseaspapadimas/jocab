import type { JishoWordSense } from "unofficial-jisho-api";

type Props = {
    sense: JishoWordSense;
    index: number;
}

const EnglishDefinition = ({
    sense: { parts_of_speech, english_definitions },
    index,
}: Props) => {
    return (
        <div className="">
            <div className="flex items-start justify-items-start">
                <p className="text-xs text-gray-300 mb-1 lg:mb-0">
                    {parts_of_speech.map((part, i) => (
                        <span key={part + i}>
                            {part}
                            {i < parts_of_speech.length - 1 && <span>,&nbsp;</span>}
                        </span>
                    ))}
                </p>
            </div>
            <div className="flex w-full">
                <p className="text-gray-300 pr-2">{index}.</p>
                <div className="flex items-start flex-wrap justify-items-start">
                    {english_definitions.map((definition, i) => (
                        <p key={definition + i} className="">
                            {definition}
                            {i < english_definitions.length - 1 && <span>,&nbsp;</span>}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EnglishDefinition;
