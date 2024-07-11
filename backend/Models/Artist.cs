using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using PopArtistApi.Interfaces;

namespace PopArtistApi.Models
{
    public class Artist : IArtist
    {
        [Key]
        public int Id { get; set; }
        public string ArtistName { get; set; } = string.Empty;
        public string Genre { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        
        [JsonIgnore]
        public List<Album> Albums { get; set; } = new();
    }
}
