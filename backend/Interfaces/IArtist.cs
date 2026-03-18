using System.ComponentModel.DataAnnotations;
using PopArtistApi.Models;

namespace PopArtistApi.Interfaces;
public interface IArtist
{
    [Key]
    public int Id {get; set;}
    public string ArtistName {get; set;}
    public string Genre {get; set;}
    public string Image {get; set;}
    public List<Album> Albums {get; set;}
}