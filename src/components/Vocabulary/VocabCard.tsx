import { LoadingOverlay } from "@mantine/core";
import type { Vocabulary } from "@prisma/client"
import { trpc } from "../../utils/trpc";
import CardMenu from "./CardMenu"

export type RemoveCard = {
    mutate: ({ word }: { word: string }) => void;
    isLoading: boolean;
}

type Props = {
    vocab: Vocabulary
}
const VocabCard = ({ vocab: { frequency, reading, word, meanings } }: Props) => {

    const utils = trpc.useContext();
    const removeCard = trpc.vocabulary.remove.useMutation({ onSuccess: () => utils.vocabulary.get.invalidate() });

    return (
        <div className="flex flex-col relative items-center px-12 md:px-20 py-4 border border-gray-700 rounded-md">

            <LoadingOverlay visible={removeCard.isLoading} />
            <div className="flex flex-col mb-1">
                <p className="pl-1 text-sm">{reading}</p>
                <p className="text-3xl">{word}</p>
            </div>
            <p>
                {meanings.map((meaning, i) => (
                    <span key={i}>{meaning}{i !== meanings.length - 1 && <>, </>}</span>
                ))}
            </p>

            {frequency && (
                <div className="absolute left-3 top-3 rounded-md px-2 py-1 bg-primary">
                    #{frequency}
                </div>
            )}

            <CardMenu word={word} removeCard={removeCard} />
        </div>
    )
}
export default VocabCard