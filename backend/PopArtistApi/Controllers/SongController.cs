using Microsoft.AspNetCore.Mvc;
using PopArtistApi.Models;
using Microsoft.EntityFrameworkCore;

namespace PopArtistApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SongController : ControllerBase
    {
        private readonly ArtistContext context;

        public SongController(ArtistContext _context)
        {
            context = _context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Song>>> Get()
        {
            try
            {
                List<Song> songs = await context.Songs.ToListAsync();
                return Ok(songs);
            }
            catch
            {
                return StatusCode(500);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Song>> GetById(int id)
        {
            try
            {
                Song? song = await context.Songs.FindAsync(id);

                if (song != null)
                {
                    return Ok(song);
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

        [HttpPost]
        public async Task<ActionResult<Song>> PostSong([FromBody] Song s)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                context.Songs.Add(s);
                await context.SaveChangesAsync();

                return CreatedAtAction("Get", new { id = s.Id }, s);
            }
            catch
            {
                return StatusCode(500);
            }
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody] Song alteredSong)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                context.Entry(alteredSong).State = EntityState.Modified;
                await context.SaveChangesAsync();

                return NoContent();
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                Song? songToDelete = await context.Songs.FindAsync(id);
                if (songToDelete != null)
                {
                    context.Songs.Remove(songToDelete);
                    await context.SaveChangesAsync();

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