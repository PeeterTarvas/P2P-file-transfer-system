import React, { useState } from "react";
import ApiManager from "../../services/api-manager.tsx";

interface FileAvailabilityDto {
    username: string;
    filename: string;
}

const FileSearch: React.FC = () => {
    const [filename, setFilename] = useState<string>("");
    const [searchResults, setSearchResults] = useState<FileAvailabilityDto[]>([]);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);

    const handleSearch = async () => {
        if (filename.trim()) {
            try {
                const response: FileAvailabilityDto[] = await ApiManager.getFileAvailability(filename);
                setSearchResults(response);
                setShowDropdown(response.length > 0);
            } catch (error) {
                console.error("Error fetching file availability:", error);
            }
        }
    };

    const handleSelectResult = (selectedFilename: string) => {
        setFilename(selectedFilename);
        setShowDropdown(false);
    };

    const handleInputBlur = () => {
        setTimeout(() => setShowDropdown(false), 150);
    };

    return (
        <div style={{ position: "relative", width: "200px" }}>
            <input
                type="text"
                placeholder="Search for a file..."
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
                onFocus={() => setShowDropdown(searchResults.length > 0)}
                onBlur={handleInputBlur}
            />
            <button onClick={handleSearch}>Search</button>

            {showDropdown && searchResults.length > 0 && (
                <ul style={{
                    listStyleType: "none",
                    padding: 0,
                    margin: 0,
                    border: "1px solid #ccc",
                    maxHeight: "200px",
                    overflowY: "auto",
                    position: "absolute",
                    backgroundColor: "#fff",
                    width: "100%",
                    zIndex: 1
                }}>
                    {searchResults.map((result, index) => (
                        <li
                            key={index}
                            style={{ padding: "8px", cursor: "pointer" }}
                            onMouseDown={() => handleSelectResult(result.filename)}
                        >
                            <span>{result.username} - {result.filename}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FileSearch;
