using Microsoft.AspNetCore.Mvc;
using PopArtistApi.Models;
using Microsoft.EntityFrameworkCore;

namespace PopArtistApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AlbumController : ControllerBase
    {
        private readonly ArtistContext context;

        public AlbumController(ArtistContext _context)
        {
            context = _context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Album>>> Get()
        {
            try
            {
                List<Album> albums = await context.Albums.Include(a => a.Songs).ToListAsync();
                return Ok(albums);
            }
            catch
            {
                return StatusCode(500);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Album>> GetById(int id)
        {
            try
            {
                Album? album = await context.Albums.Include(a => a.Songs).FirstOrDefaultAsync(a => a.Id == id);

                if (album != null)
                {
                    return Ok(album);
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
        public async Task<ActionResult<Album>> PostAlbum([FromBody] Album a)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                context.Albums.Add(a);
                await context.SaveChangesAsync();

                return CreatedAtAction("Get", new { id = a.Id }, a);
            }
            catch
            {
                return StatusCode(500);
            }
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody] Album alteredAlbum)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                context.Entry(alteredAlbum).State = EntityState.Modified;
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
                Album? albumToDelete = await context.Albums.FindAsync(id);
                if (albumToDelete != null)
                {
                    context.Albums.Remove(albumToDelete);
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