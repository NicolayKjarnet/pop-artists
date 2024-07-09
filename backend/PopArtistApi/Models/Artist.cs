using System.ComponentModel.DataAnnotations;
using PopArtistApi.Interfaces;

namespace PopArtistApi.Models;

public class Artist : IArtist
{
        [Key]
        public int Id { get; set; }
        public string ArtistName { get; set; } = "";
        public string Genre { get; set; } = "";
        public string Image { get; set; } = "";
        public string Description { get; set; } = "";
        public List<Album> Albums { get; set; } = new();
    }