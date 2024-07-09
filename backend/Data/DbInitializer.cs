using PopArtistApi.Models;

public static class DbInitializer
{
    public static void Initialize(ArtistContext context)
    {
        context.Database.EnsureCreated();

        if (context.Artists.Any())
        {
            return;
        }

        var artists = new Artist[]
        {
            new Artist
{
    Id = 1,
    ArtistName = "Ariana Grande",
    Genre = "Pop",
    Image = "ariana-grande.png",
    Description = "American singer and actress known for her wide vocal range. She began her career in the Broadway musical '13' before landing the role of Cat Valentine on the Nickelodeon television series 'Victorious'. Grande has since become one of the best-selling music artists of all time, with numerous awards and accolades to her name. Her music often features themes of love, empowerment, and self-reflection.",
    Albums = new List<Album>
    {
        new Album
        {
            Id = 1,
            AlbumName = "Sweetener",
            ArtistId = 1,
            AlbumImage = "sweetener.png",
            Songs = new List<Song>
            {
                new Song { Id = 1, SongName = "Raindrops (An Angel Cried)", AlbumId = 1 },
                new Song { Id = 2, SongName = "Blazed", AlbumId = 1 },
                new Song { Id = 3, SongName = "The Light Is Coming", AlbumId = 1 },
                new Song { Id = 4, SongName = "R.E.M", AlbumId = 1 },
                new Song { Id = 5, SongName = "God is a Woman", AlbumId = 1 },
                new Song { Id = 6, SongName = "Sweetener", AlbumId = 1 },
                new Song { Id = 7, SongName = "Successful", AlbumId = 1 },
                new Song { Id = 8, SongName = "Everytime", AlbumId = 1 },
                new Song { Id = 9, SongName = "Breathin", AlbumId = 1 },
                new Song { Id = 10, SongName = "No Tears Left to Cry", AlbumId = 1 },
                new Song { Id = 11, SongName = "Borderline", AlbumId = 1 },
                new Song { Id = 12, SongName = "Better Off", AlbumId = 1 },
                new Song { Id = 13, SongName = "Goodnight n Go", AlbumId = 1 },
                new Song { Id = 14, SongName = "Pete Davidson", AlbumId = 1 },
                new Song { Id = 15, SongName = "Get Well Soon", AlbumId = 1 }
            }
        },
        new Album
        {
            Id = 2,
            AlbumName = "Thank U, Next",
            ArtistId = 1,
            AlbumImage = "thank-u-next.png",
            Songs = new List<Song>
            {
                new Song { Id = 16, SongName = "Imagine", AlbumId = 2 },
                new Song { Id = 17, SongName = "Needy", AlbumId = 2 },
                new Song { Id = 18, SongName = "NASA", AlbumId = 2 },
                new Song { Id = 19, SongName = "Bloodline", AlbumId = 2 },
                new Song { Id = 20, SongName = "Fake Smile", AlbumId = 2 },
                new Song { Id = 21, SongName = "Bad Idea", AlbumId = 2 },
                new Song { Id = 22, SongName = "Make Up", AlbumId = 2 },
                new Song { Id = 23, SongName = "Ghostin", AlbumId = 2 },
                new Song { Id = 24, SongName = "In My Head", AlbumId = 2 },
                new Song { Id = 25, SongName = "7 Rings", AlbumId = 2 },
                new Song { Id = 26, SongName = "Thank U, Next", AlbumId = 2 },
                new Song { Id = 27, SongName = "Break Up with Your Girlfriend, I'm Bored", AlbumId = 2 }
            }
        }
    }
},
            new Artist
{
    Id = 2,
    ArtistName = "Beyoncé",
    Genre = "Pop",
    Image = "beyonce.jpeg",
    Description = "American singer, songwriter, and actress. Known for her powerful vocals and electrifying performances, she first gained fame as the lead singer of Destiny's Child. Beyoncé has since established herself as a solo artist with numerous chart-topping hits and critically acclaimed albums. She is also a prominent advocate for various social and political causes.",
    Albums = new List<Album>
    {
        new Album
        {
            Id = 3,
            AlbumName = "Lemonade",
            ArtistId = 2,
            AlbumImage = "lemonade.png",
            Songs = new List<Song>
            {
                new Song { Id = 28, SongName = "Pray You Catch Me", AlbumId = 3 },
                new Song { Id = 29, SongName = "Hold Up", AlbumId = 3 },
                new Song { Id = 30, SongName = "Don't Hurt Yourself", AlbumId = 3 },
                new Song { Id = 31, SongName = "Sorry", AlbumId = 3 },
                new Song { Id = 32, SongName = "6 Inch", AlbumId = 3 },
                new Song { Id = 33, SongName = "Daddy Lessons", AlbumId = 3 },
                new Song { Id = 34, SongName = "Love Drought", AlbumId = 3 },
                new Song { Id = 35, SongName = "Sandcastles", AlbumId = 3 },
                new Song { Id = 36, SongName = "Forward", AlbumId = 3 },
                new Song { Id = 37, SongName = "Freedom", AlbumId = 3 },
                new Song { Id = 38, SongName = "All Night", AlbumId = 3 },
                new Song { Id = 39, SongName = "Formation", AlbumId = 3 }
            }
        },
        new Album
        {
            Id = 4,
            AlbumName = "Beyoncé",
            ArtistId = 2,
            AlbumImage = "beyonce.png",
            Songs = new List<Song>
            {
                new Song { Id = 40, SongName = "Pretty Hurts", AlbumId = 4 },
                new Song { Id = 41, SongName = "Haunted", AlbumId = 4 },
                new Song { Id = 42, SongName = "Drunk in Love", AlbumId = 4 },
                new Song { Id = 43, SongName = "Blow", AlbumId = 4 },
                new Song { Id = 44, SongName = "No Angel", AlbumId = 4 },
                new Song { Id = 45, SongName = "Partition", AlbumId = 4 },
                new Song { Id = 46, SongName = "Jealous", AlbumId = 4 },
                new Song { Id = 47, SongName = "Rocket", AlbumId = 4 },
                new Song { Id = 48, SongName = "Mine", AlbumId = 4 },
                new Song { Id = 49, SongName = "XO", AlbumId = 4 },
                new Song { Id = 50, SongName = "Flawless", AlbumId = 4 },
                new Song { Id = 51, SongName = "Superpower", AlbumId = 4 },
                new Song { Id = 52, SongName = "Heaven", AlbumId = 4 },
                new Song { Id = 53, SongName = "Blue", AlbumId = 4 }
            }
        }
    }
},
            new Artist
{
    Id = 3,
    ArtistName = "Doja Cat",
    Genre = "Pop",
    Image = "doja-cat.png",
    Description = "American rapper, singer, songwriter, and record producer. Known for her genre-blending music style, Doja Cat rose to prominence with her viral hit 'Mooo!'. She has since released multiple successful albums and singles, earning critical acclaim and a large fan base. Her music often features playful lyrics, catchy melodies, and a distinctive sense of humor.",
    Albums = new List<Album>
    {
        new Album
        {
            Id = 5,
            AlbumName = "Hot Pink",
            ArtistId = 3,
            AlbumImage = "hot-pink.png",
            Songs = new List<Song>
            {
                new Song { Id = 54, SongName = "Cyber Sex", AlbumId = 5 },
                new Song { Id = 55, SongName = "Won't Bite", AlbumId = 5 },
                new Song { Id = 56, SongName = "Rules", AlbumId = 5 },
                new Song { Id = 57, SongName = "Bottom Bitch", AlbumId = 5 },
                new Song { Id = 58, SongName = "Say So", AlbumId = 5 },
                new Song { Id = 59, SongName = "Like That", AlbumId = 5 },
                new Song { Id = 60, SongName = "Talk Dirty", AlbumId = 5 },
                new Song { Id = 61, SongName = "Addiction", AlbumId = 5 },
                new Song { Id = 62, SongName = "Streets", AlbumId = 5 },
                new Song { Id = 63, SongName = "Shine", AlbumId = 5 },
                new Song { Id = 64, SongName = "Better Than Me", AlbumId = 5 },
                new Song { Id = 65, SongName = "Juicy", AlbumId = 5 }
            }
        },
        new Album
        {
            Id = 6,
            AlbumName = "Planet Her",
            ArtistId = 3,
            AlbumImage = "planet-her.png",
            Songs = new List<Song>
            {
                new Song { Id = 66, SongName = "Woman", AlbumId = 6 },
                new Song { Id = 67, SongName = "Naked", AlbumId = 6 },
                new Song { Id = 68, SongName = "Payday", AlbumId = 6 },
                new Song { Id = 69, SongName = "Get Into It (Yuh)", AlbumId = 6 },
                new Song { Id = 70, SongName = "Need to Know", AlbumId = 6 },
                new Song { Id = 71, SongName = "I Don't Do Drugs", AlbumId = 6 },
                new Song { Id = 72, SongName = "Love to Dream", AlbumId = 6 },
                new Song { Id = 73, SongName = "You Right", AlbumId = 6 },
                new Song { Id = 74, SongName = "Been Like This", AlbumId = 6 },
                new Song { Id = 75, SongName = "Options", AlbumId = 6 },
                new Song { Id = 76, SongName = "Ain't Shit", AlbumId = 6 },
                new Song { Id = 77, SongName = "Imagine", AlbumId = 6 },
                new Song { Id = 78, SongName = "Alone", AlbumId = 6 },
                new Song { Id = 79, SongName = "Kiss Me More", AlbumId = 6 }
            }
        }
    }
},
           new Artist
{
    Id = 4,
    ArtistName = "Katy Perry",
    Genre = "Pop",
    Image = "katy-perry.jpg",
    Description = "American singer, songwriter, and television judge. Known for her playful style and catchy pop hits, Katy Perry has become one of the best-selling music artists of all time. She gained fame with her breakout single 'I Kissed a Girl' and has since released numerous chart-topping albums. In addition to her music career, Perry has served as a judge on the television show 'American Idol' and is known for her vibrant performances and philanthropic efforts.",
    Albums = new List<Album>
    {
        new Album
        {
            Id = 7,
            AlbumName = "Teenage Dream",
            ArtistId = 4,
            AlbumImage = "teenage-dream.png",
            Songs = new List<Song>
            {
                new Song { Id = 80, SongName = "Teenage Dream", AlbumId = 7 },
                new Song { Id = 81, SongName = "Last Friday Night (T.G.I.F.)", AlbumId = 7 },
                new Song { Id = 82, SongName = "California Gurls", AlbumId = 7 },
                new Song { Id = 83, SongName = "Firework", AlbumId = 7 },
                new Song { Id = 84, SongName = "Peacock", AlbumId = 7 },
                new Song { Id = 85, SongName = "Circle the Drain", AlbumId = 7 },
                new Song { Id = 86, SongName = "The One That Got Away", AlbumId = 7 },
                new Song { Id = 87, SongName = "E.T.", AlbumId = 7 },
                new Song { Id = 88, SongName = "Who Am I Living For?", AlbumId = 7 },
                new Song { Id = 89, SongName = "Pearl", AlbumId = 7 },
                new Song { Id = 90, SongName = "Hummingbird Heartbeat", AlbumId = 7 },
                new Song { Id = 91, SongName = "Not Like the Movies", AlbumId = 7 }
            }
        },
        new Album
        {
            Id = 8,
            AlbumName = "Prism",
            ArtistId = 4,
            AlbumImage = "prism.png",
            Songs = new List<Song>
            {
                new Song { Id = 92, SongName = "Roar", AlbumId = 8 },
                new Song { Id = 93, SongName = "Legendary Lovers", AlbumId = 8 },
                new Song { Id = 94, SongName = "Birthday", AlbumId = 8 },
                new Song { Id = 95, SongName = "Walking on Air", AlbumId = 8 },
                new Song { Id = 96, SongName = "Unconditionally", AlbumId = 8 },
                new Song { Id = 97, SongName = "Dark Horse", AlbumId = 8 },
                new Song { Id = 98, SongName = "This Is How We Do", AlbumId = 8 },
                new Song { Id = 99, SongName = "International Smile", AlbumId = 8 },
                new Song { Id = 100, SongName = "Ghost", AlbumId = 8 },
                new Song { Id = 101, SongName = "Love Me", AlbumId = 8 },
                new Song { Id = 102, SongName = "This Moment", AlbumId = 8 },
                new Song { Id = 103, SongName = "Double Rainbow", AlbumId = 8 },
                new Song { Id = 104, SongName = "By the Grace of God", AlbumId = 8 }
            }
        }
    }
},
            new Artist
{
    Id = 5,
    ArtistName = "Madonna",
    Genre = "Pop",
    Image = "madonna.jpg",
    Description = "American singer, songwriter, and actress. Often referred to as the 'Queen of Pop', Madonna is known for pushing the boundaries of songwriting in mainstream popular music. Her versatility in music production and visual presentation has kept her at the forefront of the music industry. Over her illustrious career, she has been a cultural icon, known for reinventing both her music and image.",
    Albums = new List<Album>
    {
        new Album
        {
            Id = 9,
            AlbumName = "Like a Virgin",
            ArtistId = 5,
            AlbumImage = "like-a-virgin.png",
            Songs = new List<Song>
            {
                new Song { Id = 105, SongName = "Material Girl", AlbumId = 9 },
                new Song { Id = 106, SongName = "Angel", AlbumId = 9 },
                new Song { Id = 107, SongName = "Like a Virgin", AlbumId = 9 },
                new Song { Id = 108, SongName = "Over and Over", AlbumId = 9 },
                new Song { Id = 109, SongName = "Love Don't Live Here Anymore", AlbumId = 9 },
                new Song { Id = 110, SongName = "Dress You Up", AlbumId = 9 },
                new Song { Id = 111, SongName = "Shoo-Bee-Doo", AlbumId = 9 },
                new Song { Id = 112, SongName = "Pretender", AlbumId = 9 },
                new Song { Id = 113, SongName = "Stay", AlbumId = 9 }
            }
        },
        new Album
        {
            Id = 10,
            AlbumName = "True Blue",
            ArtistId = 5,
            AlbumImage = "true-blue.png",
            Songs = new List<Song>
            {
                new Song { Id = 114, SongName = "Papa Don't Preach", AlbumId = 10 },
                new Song { Id = 115, SongName = "Open Your Heart", AlbumId = 10 },
                new Song { Id = 116, SongName = "White Heat", AlbumId = 10 },
                new Song { Id = 117, SongName = "Live to Tell", AlbumId = 10 },
                new Song { Id = 118, SongName = "Where's the Party", AlbumId = 10 },
                new Song { Id = 119, SongName = "True Blue", AlbumId = 10 },
                new Song { Id = 120, SongName = "La Isla Bonita", AlbumId = 10 },
                new Song { Id = 121, SongName = "Jimmy Jimmy", AlbumId = 10 },
                new Song { Id = 122, SongName = "Love Makes the World Go Round", AlbumId = 10 }
            }
        }
    }
},
            new Artist
{
    Id = 6,
    ArtistName = "Michael Jackson",
    Genre = "Pop",
    Image = "michael-jackson.jpg",
    Description = "American singer, songwriter, and dancer. Known as the 'King of Pop', Michael Jackson is celebrated for his groundbreaking contributions to music, dance, and fashion. He is one of the best-selling music artists of all time, with numerous awards and accolades. Jackson's innovative music videos and electrifying stage presence have left a lasting legacy in the entertainment industry.",
    Albums = new List<Album>
    {
        new Album
        {
            Id = 11,
            AlbumName = "Thriller",
            ArtistId = 6,
            AlbumImage = "thriller.png",
            Songs = new List<Song>
            {
                new Song { Id = 123, SongName = "Wanna Be Startin' Somethin'", AlbumId = 11 },
                new Song { Id = 124, SongName = "Baby Be Mine", AlbumId = 11 },
                new Song { Id = 125, SongName = "The Girl Is Mine", AlbumId = 11 },
                new Song { Id = 126, SongName = "Thriller", AlbumId = 11 },
                new Song { Id = 127, SongName = "Beat It", AlbumId = 11 },
                new Song { Id = 128, SongName = "Billie Jean", AlbumId = 11 },
                new Song { Id = 129, SongName = "Human Nature", AlbumId = 11 },
                new Song { Id = 130, SongName = "P.Y.T. (Pretty Young Thing)", AlbumId = 11 },
                new Song { Id = 131, SongName = "The Lady in My Life", AlbumId = 11 }
            }
        },
        new Album
        {
            Id = 12,
            AlbumName = "Bad",
            ArtistId = 6,
            AlbumImage = "bad.png",
            Songs = new List<Song>
            {
                new Song { Id = 132, SongName = "Bad", AlbumId = 12 },
                new Song { Id = 133, SongName = "The Way You Make Me Feel", AlbumId = 12 },
                new Song { Id = 134, SongName = "Speed Demon", AlbumId = 12 },
                new Song { Id = 135, SongName = "Liberian Girl", AlbumId = 12 },
                new Song { Id = 136, SongName = "Just Good Friends", AlbumId = 12 },
                new Song { Id = 137, SongName = "Another Part of Me", AlbumId = 12 },
                new Song { Id = 138, SongName = "Man in the Mirror", AlbumId = 12 },
                new Song { Id = 139, SongName = "I Just Can't Stop Loving You", AlbumId = 12 },
                new Song { Id = 140, SongName = "Dirty Diana", AlbumId = 12 },
                new Song { Id = 141, SongName = "Smooth Criminal", AlbumId = 12 },
                new Song { Id = 142, SongName = "Leave Me Alone", AlbumId = 12 }
            }
        }
    }
},
new Artist
{
    Id = 7,
    ArtistName = "Rihanna",
    Genre = "Pop",
    Image = "rihanna.png",
    Description = "Barbadian singer, actress, and businesswoman. Rihanna rose to fame with her distinctive voice and genre-blending music, earning her numerous awards and accolades. She is also known for her successful ventures in fashion and beauty with her brands Fenty Beauty and Savage X Fenty. Rihanna is celebrated for her philanthropic efforts, particularly in education and emergency response programs.",
    Albums = new List<Album>
    {
        new Album
        {
            Id = 13,
            AlbumName = "Good Girl Gone Bad",
            ArtistId = 7,
            AlbumImage = "good-girl-gone-bad.png",
            Songs = new List<Song>
            {
                new Song { Id = 143, SongName = "Umbrella", AlbumId = 13 },
                new Song { Id = 144, SongName = "Push Up On Me", AlbumId = 13 },
                new Song { Id = 145, SongName = "Don't Stop the Music", AlbumId = 13 },
                new Song { Id = 146, SongName = "Breakin' Dishes", AlbumId = 13 },
                new Song { Id = 147, SongName = "Shut Up and Drive", AlbumId = 13 },
                new Song { Id = 148, SongName = "Hate That I Love You", AlbumId = 13 },
                new Song { Id = 149, SongName = "Say It", AlbumId = 13 },
                new Song { Id = 150, SongName = "Sell Me Candy", AlbumId = 13 },
                new Song { Id = 151, SongName = "Lemme Get That", AlbumId = 13 },
                new Song { Id = 152, SongName = "Rehab", AlbumId = 13 },
                new Song { Id = 153, SongName = "Question Existing", AlbumId = 13 },
                new Song { Id = 154, SongName = "Good Girl Gone Bad", AlbumId = 13 },
                new Song { Id = 155, SongName = "Disturbia", AlbumId = 13 },
                new Song { Id = 156, SongName = "Take a Bow", AlbumId = 13 },
                new Song { Id = 157, SongName = "If I Never See Your Face Again", AlbumId = 13 }
            }
        },
        new Album
        {
            Id = 14,
            AlbumName = "Loud",
            ArtistId = 7,
            AlbumImage = "loud.png",
            Songs = new List<Song>
            {
                new Song { Id = 158, SongName = "S&M", AlbumId = 14 },
                new Song { Id = 159, SongName = "What's My Name?", AlbumId = 14 },
                new Song { Id = 160, SongName = "Cheers (Drink to That)", AlbumId = 14 },
                new Song { Id = 161, SongName = "Fading", AlbumId = 14 },
                new Song { Id = 162, SongName = "Only Girl (In the World)", AlbumId = 14 },
                new Song { Id = 163, SongName = "California King Bed", AlbumId = 14 },
                new Song { Id = 164, SongName = "Man Down", AlbumId = 14 },
                new Song { Id = 165, SongName = "Raining Men", AlbumId = 14 },
                new Song { Id = 166, SongName = "Complicated", AlbumId = 14 },
                new Song { Id = 167, SongName = "Skin", AlbumId = 14 },
                new Song { Id = 168, SongName = "Love the Way You Lie (Part II)", AlbumId = 14 }
            }
        }
    }
},
            new Artist
{
    Id = 8,
    ArtistName = "Astrid S",
    Genre = "Pop",
    Image = "astrid-s.png",
    Description = "Norwegian singer and songwriter. Astrid S first gained fame in 2013 as a contestant on the Norwegian version of Pop Idol. Known for her ethereal voice and heartfelt lyrics, she has since released multiple successful singles and albums. Astrid S has also received numerous awards and nominations in Norway and internationally for her contributions to music.",
    Albums = new List<Album>
    {
        new Album
        {
            Id = 15,
            AlbumName = "Leave It Beautiful",
            ArtistId = 8,
            AlbumImage = "leave-it-beautiful.png",
            Songs = new List<Song>
            {
                new Song { Id = 169, SongName = "Marilyn Monroe", AlbumId = 15 },
                new Song { Id = 170, SongName = "Dance Dance Dance", AlbumId = 15 },
                new Song { Id = 171, SongName = "Hits Different", AlbumId = 15 },
                new Song { Id = 172, SongName = "It's Ok If You Forget Me", AlbumId = 15 },
                new Song { Id = 173, SongName = "Airpods", AlbumId = 15 },
                new Song { Id = 174, SongName = "Good Choices", AlbumId = 15 },
                new Song { Id = 175, SongName = "Obsessed", AlbumId = 15 },
                new Song { Id = 176, SongName = "Leave It Beautiful", AlbumId = 15 },
                new Song { Id = 177, SongName = "Can’t Forget", AlbumId = 15 },
                new Song { Id = 178, SongName = "I Don't Know Why", AlbumId = 15 }
            }
        },
        new Album
        {
            Id = 16,
            AlbumName = "Down Low",
            ArtistId = 8,
            AlbumImage = "down-low.png",
            Songs = new List<Song>
            {
                new Song { Id = 179, SongName = "Paper Thin", AlbumId = 16 },
                new Song { Id = 180, SongName = "Good Choices", AlbumId = 16 },
                new Song { Id = 181, SongName = "Down Low", AlbumId = 16 },
                new Song { Id = 182, SongName = "Closer", AlbumId = 16 },
                new Song { Id = 183, SongName = "Partys Over", AlbumId = 16 },
                new Song { Id = 184, SongName = "Favorite Part of Me", AlbumId = 16 },
                new Song { Id = 185, SongName = "Years", AlbumId = 16 }
            }
        }
    }
},
           new Artist
{
    Id = 9,
    ArtistName = "Dagny",
    Genre = "Pop",
    Image = "dagny.jpg",
    Description = "Norwegian singer and songwriter. Dagny has gained international recognition for her catchy pop melodies and heartfelt lyrics. She first rose to prominence with her single 'Backbeat', and has since released a series of successful singles and albums. Dagny's music often explores themes of love, heartbreak, and self-discovery, resonating with a wide audience.",
    Albums = new List<Album>
    {
        new Album
        {
            Id = 17,
            AlbumName = "Strangers / Lovers",
            ArtistId = 9,
            AlbumImage = "strangers-lovers.png",
            Songs = new List<Song>
            {
                new Song { Id = 186, SongName = "Come Over", AlbumId = 17 },
                new Song { Id = 187, SongName = "Somebody", AlbumId = 17 },
                new Song { Id = 188, SongName = "Paris", AlbumId = 17 },
                new Song { Id = 189, SongName = "Let Me Cry", AlbumId = 17 },
                new Song { Id = 190, SongName = "Coulda Woulda Shoulda", AlbumId = 17 },
                new Song { Id = 191, SongName = "Tension", AlbumId = 17 },
                new Song { Id = 192, SongName = "Bad At Love", AlbumId = 17 },
                new Song { Id = 193, SongName = "It's Only a Heartbreak", AlbumId = 17 },
                new Song { Id = 194, SongName = "Bye Bye Baby", AlbumId = 17 },
                new Song { Id = 195, SongName = "Coast to Coast", AlbumId = 17 }
            }
        },
        new Album
        {
            Id = 18,
            AlbumName = "Ultraviolet",
            ArtistId = 9,
            AlbumImage = "ultraviolet.png",
            Songs = new List<Song>
            {
                new Song { Id = 196, SongName = "Backbeat", AlbumId = 18 },
                new Song { Id = 197, SongName = "Ultraviolet", AlbumId = 18 },
                new Song { Id = 198, SongName = "Fight Sleep", AlbumId = 18 },
                new Song { Id = 199, SongName = "Wearing Nothing", AlbumId = 18 },
                new Song { Id = 200, SongName = "Used To You", AlbumId = 18 },
                new Song { Id = 201, SongName = "Too Young", AlbumId = 18 }
            }
        }
    }
},
            new Artist
{
    Id = 10,
    ArtistName = "Sigrid",
    Genre = "Pop",
    Image = "sigrid.png",
    Description = "Norwegian singer and songwriter. Sigrid gained international fame with her breakout single 'Don't Kill My Vibe'. Known for her powerful voice and candid lyrics, she has quickly become a prominent figure in pop music. Sigrid's work is characterized by its catchy melodies and relatable themes, making her a favorite among fans and critics alike.",
    Albums = new List<Album>
    {
        new Album
        {
            Id = 19,
            AlbumName = "Sucker Punch",
            ArtistId = 10,
            AlbumImage = "sucker-punch.png",
            Songs = new List<Song>
            {
                new Song { Id = 202, SongName = "Sucker Punch", AlbumId = 19 },
                new Song { Id = 203, SongName = "Mine Right Now", AlbumId = 19 },
                new Song { Id = 204, SongName = "Basic", AlbumId = 19 },
                new Song { Id = 205, SongName = "Strangers", AlbumId = 19 },
                new Song { Id = 206, SongName = "Don't Feel Like Crying", AlbumId = 19 },
                new Song { Id = 207, SongName = "Level Up", AlbumId = 19 },
                new Song { Id = 208, SongName = "Sight of You", AlbumId = 19 },
                new Song { Id = 209, SongName = "In Vain", AlbumId = 19 },
                new Song { Id = 210, SongName = "Don't Kill My Vibe", AlbumId = 19 },
                new Song { Id = 211, SongName = "Business Dinners", AlbumId = 19 },
                new Song { Id = 212, SongName = "Never Mine", AlbumId = 19 },
                new Song { Id = 213, SongName = "Dynamite", AlbumId = 19 }
            }
        },
        new Album
        {
            Id = 20,
            AlbumName = "How to Let Go",
            ArtistId = 10,
            AlbumImage = "how-to-let-go.png",
            Songs = new List<Song>
            {
                new Song { Id = 214, SongName = "It Gets Dark", AlbumId = 20 },
                new Song { Id = 215, SongName = "Burning Bridges", AlbumId = 20 },
                new Song { Id = 216, SongName = "Risk of Getting Hurt", AlbumId = 20 },
                new Song { Id = 217, SongName = "Thank Me Later", AlbumId = 20 },
                new Song { Id = 218, SongName = "Mirror", AlbumId = 20 },
                new Song { Id = 219, SongName = "Last to Know", AlbumId = 20 },
                new Song { Id = 220, SongName = "Dancer", AlbumId = 20 },
                new Song { Id = 221, SongName = "A Driver Saved My Night", AlbumId = 20 },
                new Song { Id = 222, SongName = "Mistake Like You", AlbumId = 20 },
                new Song { Id = 223, SongName = "Grow", AlbumId = 20 },
                new Song { Id = 224, SongName = "High Note", AlbumId = 20 }
            }
        }
    }
},
            new Artist
{
    Id = 11,
    ArtistName = "Solange",
    Genre = "Pop",
    Image = "solange.png",
    Description = "American singer, songwriter, and actress. Solange is known for her unique blend of R&B, soul, and funk, often exploring themes of identity, empowerment, and social justice in her music. She has received critical acclaim for her innovative sound and artistic vision. In addition to her music career, Solange is also a visual artist and has been involved in various creative projects.",
    Albums = new List<Album>
    {
        new Album
        {
            Id = 21,
            AlbumName = "A Seat at the Table",
            ArtistId = 11,
            AlbumImage = "a-seat-at-the-table.png",
            Songs = new List<Song>
            {
                new Song { Id = 225, SongName = "Rise", AlbumId = 21 },
                new Song { Id = 226, SongName = "Weary", AlbumId = 21 },
                new Song { Id = 227, SongName = "Interlude: The Glory Is in You", AlbumId = 21 },
                new Song { Id = 228, SongName = "Cranes in the Sky", AlbumId = 21 },
                new Song { Id = 229, SongName = "Interlude: Dad Was Mad", AlbumId = 21 },
                new Song { Id = 230, SongName = "Mad", AlbumId = 21 },
                new Song { Id = 231, SongName = "Don't You Wait", AlbumId = 21 },
                new Song { Id = 232, SongName = "Interlude: Tina Taught Me", AlbumId = 21 },
                new Song { Id = 233, SongName = "Don't Touch My Hair", AlbumId = 21 },
                new Song { Id = 234, SongName = "Interlude: This Moment", AlbumId = 21 },
                new Song { Id = 235, SongName = "Where Do We Go", AlbumId = 21 },
                new Song { Id = 236, SongName = "Interlude: For Us By Us", AlbumId = 21 },
                new Song { Id = 237, SongName = "F.U.B.U.", AlbumId = 21 },
                new Song { Id = 238, SongName = "Borderline (An Ode to Self Care)", AlbumId = 21 },
                new Song { Id = 239, SongName = "Interlude: I Got So Much Magic, You Can Have It", AlbumId = 21 },
                new Song { Id = 240, SongName = "Junie", AlbumId = 21 },
                new Song { Id = 241, SongName = "Interlude: No Limits", AlbumId = 21 },
                new Song { Id = 242, SongName = "Don't Wish Me Well", AlbumId = 21 },
                new Song { Id = 243, SongName = "Interlude: Pedestals", AlbumId = 21 },
                new Song { Id = 244, SongName = "Scales", AlbumId = 21 },
                new Song { Id = 245, SongName = "Closing: The Chosen Ones", AlbumId = 21 }
            }
        },
        new Album
        {
            Id = 22,
            AlbumName = "When I Get Home",
            ArtistId = 11,
            AlbumImage = "when-i-get-home.png",
            Songs = new List<Song>
            {
                new Song { Id = 246, SongName = "Things I Imagined", AlbumId = 22 },
                new Song { Id = 247, SongName = "S McGregor (Interlude)", AlbumId = 22 },
                new Song { Id = 248, SongName = "Down With the Clique", AlbumId = 22 },
                new Song { Id = 249, SongName = "Way to the Show", AlbumId = 22 },
                new Song { Id = 250, SongName = "Can I Hold the Mic (Interlude)", AlbumId = 22 },
                new Song { Id = 251, SongName = "Stay Flo", AlbumId = 22 },
                new Song { Id = 252, SongName = "Dreams", AlbumId = 22 },
                new Song { Id = 253, SongName = "Nothing Without Intention (Interlude)", AlbumId = 22 },
                new Song { Id = 254, SongName = "Almeda", AlbumId = 22 },
                new Song { Id = 255, SongName = "Time (Is)", AlbumId = 22 },
                new Song { Id = 256, SongName = "My Skin My Logo", AlbumId = 22 },
                new Song { Id = 257, SongName = "We Deal With the Freak'n (Intermission)", AlbumId = 22 },
                new Song { Id = 258, SongName = "Jerrod", AlbumId = 22 },
                new Song { Id = 259, SongName = "Binz", AlbumId = 22 },
                new Song { Id = 260, SongName = "Beltway", AlbumId = 22 },
                new Song { Id = 261, SongName = "Exit Scott (Interlude)", AlbumId = 22 },
                new Song { Id = 262, SongName = "Sound of Rain", AlbumId = 22 },
                new Song { Id = 263, SongName = "Not Screwed! (Interlude)", AlbumId = 22 },
                new Song { Id = 264, SongName = "I'm a Witness", AlbumId = 22 }
            }
        }
    }
},
                        new Artist
            {
                Id = 12,
                ArtistName = "Arif",
                Genre = "Hip-hop",
                Image = "arif.png",
                Description = "Norwegian hip-hop artist. Arif is known for his unique sound and innovative approach to hip-hop. He has gained a significant following in Norway with his thought-provoking lyrics and engaging performances. Arif's music often explores themes of identity, struggle, and personal growth, resonating with a wide audience.",
                Albums = new List<Album>
                {
                    new Album
                    {
                        Id = 23,
                        AlbumName = "Arif i Waanderland",
                        ArtistId = 12,
                        AlbumImage = "arif-i-waanderland.png",
                        Songs = new List<Song>
                        {
                            new Song { Id = 265, SongName = "Sulten", AlbumId = 23 },
                            new Song { Id = 266, SongName = "Himmelen", AlbumId = 23 },
                            new Song { Id = 267, SongName = "Alene", AlbumId = 23 },
                            new Song { Id = 268, SongName = "Siste Sjans", AlbumId = 23 },
                            new Song { Id = 269, SongName = "Himmelhøge", AlbumId = 23 },
                            new Song { Id = 270, SongName = "Ikke som de andre", AlbumId = 23 },
                            new Song { Id = 271, SongName = "Flammer", AlbumId = 23 },
                            new Song { Id = 272, SongName = "Påfugl", AlbumId = 23 },
                            new Song { Id = 273, SongName = "Vill", AlbumId = 23 },
                            new Song { Id = 274, SongName = "Våken", AlbumId = 23 }
                        }
                    },
                    new Album
                    {
                        Id = 24,
                        AlbumName = "Meg & Deg Mot Alle",
                        ArtistId = 12,
                        AlbumImage = "meg-deg-mot-alle.png",
                        Songs = new List<Song>
                        {
                            new Song { Id = 275, SongName = "Flammer", AlbumId = 24 },
                            new Song { Id = 276, SongName = "Vekk Meg Opp", AlbumId = 24 },
                            new Song { Id = 277, SongName = "Løpe Hjem", AlbumId = 24 },
                            new Song { Id = 278, SongName = "Savnet", AlbumId = 24 },
                            new Song { Id = 279, SongName = "Ingen er som du", AlbumId = 24 },
                            new Song { Id = 280, SongName = "Tårer", AlbumId = 24 },
                            new Song { Id = 281, SongName = "Født til å skinne", AlbumId = 24 },
                            new Song { Id = 282, SongName = "Meg & Deg Mot Alle", AlbumId = 24 },
                            new Song { Id = 283, SongName = "Løve", AlbumId = 24 },
                            new Song { Id = 284, SongName = "Stjerneskudd", AlbumId = 24 }
                        }
                    }
                }
            }
        };

        foreach (Artist a in artists)
        {
            context.Artists.Add(a);
        }

        context.SaveChanges();
    }
}
