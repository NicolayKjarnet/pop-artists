using System.ComponentModel.DataAnnotations;
using PopArtistApi.Interfaces;

namespace PopArtistApi.Models
{
    public class Song: ISong
    {
        [Key]
        public int Id { get; set; }
        public string SongName { get; set; } = "";
        public int AlbumId { get; set; }
        public Album Album { get; set; } = null!;
    }
}