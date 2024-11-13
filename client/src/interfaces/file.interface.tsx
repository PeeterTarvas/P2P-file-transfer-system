interface FileAvailabilityDto {
    username: string;
    filename: string;
    peerId: string;
}

interface FileDto {
    id: bigint | undefined;
    name: string;
    size: bigint;
}
export type {FileAvailabilityDto, FileDto}