using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using PopArtistApi.Interfaces;

namespace PopArtistApi.Models
{
    public class Song : ISong
    {
        [Key]
        public int Id { get; set; }
        public string SongName { get; set; } = string.Empty;
        public int AlbumId { get; set; }

        [JsonIgnore]
        public Album? Album { get; set; }
    }
}
