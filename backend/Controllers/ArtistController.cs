using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PopArtistApi.Models;

namespace PopArtistApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ArtistController : ControllerBase
    {
        private readonly ArtistContext _context;

        public ArtistController(ArtistContext context)
        {
            _context = context;
        }

        // Method for getting all artists
        [HttpGet]
        public async Task<ActionResult<List<Artist>>> Get()
        {
            try
            {
                List<Artist> artists = await _context.Artists
                    .Include(a => a.Albums)
                    .ThenInclude(al => al.Songs)
                    .ToListAsync();

                return Ok(artists);
            }
            catch
            {
                return StatusCode(500);
            }
        }

        // Method for getting artist by id
        [HttpGet("{id}")]
        public async Task<ActionResult<Artist>> GetById(int id)
        {
            try
            {
                Artist artist = await _context.Artists
                    .Include(a => a.Albums)
                    .ThenInclude(al => al.Songs)
                    .FirstOrDefaultAsync(a => a.Id == id);

                if (artist != null)
                {
                    return Ok(artist);
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

        // Method for getting artist by name
        [HttpGet]
        [Route("[action]")]
        public async Task<ActionResult<List<Artist>>> SearchByName(string name)
        {
            try
            {
                string lowerCaseName = name.ToLower();
                List<Artist> artists = await _context.Artists
                    .Where(a => a.ArtistName.ToLower().Contains(lowerCaseName))
                    .Include(a => a.Albums)
                    .ThenInclude(al => al.Songs)
                    .ToListAsync();

                return Ok(artists);
            }
            catch
            {
                return StatusCode(500);
            }
        }


        // Method for posting an artist
        // Utilizing the [FromBody] annotation in post and put methods to make sure the object in parameter is coming from the request body
        [HttpPost]
        public async Task<ActionResult<Artist>> PostArtist([FromBody] Artist a)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState); // If model state is not valid, return status code 400 with validation error
            }

            try
            {
                _context.Artists.Add(a);
                await _context.SaveChangesAsync();

                return CreatedAtAction("Get", new { id = a.Id }, a);
            }
            catch
            {
                return StatusCode(500);
            }
        }

        // Method for altering an artist
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] Artist alteredArtist)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _context.Entry(alteredArtist).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch
            {
                return BadRequest();
            }
        }

        // Method for deleting an artist with a given id
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

                    // Checking if all artists are deleted from table in db. If they are, then:
                    if (!await _context.Artists.AnyAsync())
                    {
                        // Reset auto-increment to 1
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
}
