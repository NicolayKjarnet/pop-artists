using System.ComponentModel.DataAnnotations;
using PopArtistApi.Interfaces;

namespace PopArtistApi.Models
{
    public class Album: IAlbum
    {
        [Key]
        public int Id { get; set; }
        public string AlbumName { get; set; } = "";
        public int ArtistId { get; set; }
        public Artist Artist { get; set; } = null!;
        public string AlbumImage { get; set; } = "";
        public List<Song> Songs { get; set; } = new();
    }
}