import Search from "../Search"

const SearchLayout = ({ children }: { children: React.ReactElement }) => {
    return (
        <div className="py-8">
            <Search />
            {children}
        </div>
    )
}
export default SearchLayout