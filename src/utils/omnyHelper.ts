export function getPrograms(orgId: string) {
    return `https://omny.fm/api/orgs/${orgId}/programs/`;
}

export function getProgramDetails(orgId: string, programId: string) {
    return `https://omny.fm/api/orgs/${orgId}/programs/${programId}`;
}

export function getProgramClips(orgId: string, programId: string) {
    return `https://omny.fm/api/orgs/${orgId}/programs/${programId}/clips`;
}

export function getProgramPlaylists(orgId: string, programId: string) {
    return `https://omny.fm/api/orgs/${orgId}/programs/${programId}/playlists`;
}

export function getPlaylistDetails(orgId: string, playlistId: string) {
    return `https://omny.fm/api/orgs/${orgId}/playlists/${playlistId}`;
}

export function getPlaylistClips(orgId: string, playlistId: string) {
    return `https://omny.fm/api/orgs/${orgId}/playlists/${playlistId}/clips`;
}

export function getClipDetails(orgId: string, clipId: string) {
    return `https://omny.fm/api/orgs/${orgId}/clips/${clipId}`;
}

export function getClipDetailsExt(orgId: string, externalId: string) {
    return `https://omny.fm/api/orgs/${orgId}/clips/externalId?value=${externalId}`;
}

export function getClipTranscript(orgId: string, clipId: string) {
    return `https://omny.fm/api/orgs/${orgId}/clips/${clipId}/transcript`;
}
