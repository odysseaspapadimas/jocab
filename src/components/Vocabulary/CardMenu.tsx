import { ActionIcon, Menu, UnstyledButton } from "@mantine/core"
import { IconDots, IconTrash } from "@tabler/icons"
import type { RemoveCard } from "./VocabCard";

type Props = {
    word: string;
    removeCard: RemoveCard

}
const CardMenu = ({ word, removeCard }: Props) => {
    return (
        <div className="absolute top-3 right-3">
            <Menu position="bottom-end" width={150}>
                <Menu.Target>
                    <ActionIcon variant="outline">
                        <IconDots size={22} />
                    </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                    <Menu.Item onClick={() => removeCard.mutate({ word })} color="red" icon={<IconTrash size={20} />}>
                        <UnstyledButton>Delete</UnstyledButton>
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </div>
    )
}
export default CardMenu