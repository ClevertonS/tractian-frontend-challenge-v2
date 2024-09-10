import SearchIcon from "../assets/icons/SearchIcon.svg"

interface iSearchBar {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function SearchBar({value, onChange}: iSearchBar) {
    return (
        <div className="h-[45px] rounded flex flex-row p-3 border border-solid border-gray-150">
            <input 
                type="text" 
                value={value} 
                onChange={onChange} 
                placeholder="Buscar Ativo ou Local" 
                className="w-full placeholder:text-sm outline-none" 
            />
            <img src={SearchIcon} alt="Search" />
        </div>
    );
};

export default SearchBar;