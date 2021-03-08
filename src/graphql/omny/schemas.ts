export const ProgramSchema = `
type Program {
    """The ID of the program."""
    Id: String
    """The name of the program."""
    Name: String
    """The URL slug of the program. The Omny.fm show page can be accessed in the format https://omny.fm/shows/{Slug}."""
    Slug: String
    """The description of the program."""
    Description: String
    DescriptionHtml: String
    Author: String
    Copyright: String
    """The publisher of the program."""
    Publisher: String
    """A publicly-accessible URL to the artwork image for this program. The size parameter specifies the image size (default size is medium). Valid size parameters are: thumbnail (64x64), small (256x256), medium (600x600) and large (3000x3000)."""
    ArtworkUrl: String
    """The category of the program."""
    Category: String
    Categories: [String]
    """The web URL of the program."""
    SocialWeb: String
    """The Twitter account username of the program (should be accessed in the format https://twitter.com/{SocialTwitter})."""
    SocialTwitter: String
    """The Facebook page username of the program (should be accessed in the format https://fb.com/{SocialFacebook})."""
    SocialFacebook: String
    """If true, the program should be considered "private" and should not be shown in public directories or indexed. (Private programs are not available in the consumer API)."""
    Hidden: Boolean
    """If true, the program should be considered an archive and will not be actively updated."""
    Archived: Boolean
    """The name of the network group of the program."""
    Network: String
    NetworkId: String
    ExternalId: String
    ContactName: String
    ContactEmail: String
    DefaultPlaylistId: String
}`;

export const DirectoryLinksSchema = `
type DirectoryLinks {
    """The Apple Podcasts directory URL."""
    ApplePodcasts: String
    """The Google Podcasts directory URL."""
    GooglePodcasts: String
    """The Spotify directory URL."""
    Spotify: String
    """The Stitcher directory URL."""
    Stitcher: String
    """The TuneIn directory URL."""
    TuneIn: String
    """(String, obsolete) The Google Play directory URL."""
    GooglePlay: String
    """The RSS feed URL for this playlist."""
    RssFeed: String
}`;

export const PlaylistSchema = `
"""
Get the playlists for an Omny Studio program. Only publicly-listed playlists (public) are shown;
unlisted or private playlists won't appear in the response.
"""
type Playlist {
    """The ID of the playlist."""
    Id: String
    """The name of the playlist."""
    Title: String
    """The description of the playlist."""
    Description: String
    """The ID of the program to which the playlist belongs."""
    ProgramId: String
    """The RSS feed URL for this playlist."""
    RssFeedUrl: String
    """The embed player iframe URL for this playlist.""" 
    EmbedUrl: String
    """A publicly-accessible URL to the artwork image for this playlist. The size parameter specifies the image size (default size is medium). Valid size parameters are: thumbnail (64x64), small (256x256), medium (600x600) and large (3000x3000)."""
    ArtworkUrl: String
    """The number of clips available in the playlist"""
    NumberOfClips: Int
    """The visibility of the clip. Valid values are Public, Unlisted and Private.""" 
    Visibility: String
    """The list of iTunes category names."""
    Categories: [String]
    """The podcast directory (Apple Podcasts, Google Podcasts, Spotify) URLs for this playlist."""
    DirectoryLinks: DirectoryLinks
}`;

export const ClipChapterSchema = `
type ClipChapter {
    """The ID of the chapter."""
    Id: String
    """The name of the chapter."""
    Name: String
    """The timestamp of the chapter in hh:mm:ss."""
    Position: String
}`;

export const ClipMonetizationSchema = `
type ClipMonetization {
    """If pre-roll ad is enabled for this clip."""
    PreRoll: String
    """If post-roll ad is enabled for this clip."""
    PostRoll: String
    """(TimeSpan[]) An array of midroll locations. For example, a value of ["00:00:30", "01:23:45"] would represent a midroll at 30 seconds, and one at 1 hour, 23 minutes and 45 seconds into the episode."""
    MidRolls: [String]
}`;

export const RecordingMetadataSchema = `
type RecordingMetadata {
    """The date and time the recording started capturing."""
    CaptureStartUtc: String
    """The date and time the recording finished capturing."""
    CaptureEndUtc: String
}`;

export const ClipSchema = `
type Clip {
    Id: String
    """The title of the clip."""
    Title: String
    """The description of the clip (without any HTML formatting)."""
    Description: String
    """The description of the clip (with HTML formatting)."""
    DescriptionHtml: String
    """An array of tags of the clips."""
    Tags: [String]
    """An optional season Number for the clip (as defined by Apple Podcasts)."""
    Season: Int
    """An optional episode Number for the clip (as defined by Apple Podcasts)."""
    Episode: Int
    """The type of episode of the clip (as defined by Apple Podcasts). Valid values are Full, Trailer and Bonus."""
    EpisodeType: String
    """A publicly-accessible URL to the artwork image for this clip. The size parameter specifies the image size (default size is medium). Valid size parameters are: thumbnail (64x64), small (256x256), medium (600x600) and large (3000x3000)."""
    ImageUrl: String
    """A publicly-accessible URL to the MP3 audio for this clip."""
    AudioUrl: String
    """If a visualized video has been generated, a publicly-accessible URL to the MP4 video for this clip."""
    VideoUrl: String
    """The embed player iframe URL for this clip."""
    EmbedUrl: String 
    """The time length of the clip in seconds."""
    DurationSeconds: Int
    """The publish state of the clip. Clips should have a state of Published.""" 
    PublishState: String 
    """A publicly-accessible URL for the clip's Omny.fm web player"""
    PublishedUrl: String
    """The visibility state of the clip. Valid visibilities are Public (should be publicly shown in directories and indexes), and Unlisted (should not be shown in directories and indexes).""" 
    Visibility: String 
    """The date and time when the clip was published."""
    PublishedUtc: String
    """An array of IDs for playlists to which the clip has been added."""
    PlaylistIds: [String] 
    """An array of chapter objects added to the clip."""
    Chapters: [ClipChapter]
    """The state of the clip. Valid states are: Ready (the clip is ready to be played)."""
    State: String
    """An optional override for the share URL."""
    ShareUrl: String
    """An optional episode identifier if the clip was imported from another provider."""
    ImportId: String
    """Monetization settings for the clip."""
    Monetization: ClipMonetization
    """Related information about the recording associated with the clip if made from a recording."""
    RecordingMetadata: RecordingMetadata
    """The ID of the program the to which the clip belongs."""
    ProgramId: String
    """If the clip is published, the size of the audio file in bytes."""
    PublishedAudioSizeInBytes: Int
    """The content rating of the of the clip. Valid ratings are Unrated, Clean and Explicit."""
    ContentRating: String
    """The external ID of the clip."""
    ExternalId: String
}`;

export const ClipsSchema = `
type Clips {
    Clips: [Clip]
    Cursor: Int
    TotalCount: Int
}`;

/**
 * For GraphQL `type Query`
 */
export const ProgramsQuery = `
"""
Get the programs for an Omny Studio organization.
* \`orgId\` The ID of the Omny Studio organization.
"""
programs(orgId: String!): [Program]`;
export const ProgramQuery = `
"""
Get the metadata for an Omny Studio program.
* \`orgId\` The ID of the Omny Studio organization.
* \`programId\` The ID of the Omny Studio program.
"""
program(orgId: String!, programId: String!): Program`;
export const ProgramClipsQuery = `
"""
Get the clips for an Omny Studio program. Only publicly-listed clips (public) are shown;
unlisted or private clips won't appear in the response.
* \`orgId\` The ID of the Omny Studio organization.
* \`programId\` The ID of the Omny Studio program.
* \`cursor\` (Optional) cursor The paging cursor value to use in order to fetch the next page.
* \`pageSize\` (Optional) pageSize The number of clips to return in one page.
"""
programClips(orgId: String!, programId: String!, cursor: Int = 1, pageSize: Int = 10): Clips`;
export const PlaylistsQuery = `
"""
Get the playlists for an Omny Studio program. Only publicly-listed playlists (public) are shown;
unlisted or private playlists won't appear in the response.
* \`orgId\` The ID of the Omny Studio organization.
* \`programId\` The ID of the Omny Studio program.
"""
playlists(orgId: String!, programId: String!): [Playlist]`;
export const PlaylistQuery = `
"""
Get the metadata for an Omny Studio playlist (which can also be considered a podcast).
* \`orgId\` The ID of the Omny Studio organization.
* \`playlistId\` The ID of the Omny Studio playlist.
"""
playlist(orgId: String!, playlistId: String!): Playlist
`;
export const PlaylistClipsQuery = `
"""
Get the clips for an Omny Studio playlist. Only publicly-available clips in the playlist
(public & unlisted) are shown; private clips won't appear in the response.
* \`orgId\` The ID of the Omny Studio organization.
* \`playlistId\` The ID of the Omny Studio playlist.
* \`cursor\` (Optional) cursor The paging cursor value to use in order to fetch the next page.
* \`pageSize\` (Optional) pageSize The number of clips to return in one page.
"""
playlistClips(orgId: String!, playlistId: String!, cursor: Int = 1, pageSize: Int = 10): Clips
`;
export const ClipQuery = `
"""
Get the metadata for an Omny Studio clip (episode).
* \`orgId\` The ID of the Omny Studio organization.
* \`clipId\` The ID of the Omny Studio clip.
"""
clip(orgId: String!, clipId: String!): Clip
`;
export const ClipExternalQuery = `
"""
Get the metadata for an Omny Studio clip (episode) by external ID.
* \`orgId\` The ID of the Omny Studio organization.
* \`externalId\` The external ID of the Omny Studio clip (URL encoded).
"""
clipExternal(orgId: String!, externalId: String!): Clip
`;
export const ClipTranscriptQuery = `
"""
Get the transcript for an Omny Studio clip (episode).
* \`orgId\` The ID of the Omny Studio organization.
* \`clipId\` The ID of the Omny Studio clip.
* \`format\` (Optional) format The format in which the transcript will be exported (default is JSON ). Valid parameters are: SubRip, WebVTT, Text, TextWithTimestamps and JSON.
* \`speakers\` (Optional) speakers Whether a transcript will include speaker names – or default speaker names if speaker names haven't been assigned (default is true). Valid parameters are true and false.
"""
clipTranscript(orgId: String!, clipId: String!, format: String = "JSON", speakers: Boolean = true): Clip
`;

/**
 * All Omny schemas
 */
export const OmnySchema = `
${ProgramSchema}
${DirectoryLinksSchema}
${PlaylistSchema}
${ClipChapterSchema}
${ClipMonetizationSchema}
${RecordingMetadataSchema}
${ClipSchema}
${ClipsSchema}
`;

export const OmnyQuery = `
${ProgramsQuery}
${ProgramQuery}
${ProgramClipsQuery}
${PlaylistsQuery}
${PlaylistQuery}
${PlaylistClipsQuery}
${ClipQuery}
${ClipExternalQuery}
${ClipTranscriptQuery}
`;
