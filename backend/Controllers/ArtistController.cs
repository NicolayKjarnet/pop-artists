// using Microsoft.AspNetCore.Mvc;
// using Microsoft.EntityFrameworkCore;
// using PopArtistApi.Models;

// namespace PopArtistApi.Controllers
// {
//     [ApiController]
//     [Route("[controller]")]
//     public class ArtistController : ControllerBase
//     {
//         private readonly ArtistContext _context;

//         public ArtistController(ArtistContext context)
//         {
//             _context = context;
//         }

//         // Method for getting all artists
//         [HttpGet]
//         public async Task<ActionResult<List<Artist>>> Get()
//         {
//             try
//             {
//                 List<Artist> artists = await _context.Artists
//                     .Include(a => a.Albums)
//                     .ThenInclude(al => al.Songs)
//                     .ToListAsync();

//                 return Ok(artists);
//             }
//             catch
//             {
//                 return StatusCode(500);
//             }
//         }

//         // Method for getting artist by id
//         [HttpGet("{id}")]
//         public async Task<ActionResult<Artist>> GetById(int id)
//         {
//             try
//             {
//                 Artist artist = await _context.Artists
//                     .Include(a => a.Albums)
//                     .ThenInclude(al => al.Songs)
//                     .FirstOrDefaultAsync(a => a.Id == id);

//                 if (artist != null)
//                 {
//                     return Ok(artist);
//                 }
//                 else
//                 {
//                     return NotFound();
//                 }
//             }
//             catch
//             {
//                 return StatusCode(500);
//             }
//         }

//         // Method for getting artist by name
//         [HttpGet]
//         [Route("[action]")]
//         public async Task<ActionResult<List<Artist>>> SearchByName(string name)
//         {
//             try
//             {
//                 string lowerCaseName = name.ToLower();
//                 List<Artist> artists = await _context.Artists
//                     .Where(a => a.ArtistName.ToLower().Contains(lowerCaseName))
//                     .Include(a => a.Albums)
//                     .ThenInclude(al => al.Songs)
//                     .ToListAsync();

//                 return Ok(artists);
//             }
//             catch
//             {
//                 return StatusCode(500);
//             }
//         }


//         // Method for posting an artist
//         // Utilizing the [FromBody] annotation in post and put methods to make sure the object in parameter is coming from the request body
//         [HttpPost]
//         public async Task<ActionResult<Artist>> PostArtist([FromBody] Artist a)
//         {
//             if (!ModelState.IsValid)
//             {
//                 return BadRequest(ModelState); // If model state is not valid, return status code 400 with validation error
//             }

//             try
//             {
//                 _context.Artists.Add(a);
//                 await _context.SaveChangesAsync();

//                 return CreatedAtAction("Get", new { id = a.Id }, a);
//             }
//             catch
//             {
//                 return StatusCode(500);
//             }
//         }

//         // Method for altering an artist
//         // [HttpPut]
//         // public async Task<IActionResult> Put([FromBody] Artist alteredArtist)
//         // {
//         //     if (!ModelState.IsValid)
//         //     {
//         //         return BadRequest(ModelState);
//         //     }

//         //     try
//         //     {
//         //         _context.Entry(alteredArtist).State = EntityState.Modified;
//         //         await _context.SaveChangesAsync();

//         //         return NoContent();
//         //     }
//         //     catch
//         //     {
//         //         return BadRequest();
//         //     }
//         // }

//       [HttpPut]
// public async Task<IActionResult> Put([FromBody] Artist alteredArtist)
// {
//     if (!ModelState.IsValid)
//     {
//         foreach (var modelStateKey in ModelState.Keys)
//         {
//             var modelStateVal = ModelState[modelStateKey];
//             foreach (var error in modelStateVal.Errors)
//             {
//                 Console.WriteLine($"Key: {modelStateKey}, Error: {error.ErrorMessage}");
//             }
//         }
//         return BadRequest(ModelState);
//     }

//     try
//     {
//         var existingArtist = await _context.Artists
//             .Include(a => a.Albums)
//             .ThenInclude(al => al.Songs)
//             .FirstOrDefaultAsync(a => a.Id == alteredArtist.Id);

//         if (existingArtist == null)
//         {
//             return NotFound();
//         }

//         _context.Entry(existingArtist).CurrentValues.SetValues(alteredArtist);

//         foreach (var album in alteredArtist.Albums)
//         {
//             var existingAlbum = existingArtist.Albums.FirstOrDefault(a => a.Id == album.Id);

//             if (existingAlbum == null)
//             {
//                 existingArtist.Albums.Add(album);
//             }
//             else
//             {
//                 _context.Entry(existingAlbum).CurrentValues.SetValues(album);

//                 foreach (var song in album.Songs)
//                 {
//                     var existingSong = existingAlbum.Songs.FirstOrDefault(s => s.Id == song.Id);

//                     if (existingSong == null)
//                     {
//                         existingAlbum.Songs.Add(song);
//                     }
//                     else
//                     {
//                         _context.Entry(existingSong).CurrentValues.SetValues(song);
//                     }
//                 }
//             }
//         }

//         await _context.SaveChangesAsync();
//         return NoContent();
//     }
//     catch (Exception ex)
//     {
//         Console.WriteLine($"Exception: {ex.Message}");
//         return BadRequest();
//     }
// }


//         // Method for deleting an artist with a given id
//         [HttpDelete("{id}")]
//         public async Task<IActionResult> Delete(int id)
//         {
//             try
//             {
//                 Artist artistToDelete = await _context.Artists.FindAsync(id);
//                 if (artistToDelete != null)
//                 {
//                     _context.Artists.Remove(artistToDelete);
//                     await _context.SaveChangesAsync();

//                     // Checking if all artists are deleted from table in db. If they are, then:
//                     if (!await _context.Artists.AnyAsync())
//                     {
//                         // Reset auto-increment to 1
//                         await _context.Database.ExecuteSqlRawAsync("DELETE FROM sqlite_sequence WHERE name = 'Artist';");
//                     }

//                     return NoContent();
//                 }
//                 else
//                 {
//                     return NotFound();
//                 }
//             }
//             catch
//             {
//                 return StatusCode(500);
//             }
//         }
//     }
// }

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PopArtistApi.Models;

[ApiController]
[Route("[controller]")]
public class ArtistController : ControllerBase
{
    private readonly ArtistContext _context;

    public ArtistController(ArtistContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<ArtistDto>>> Get()
    {
        try
        {
            List<Artist> artists = await _context.Artists
                .Include(a => a.Albums)
                .ThenInclude(al => al.Songs)
                .ToListAsync();

            List<ArtistDto> artistDtos = artists.Select(a => new ArtistDto
            {
                Id = a.Id,
                ArtistName = a.ArtistName,
                Genre = a.Genre,
                Image = a.Image,
                Description = a.Description,
                Albums = a.Albums.Select(al => new AlbumDto
                {
                    Id = al.Id,
                    AlbumName = al.AlbumName,
                    ArtistId = al.ArtistId,
                    AlbumImage = al.AlbumImage,
                    Songs = al.Songs.Select(s => new SongDto
                    {
                        Id = s.Id,
                        SongName = s.SongName,
                        AlbumId = s.AlbumId
                    }).ToList()
                }).ToList()
            }).ToList();

            return Ok(artistDtos);
        }
        catch
        {
            return StatusCode(500);
        }
    }

   [HttpGet("{id}")]
public async Task<ActionResult<ArtistDto>> GetById(int id)
{
    try
    {
        var artist = await _context.Artists
            .Include(a => a.Albums)
            .ThenInclude(al => al.Songs)
            .FirstOrDefaultAsync(a => a.Id == id);

        if (artist == null)
        {
            return NotFound();
        }

        var artistDto = new ArtistDto
        {
            Id = artist.Id,
            ArtistName = artist.ArtistName,
            Genre = artist.Genre,
            Image = artist.Image,
            Description = artist.Description,
            Albums = artist.Albums.Select(al => new AlbumDto
            {
                Id = al.Id,
                AlbumName = al.AlbumName,
                ArtistId = al.ArtistId,
                AlbumImage = al.AlbumImage,
                Songs = al.Songs.Select(s => new SongDto
                {
                    Id = s.Id,
                    SongName = s.SongName,
                    AlbumId = s.AlbumId
                }).ToList()
            }).ToList()
        };

        return Ok(artistDto);
    }
    catch
    {
        return StatusCode(500);
    }
}

        [HttpGet]
[Route("[action]")]
public async Task<ActionResult<List<ArtistDto>>> SearchByName(string name)
{
    try
    {
        string lowerCaseName = name.ToLower();
        List<Artist> artists = await _context.Artists
            .Where(a => a.ArtistName.ToLower().Contains(lowerCaseName))
            .Include(a => a.Albums)
            .ThenInclude(al => al.Songs)
            .ToListAsync();

        if (artists == null || artists.Count == 0)
        {
            return NotFound();
        }

        List<ArtistDto> artistDtos = artists.Select(artist => new ArtistDto
        {
            Id = artist.Id,
            ArtistName = artist.ArtistName,
            Genre = artist.Genre,
            Image = artist.Image,
            Description = artist.Description,
            Albums = artist.Albums.Select(al => new AlbumDto
            {
                Id = al.Id,
                AlbumName = al.AlbumName,
                ArtistId = al.ArtistId,
                AlbumImage = al.AlbumImage,
                Songs = al.Songs.Select(s => new SongDto
                {
                    Id = s.Id,
                    SongName = s.SongName,
                    AlbumId = s.AlbumId
                }).ToList()
            }).ToList()
        }).ToList();

        return Ok(artistDtos);
    }
    catch
    {
        return StatusCode(500);
    }
}



    [HttpPut]
    public async Task<IActionResult> Put([FromBody] ArtistDto alteredArtist)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            Artist artist = await _context.Artists
                .Include(a => a.Albums)
                .ThenInclude(al => al.Songs)
                .FirstOrDefaultAsync(a => a.Id == alteredArtist.Id);

            if (artist == null)
            {
                return NotFound();
            }

            artist.ArtistName = alteredArtist.ArtistName;
            artist.Genre = alteredArtist.Genre;
            artist.Image = alteredArtist.Image;
            artist.Description = alteredArtist.Description;

            await _context.SaveChangesAsync();

            return NoContent();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Exception: {ex.Message}");
            return BadRequest();
        }
    }

    [HttpPost]
    public async Task<ActionResult<ArtistDto>> PostArtist([FromBody] ArtistDto a)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            Artist artist = new Artist
            {
                ArtistName = a.ArtistName,
                Genre = a.Genre,
                Image = a.Image,
                Description = a.Description,
                Albums = a.Albums.Select(al => new Album
                {
                    AlbumName = al.AlbumName,
                    ArtistId = al.ArtistId,
                    AlbumImage = al.AlbumImage,
                    Songs = al.Songs.Select(s => new Song
                    {
                        SongName = s.SongName,
                        AlbumId = s.AlbumId
                    }).ToList()
                }).ToList()
            };

            _context.Artists.Add(artist);
            await _context.SaveChangesAsync();

            ArtistDto artistDto = new ArtistDto
            {
                Id = artist.Id,
                ArtistName = artist.ArtistName,
                Genre = artist.Genre,
                Image = artist.Image,
                Description = artist.Description,
                Albums = artist.Albums.Select(al => new AlbumDto
                {
                    Id = al.Id,
                    AlbumName = al.AlbumName,
                    ArtistId = al.ArtistId,
                    AlbumImage = al.AlbumImage,
                    Songs = al.Songs.Select(s => new SongDto
                    {
                        Id = s.Id,
                        SongName = s.SongName,
                        AlbumId = s.AlbumId
                    }).ToList()
                }).ToList()
            };

            return CreatedAtAction("Get", new { id = artist.Id }, artistDto);
        }
        catch
        {
            return StatusCode(500);
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            Artist artistToDelete = await _context.Artists.FindAsync(id);
            if (artistToDelete != null)
            {
                _context.Artists.Remove(artistToDelete);
                await _context.SaveChangesAsync();

                if (!await _context.Artists.AnyAsync())
                {
                    await _context.Database.ExecuteSqlRawAsync("DELETE FROM sqlite_sequence WHERE name = 'Artist';");
                }

                return NoContent();
            }
            else
            {
                return NotFound();
            }
        }
        catch
        {
            return StatusCode(500);
        }
    }
}
