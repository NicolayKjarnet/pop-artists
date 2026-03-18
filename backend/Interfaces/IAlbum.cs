using System.ComponentModel.DataAnnotations;
using PopArtistApi.Models;

namespace PopArtistApi.Interfaces
{
    public interface IAlbum
    {
        [Key]
        public int Id { get; set; }
        public string AlbumName { get; set; }
        public int ArtistId { get; set; }
        public Artist Artist { get; set; }
        public string AlbumImage { get; set; }
        public List<Song> Songs { get; set; }
    }
}