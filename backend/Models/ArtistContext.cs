#nullable disable
using Microsoft.EntityFrameworkCore;

public class ArtistContext : DbContext
{
    public ArtistContext(DbContextOptions<ArtistContext> options) : base(options) { }

    public DbSet<PopArtistApi.Models.Artist> Artists { get; set; } = null!;
    public DbSet<PopArtistApi.Models.Album> Albums { get; set; }
    public DbSet<PopArtistApi.Models.Song> Songs { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<PopArtistApi.Models.Artist>()
            .HasMany(a => a.Albums)
            .WithOne(al => al.Artist)
            .HasForeignKey(al => al.ArtistId);

        modelBuilder.Entity<PopArtistApi.Models.Album>()
            .HasMany(al => al.Songs)
            .WithOne(s => s.Album)
            .HasForeignKey(s => s.AlbumId);
    }
}
