import { Button, Loader } from "@mantine/core"
import type { Vocabulary } from "@prisma/client"
import type { JishoResult } from "unofficial-jisho-api"
import { trpc } from "../utils/trpc"
import EnglishDefinition from "./EnglishDefinition"
import Word from "./Word"

type Props = {
    result: JishoResult
    list?: Vocabulary[]
}
const ResultCard = ({ result, list }: Props) => {

    const { data: frequency, isLoading } = trpc.jisho.frequency.useQuery({ word: result.slug })

    const utils = trpc.useContext()

    const addVocab = trpc.vocabulary.add.useMutation({
        onSuccess: async () => {
            utils.auth.getUser.invalidate();
        }
    });
    const removeVocab = trpc.vocabulary.remove.useMutation({
        onSuccess: () => {
            utils.auth.getUser.invalidate();
        }
    });

    const vocabulary = {
        word: result.slug,
        reading: result.japanese[0]?.reading,
        meanings: result.senses.flatMap(sense => sense.english_definitions),
        frequency: frequency,
    }

    return (
        <div className="p-8 border border-gray-400 rounded-md flex flex-col space-y-4 sm:flex-row sm:space-y-0">
            <div className="flex-1">
                <Word word={result.slug} reading={result.japanese[0] ? result.japanese[0].reading : ""} />

                <div className="flex flex-col space-y-3 items-start mt-4">
                    {result.is_common && (
                        <span className="px-2 py-1 text-xs  bg-primary rounded-md">Common</span>
                    )}
                    {result.jlpt[0] && (
                        <span className="px-2 py-1 text-xs  bg-primary rounded-md">{result.jlpt[0].replace("-", " ")}</span>
                    )}
                    <span className="px-2 py-1 text-xs bg-primary rounded-md">
                        {isLoading ? (
                            <div className="grid place-items-center">
                                <Loader variant="dots" color="white" size="sm" height={16} />
                            </div>
                        ) : (
                            <>#{frequency && frequency > 0 ? frequency : <span>🤷</span>}</>
                        )}
                    </span>

                </div>
            </div>

            <div className="flex-1">
                <div>
                    {result.senses.map((sense, i) => (
                        <EnglishDefinition key={i} sense={sense} index={i + 1} />
                    ))}
                </div>
            </div>

            <div className="flex-1 text-center">
                {/* check if list contains result.slug */}
                {list?.find(vocab => vocab.word === result.slug) ? (
                    <Button variant="outline" loaderPosition="center" loading={removeVocab.isLoading} onClick={() => removeVocab.mutate({ word: vocabulary.word })}>
                        Remove
                    </Button>
                ) : list?.length === 0 && (
                    <Button disabled={isLoading} loaderPosition="center" loading={addVocab.isLoading} onClick={() => addVocab.mutate({ vocabulary })}>
                        Add
                    </Button>
                )}

            </div>
        </div>
    )
}
export default ResultCard