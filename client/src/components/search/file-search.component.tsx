import React, { useState, useEffect, useRef } from "react";
import ApiManager from "../../services/api-manager.tsx";
import "./file-search.css";

interface FileAvailabilityDto {
    username: string;
    filename: string;
}

interface FileSearchProps {
    onSelect: (filename: string) => void;
}

const FileSearch: React.FC<FileSearchProps> = ({ onSelect }) => {
    const [filename, setFilename] = useState<string>("");
    const [searchResults, setSearchResults] = useState<FileAvailabilityDto[]>([]);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleSearch = async () => {
        if (filename.trim()) {
            setIsLoading(true);
            try {
                const response = await ApiManager.getFileAvailability(filename);
                setSearchResults(response);
                setShowDropdown(response.length > 0);
            } catch (error) {
                console.error("Error fetching file availability:", error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleSelectResult = (selectedFilename: string) => {
        setFilename(selectedFilename);
        onSelect(selectedFilename);
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

    return (
        <div className="search-container" ref={containerRef}>
            <div className="input-button-container">
                <input
                    type="text"
                    placeholder="Search for a file..."
                    value={filename}
                    onChange={(e) => setFilename(e.target.value)}
                    onFocus={() => setShowDropdown(searchResults.length > 0)}
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
                                onMouseDown={() => handleSelectResult(result.filename)}
                            >
                                {result.username} - {result.filename}
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

export default FileSearch;
