using System.ComponentModel.DataAnnotations;
using PopArtistApi.Models;

namespace PopArtistApi.Interfaces
{
    public interface ISong
    {
        [Key]
        public int Id { get; set; }
        public string SongName { get; set; }
        public int AlbumId { get; set; }
        public Album Album { get; set; }
    }
}