public class ArtistDto
{
    public int Id { get; set; }
    public string ArtistName { get; set; }
    public string Genre { get; set; }
    public string Image { get; set; }
    public string Description { get; set; }
    public List<AlbumDto> Albums { get; set; }
}
