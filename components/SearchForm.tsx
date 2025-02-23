import SearchFormReset from "@/components/SearchFormReset";
import { Search } from "lucide-react";
import Form from "next/form";

const SearchForm = ({ query }: { query?: string }) => {
    return (
        <Form action="/" scroll={false} className="search-form">
            <input
                name="query"
                defaultValue={query}
                className="search-input"
                placeholder="Search projects"
                autoFocus
            />

            <div className="flex gap-2">
                {query && <SearchFormReset />}

                <button type="submit" className="search-btn text-gray-50">
                    <Search className="size-5" />
                </button>
            </div>
        </Form>
    )
}

export default SearchForm
