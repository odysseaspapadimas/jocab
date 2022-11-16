import { TextInput, useMantineTheme } from '@mantine/core';
import { useClickOutside, useHotkeys } from '@mantine/hooks';
import { useRef, useState } from 'react';
import { trpc } from '../../utils/trpc';
import ResultCard from '../ResultCard';

const PopupDictionary = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const resultsRef = useClickOutside(() => {
        setFocused(false)
        setShowResults(false);
    });

    const [focused, setFocused] = useState(false);

    const [showResults, setShowResults] = useState(false);

    const [query, setQuery] = useState("");

    const results = trpc.jisho.search.useQuery({ text: query }, { enabled: !!query });

    useHotkeys([
        ['/', () => inputRef.current?.focus()],
    ]);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        setQuery(inputRef.current?.value || "");

        setShowResults(true);
    }

    const theme = useMantineTheme();

    return (
        <div ref={resultsRef} className="fixed bottom-4 mx-auto left-0 right-0 max-w-[960px] w-[90%]">
                {showResults &&
                    <div className="h-96 overflow-y-scroll flex flex-col space-y-4 p-4 rounded-t-md " style={{ backgroundColor: theme.colors.dark[8] }}>
                        {results.data?.map((result) => (
                            <ResultCard key={result.slug} result={result} />
                        ))}
                    </div>
                }

                <form onSubmit={handleSubmit} className="">
                    <TextInput ref={inputRef} className={!focused ? "opacity-80" : ""} placeholder='Type a word, kanji or sentence (Press "/" to focus)' onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
                </form>
        </div>
    )
}
export default PopupDictionary