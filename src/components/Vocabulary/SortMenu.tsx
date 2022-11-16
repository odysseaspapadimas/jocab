import { Button, Menu, useMantineTheme } from "@mantine/core"
import type { Dispatch, SetStateAction } from "react";
import type { SelectedItem } from "../../pages/vocabulary";

type Props = {
    // ...
    selected: SelectedItem;
    setSelected: Dispatch<SetStateAction<SelectedItem>>;
}

const SortMenu = ({ selected, setSelected }: Props) => {

    const theme = useMantineTheme();

    return (
        <div className="self-end">
            <Menu closeOnItemClick={false} width={200} position="bottom-end" shadow="md">
                <Menu.Target>
                    <Button>Sort By</Button>
                </Menu.Target>

                <Menu.Dropdown>
                    <Menu.Item style={{ backgroundColor: selected.by === "date" ? theme.fn.primaryColor() : undefined }} onClick={() => setSelected((prev) => ({ by: "date", order: prev.order === "asc" && prev.by === "date" ? "desc" : "asc" }))}>Date Added {selected.by === "date" && (selected.order === "asc" ? "(newest)" : "(oldest)")}</Menu.Item>
                    <Menu.Item style={{ backgroundColor: selected.by === "frequency" ? theme.fn.primaryColor() : undefined }} onClick={() => setSelected((prev) => ({ by: "frequency", order: prev.order === "asc" && prev.by === "frequency" ? "desc" : "asc" }))}>Frequency {selected.by === "frequency" && (selected.order === "asc" ? "(asc)" : "(desc)")}</Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </div>
    )
}
export default SortMenu