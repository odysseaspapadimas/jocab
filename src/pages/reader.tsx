import { useCallback, useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import PopupDictionary from "../components/Reader/PopupDictionary";
import Panel from "../components/Reader/Panel";
import Head from "next/head";
import { useLocalStorage, useWindowScroll } from "@mantine/hooks";
import {  Button, NumberInput } from "@mantine/core";
import { IconChevronUp } from "@tabler/icons";

const ReaderPage = () => {
    const [inputProps, setInputProps] = useState({
        directory: "",
        webkitdirectory: "",
        multiple: false,
    });
    const [page, setPage] = useState(1);

    const [mangaName, setMangaName] = useState("");

    const [panels, setPanels] = useState<FileList | null>(null)

    const [, scrollTo] = useWindowScroll();

    useEffect(() => {
        if (window.outerWidth < 1024) {
            setInputProps({ directory: "", webkitdirectory: "", multiple: true });
        }
    }, []);

    const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.files, 'files')
        setPanels(e.target.files)
        if (!e.target.files || !e.target.files[0]) return;
        let mangaName = e.target.files[0].webkitRelativePath.split("/")[0]?.split(" ")[0];

        if (mangaName === "") mangaName = e.target.files[0].name.split("_")[0];

        mangaName && setMangaName(mangaName);
    }

    const [lastPanel, setLastPanel] = useLocalStorage({
        key: "lastPanel", defaultValue: {
            manga: "",
            panel: 0,
        }
    });

    const scrollToLastPanel = useCallback((index: number, ref: React.RefObject<HTMLImageElement>) => {
        if (index + 1 === lastPanel.panel) {
            ref.current?.scrollIntoView({ behavior: "smooth" });
            return;
        }
    }, [lastPanel.panel]);

    const handlePageChange = (value: number | undefined) => {
        setPage(value || 1);
        if (panels?.length && value) {
            if (value > panels.length) {
                setPage(panels.length);
            }
        }
    };

    const scrollToPanel = () => {
        document.getElementById(`panel-${page - 1}`)?.scrollIntoView({ behavior: "smooth" });
    }

    return (
        <>
            <Head>
                <title>{mangaName || "Reader"} - Jocab</title>
            </Head>
            <div className="relative">
                <label className="custom-file-upload">
                    <input
                        type="file"
                        {...inputProps}
                        className="hidden"
                        onChange={handleUpload}
                    />
                    <div className="p-4 flex justify-center items-center border-gray-700 rounded-md border-2 my-5 cursor-pointer">
                        Open Folder
                    </div>
                </label>
                <div>
                    {panels && (
                        <div className="flex flex-col items-center">
                            <div className="mb-5 flex items-center">
                                <NumberInput
                                    className="bg-transparent px-2 w-[68px] text-center "
                                    value={page}
                                    hideControls
                                    max={panels.length}
                                    onChange={handlePageChange}
                                    maxLength={panels.length.toString().length}
                                />{" "}
                                / {panels.length}
                                <Button
                                    onClick={scrollToPanel}
                                    className="ml-2"
                                >
                                    Go
                                </Button>
                            </div>
                            <div className="flex flex-col items-center space-y-8 ">
                                {Array.from(panels).map((panel, i) => (
                                    <div key={i}>
                                        <Panel panel={panel} panelsLength={panels.length} index={i} lastPanel={lastPanel.panel} setLastPanel={setLastPanel} scrollToLastPanel={scrollToLastPanel} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <PopupDictionary />

                <div className="hidden sm:block fixed bottom-14 right-8 rounded-full cursor-pointer bg-[hsl(222,14%,18%)] hover:bg-[hsl(222,14%,16%)] p-2" onClick={() => scrollTo({ y: 0 })}>
                    <IconChevronUp color="white" size={24} />
                </div>
            </div>


        </>
    )
}
export default ReaderPage