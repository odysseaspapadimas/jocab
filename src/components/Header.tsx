import { Avatar, Container, Group, Menu, Navbar } from "@mantine/core"
import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link"

const Header = () => {
    const { data: session } = useSession()
    return (
        <Navbar height={80} className="border-b border-gray-700">
            <Container className="h-full w-full flex justify-between items-center">
                <div className="flex items-center space-x-8">

                    <Link href={"/"} className="flex flex-col">
                        <h2
                            className="text-3xl hover:cursor-pointer"
                        >
                            Jocab
                        </h2>
                        <p
                            className="self-end"
                            style={{ fontSize: "0.58rem", marginTop: "-4px" }}
                        >
                            Powered by Jisho
                        </p>
                    </Link>

                    <Group>
                        <Link href="/reader">
                            <span className="text-gray-300 hover:text-white font-semibold">
                                Reader
                            </span>
                        </Link>
                        <Link href="/vocabulary">
                            <span className="text-gray-300 hover:text-white font-semibold">
                                Vocabulary
                            </span>
                        </Link>
                    </Group>
                </div>
                <Menu position="bottom-end" withArrow arrowOffset={15}>
                    <Menu.Target>
                        <Avatar src={session?.user?.image} className="cursor-pointer" radius="xl" />
                    </Menu.Target>

                    <Menu.Dropdown>
                        <Menu.Item onClick={() => !session ? signIn("discord") : signOut()}>{!session ? "Sign-in" : "Sign-out"}</Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </Container>
        </Navbar>
    )
}
export default Header