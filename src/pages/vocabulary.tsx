import { Center, Loader, Text } from "@mantine/core";
import type { Vocabulary } from "@prisma/client";
import Head from "next/head";
import { useState } from "react";
import SortMenu from "../components/Vocabulary/SortMenu";
import VocabCard from "../components/Vocabulary/VocabCard";
import { trpc } from "../utils/trpc"

export type SelectedItem = {
    by: "date" | "frequency";
    order: "asc" | "desc";
}

const VocabularyPage = () => {

    const { data: vocab } = trpc.vocabulary.get.useQuery();

    const [selected, setSelected] = useState<SelectedItem>({ by: "date", order: "asc" });


    const sortValue = (a: Vocabulary, b: Vocabulary) => {
        if (selected.by === "date") {
            return a.createdAt > b.createdAt ? selected.order === "asc" ? -1 : 1 : selected.order === "asc" ? 1 : -1;
        } else if (selected.by === "frequency") {
            if (!a.frequency || !b.frequency) return 0;
            if (!a.frequency) return selected.order === "asc" ? 1 : -1;
            if (!b.frequency) return selected.order === "asc" ? -1 : 1;
            return a.frequency > b.frequency ? selected.order === "asc" ? 1 : -1 : selected.order === "asc" ? -1 : 1;
        } else {
            return 0;
        }
    }
    return (
        <>
            <Head>
                <title>Vocabulary - Jocab</title>
            </Head>
            <div className="py-8 flex flex-col items-center">
                {vocab ? (
                    <>
                        {vocab.length === 0 && (
                            <Text size="xl">You don&apos;t have any vocabulary yet.</Text>
                        )}
                        {vocab.length > 0 &&
                            <SortMenu selected={selected} setSelected={setSelected} />
                        }
                        <div className={`grid grid-cols-1 mb-4 ${vocab.length > 1 && " md:grid-cols-2"} gap-4 py-8`}>
                            {vocab.sort((a, b) => sortValue(a, b)).map((v) => (
                                <VocabCard key={v.word} vocab={v} />
                            ))}
                        </div>
                    </>
                ) : (
                    <Center>
                        <Loader />
                    </Center>
                )}
            </div>
        </>
    )
}
export default VocabularyPage