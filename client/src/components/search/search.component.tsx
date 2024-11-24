import React, { useState, useEffect, useRef } from "react";
import ApiManager from "../../services/api-manager.tsx";
import "./search.css";
import {FileAvailabilityDto} from "../../interfaces/file.interface.tsx";
import {UserInterface} from "../../interfaces/user.interface.tsx";
import {getUsernameFromSession} from "../../utils/session-storage.tsx";


interface FileSearchProps {
    onSelect: (name: string, username: string) => void;
}

const Search: React.FC<FileSearchProps> = ({ onSelect }) => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [searchResults, setSearchResults] = useState<(FileAvailabilityDto | UserInterface)[]>([]);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleSearch = async () => {
        if (searchTerm.trim()) {
            setIsLoading(true);
            try {
                const responseFile: FileAvailabilityDto[] = await ApiManager.getFileAvailability(searchTerm);
                const responseUser: UserInterface[] = await ApiManager.searchUsersByTerm(searchTerm);
                const combinedResults = [
                    ...responseFile,
                    ...responseUser
                ];
                setSearchResults(combinedResults);
                setShowDropdown(combinedResults.length > 0);
            } catch (error) {
                console.error("Error fetching file availability:", error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleSelectResult = (member: string, filename?: string) => {
        const owner: string = getUsernameFromSession();
        setSearchTerm(member);
        const groupName = filename
            ? `Direct request from ${owner} to ${member} - Please send file ${filename}`
            : `Direct request from ${owner} to ${member}`;

        onSelect(groupName, member);
        setShowDropdown(false);
    };

    const handleOutsideClick = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
            setShowDropdown(false);
        }
    };

    const handleBackButton = () => {
        setShowDropdown(false);
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        window.addEventListener("popstate", handleBackButton);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
            window.removeEventListener("popstate", handleBackButton);
        };
    }, []);

    const isFileAvailabilityDto = (item: FileAvailabilityDto | UserInterface): item is FileAvailabilityDto => {
        return (item as FileAvailabilityDto).filename !== undefined;
    };

    return (
        <div className="search-container" ref={containerRef}>
            <div className="input-button-container">
                <input
                    type="text"
                    placeholder="Search for a file..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setShowDropdown(searchResults.length > 0)}
                    onKeyDown={handleKeyDown}
                    className="search-input"
                />
                <button onClick={handleSearch} className="show-all-button">
                    Search
                </button>
            </div>

            {isLoading ? (
                <div className="loading">Loading files...</div>
            ) : (
                <div className={`results-list ${showDropdown ? "visible" : ""}`}>
                    {searchResults.length > 0 ? (
                        searchResults.map((result, index) => (
                            <div
                                key={index}
                                className="result-item"
                                onClick={() =>
                                    handleSelectResult(result.username, isFileAvailabilityDto(result) ? result.filename : undefined)
                                }
                            >
                                {isFileAvailabilityDto(result)
                                    ? `${result.username} - ${result.filename} - File`
                                    : `${result.username} - User Profile`}
                            </div>
                        ))
                    ) : (
                        <div className="no-results">No files found</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Search;