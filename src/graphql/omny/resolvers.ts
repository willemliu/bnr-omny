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
    Program,
} from '../../utils/omnyHelper';

export async function ProgramsResolver(_, req) {
    return (await getPrograms(req?.orgId))?.Programs ?? [];
}

export async function ProgramResolver(_, req) {
    return await getProgramDetails(req?.orgId, _?.ProgramId ?? req?.programId);
}

export async function ProgramClipsResolver(_: Program, req) {
    return await getProgramClips(
        req?.orgId,
        _?.Id ?? req?.programId,
        req?.cursor,
        req?.pageSize
    );
}

export async function ProgramPlaylistResolver(_, req) {
    return await getProgramPlaylists(req?.orgId, _?.Id ?? req?.programId);
}

export async function PlaylistDetailsResolver(_, req) {
    return await getPlaylistDetails(req?.orgId, req?.playlistId);
}

export async function PlaylistClipsResolver(_, req) {
    return await getPlaylistClips(
        req?.orgId,
        req?.playlistId,
        req?.cursor,
        req?.pageSize
    );
}

export async function ClipResolver(_, req) {
    return await getClipDetails(req?.orgId, req?.clipId);
}

export async function ClipExternalResolver(_, req) {
    return await getClipDetailsExt(req?.orgId, req?.externalId);
}

export async function ClipTranscriptResolver(_, req) {
    return await getClipTranscript(
        req?.orgId,
        req?.clipId,
        req?.format,
        req?.speakers
    );
}

export const OmnyQueryResolvers = {
    programs: ProgramsResolver,
    program: ProgramResolver,
    programClips: ProgramClipsResolver,
    playlists: ProgramPlaylistResolver,
    playlist: PlaylistDetailsResolver,
    playlistClips: PlaylistClipsResolver,
    clip: ClipResolver,
    clipExternal: ClipExternalResolver,
};

/**
 * Here starts the N+1 problems for GraphQL.
 */
export const OmnyFieldResolvers = {
    /**
     * type `Program` special resolvers for
     * specific fields.
     */
    Program: {
        Clips: ProgramClipsResolver,
        Playlists: ProgramPlaylistResolver,
    },
    Clip: {
        Program: ProgramResolver,
    },
    Playlist: {
        Program: ProgramResolver,
    },
};
