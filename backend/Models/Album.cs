using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using PopArtistApi.Interfaces;

namespace PopArtistApi.Models
{
    public class Album : IAlbum
    {
        [Key]
        public int Id { get; set; }
        public string AlbumName { get; set; } = string.Empty;
        public int ArtistId { get; set; }

        [JsonIgnore]
        public Artist? Artist { get; set; }

        public string AlbumImage { get; set; } = string.Empty;

        [JsonIgnore]
        public List<Song> Songs { get; set; } = new();
    }
}
