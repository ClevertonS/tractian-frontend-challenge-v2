import SearchIcon from "../assets/icons/SearchIcon.svg"

export default function SearchBar()
{
    return (
        <div className="h-[45px] rounded flex flex-row p-3 border border-solid border-gray-150">
            <input type="text" name="" id="" placeholder="Buscar Ativo ou Local" className="w-full placeholder:text-sm outline-none" />
            <img src={SearchIcon} />
        </div>
    )
}