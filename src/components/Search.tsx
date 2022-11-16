import { TextInput } from "@mantine/core"
import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react"
import type { FormEvent } from 'react'

const Search = () => {
    const router = useRouter();
    const [query, setQuery] = useState("");

    const inputRef = useRef<HTMLInputElement>(null);


    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        router.push(`/search/${query}`)
    }

    useEffect(() => {
        inputRef.current?.focus()
        inputRef.current?.select()
    }, [inputRef, router])

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <TextInput ref={inputRef} placeholder="Type a word, kanji or sentence" size="lg" defaultValue={router.query.slug} onChange={(e) => setQuery(e.currentTarget.value)} styles={{ input: { backgroundColor: "transparent" } }} />
            </form>
        </div>
    )
}
export default Search