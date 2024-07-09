using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using DotNetEnv;

var builder = WebApplication.CreateBuilder(args);

// Load environment variables from .env file
DotNetEnv.Env.Load();

// Configure CORS policy
builder.Services.AddCors(options => {
    options.AddPolicy("AllowAnyOrigin",
        builder => builder
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader()
    );
});

// Add DbContext with SQLite
builder.Services.AddDbContext<ArtistContext>(options =>
    options.UseSqlite("Data Source=Artists.db")
);

// Add services to the container
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    });

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure default files options
DefaultFilesOptions defaultFilesOptions = new DefaultFilesOptions();
defaultFilesOptions.DefaultFileNames.Add("index.html");
app.UseDefaultFiles(defaultFilesOptions);

// Use CORS policy
app.UseCors("AllowAnyOrigin");

// Serve static files
app.UseStaticFiles();

// Seed the database
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    try
    {
        var context = services.GetRequiredService<ArtistContext>();
        DbInitializer.Initialize(context);
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred seeding the DB.");
    }
}

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

var apiUrl = Environment.GetEnvironmentVariable("API_URL");
if (!string.IsNullOrEmpty(apiUrl))
{
    app.Urls.Add(apiUrl);
}

app.UseHttpsRedirection();
app.UseAuthorization();

// Add a new endpoint to expose environment variables
app.MapGet("/env", () => new
{
    ApiUrl = Environment.GetEnvironmentVariable("API_URL"),
    SwaggerUrl = Environment.GetEnvironmentVariable("SWAGGER_URL")
}).RequireCors("AllowAnyOrigin"); // Apply CORS policy

app.MapControllers();

app.Run();
