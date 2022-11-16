import { useIntersection } from "@mantine/hooks";
import { useEffect, useRef, useState } from "react";

/* eslint-disable @next/next/no-img-element */
type Props = {
    panel: File;
    panelsLength: number;
    index: number;
    lastPanel: number;
    setLastPanel: (val: {
        manga: string;
        panel: number;
    } | ((prevState: {
        manga: string;
        panel: number;
    }) => {
        manga: string;
        panel: number;
    })) => void
    scrollToLastPanel: (index: number, ref: React.RefObject<HTMLImageElement>) => void;
}
const Panel = ({ panel, panelsLength, index,
    lastPanel,
    setLastPanel,
    scrollToLastPanel, }: Props) => {

    const imgRef = useRef<HTMLImageElement>(null);
    const { ref, entry } = useIntersection();
    const isVisible = entry?.isIntersecting;

    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        if (lastPanel === index + 1 && hasLoaded) {
            scrollToLastPanel(index, imgRef);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasLoaded]);

    useEffect(() => {
        if (isVisible && hasLoaded) {
            if (index + 1 === panelsLength) {
                console.log(index + 1, panelsLength);
                setLastPanel((prev) => ({ ...prev, panel: 0 }));
            } else if (index + 1 > lastPanel) {
                setLastPanel((prev) => ({ ...prev, panel: index }));
                console.log(index, "index");
            }
        }
    }, [isVisible, hasLoaded, lastPanel, index, panelsLength, setLastPanel]);

    return (
        <div ref={ref} id={`panel-${index}`} className="relative">
            <img ref={imgRef} src={URL.createObjectURL(panel)} alt="" onLoad={() => setHasLoaded(true)} />

            <span
                className="absolute bottom-0 left-0 right-0 mx-auto w-min p-1"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            >
                {index + 1}/{panelsLength}
            </span>
        </div>
    )
}
export default Panel