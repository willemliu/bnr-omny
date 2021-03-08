import {
    getClipDetails,
    getClipDetailsExt,
    getClipTranscript,
    getPlaylistClips,
    getPlaylistDetails,
    getProgramClips,
    getProgramDetails,
    getProgramPlaylists,
    getPrograms,
} from '../../utils/omnyHelper';

export async function ProgramsResolver(req) {
    return (await getPrograms(req.orgId))?.Programs ?? [];
}

export async function ProgramResolver(req) {
    return await getProgramDetails(req.orgId, req.programId);
}

export async function ProgramClipsResolver(req) {
    return await getProgramClips(
        req.orgId,
        req.programId,
        req.cursor,
        req.pageSize
    );
}

export async function PlaylistResolver(req) {
    return (await getProgramPlaylists(req.orgId, req.programId))?.Playlists;
}

export async function PlaylistDetailsResolver(req) {
    return await getPlaylistDetails(req.orgId, req.playlistId);
}

export async function PlaylistClipsResolver(req) {
    return await getPlaylistClips(
        req.orgId,
        req.playlistId,
        req.cursor,
        req.pageSize
    );
}

export async function ClipResolver(req) {
    return await getClipDetails(req.orgId, req.clipId);
}

export async function ClipExternalResolver(req) {
    return await getClipDetailsExt(req.orgId, req.externalId);
}

export async function ClipTranscriptResolver(req) {
    return await getClipTranscript(
        req.orgId,
        req.clipId,
        req.format,
        req.speakers
    );
}

export const OmnyResolvers = {
    programs: ProgramsResolver,
    program: ProgramResolver,
    programClips: ProgramClipsResolver,
    playlists: PlaylistResolver,
    playlist: PlaylistDetailsResolver,
    playlistClips: PlaylistClipsResolver,
    clip: ClipResolver,
    clipExternal: ClipExternalResolver,
};
