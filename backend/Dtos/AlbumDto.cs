public class AlbumDto
{
    public int Id { get; set; }
    public string AlbumName { get; set; }
    public int ArtistId { get; set; }
    public string AlbumImage { get; set; }
    public List<SongDto> Songs { get; set; }
}
