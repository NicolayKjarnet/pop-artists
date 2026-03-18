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
