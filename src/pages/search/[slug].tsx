
import { Center, Loader } from '@mantine/core';
import Head from 'next/head';
import { useRouter } from 'next/router';
import SearchLayout from '../../components/Layouts/SearchLayout';
import ResultCard from '../../components/ResultCard';
import { trpc } from '../../utils/trpc';
import useUser from '../../utils/use-user';

const SearchPage = () => {
    const router = useRouter();
    const { slug } = router.query;

    const results = trpc.jisho.search.useQuery({ text: slug as string }, { enabled: !!slug });

    const user = useUser();

    console.log(user?.vocabulary, 'uservocab')

    return (
        <>
            <Head>
                <title>{slug} - Jocab</title>
            </Head>
            <SearchLayout>
                <div className="py-8">
                    {results.isLoading ? (
                        <Center>
                            <Loader />
                        </Center>
                    ) : (
                        <div className="flex flex-col space-y-4">
                            {results.data?.map((result) => (
                                <ResultCard key={result.slug} result={result} list={user?.vocabulary} />
                            ))}
                        </div>
                    )}
                </div>
            </SearchLayout>
        </>
    )
}
export default SearchPage