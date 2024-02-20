
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<CartDb>(options =>
{
    options.UseSqlite(builder.Configuration.GetConnectionString("Sqlite"));
});

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });
});

var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    using var scope = app.Services.CreateScope();
    var db = scope.ServiceProvider.GetRequiredService<CartDb>();
    db.Database.EnsureCreated();

}

app.UseCors();


app.MapGet("/cart", async (CartDb db) => await db.Carts.ToListAsync());


app.MapGet("/cart/{id}", async (int id, CartDb db) =>
    await db.Carts.FirstOrDefaultAsync(item => item.Id == id) is Cart cart
    ? Results.Ok(cart)
    : Results.NotFound());

// app.MapGet("/cart/", (int id) => cart.FirstOrDefault(item => item.Id == id));
app.MapPost("/cart", async ([FromBody] Cart cartItem,[FromServices] CartDb db) =>
    {
        db.Carts.Add(cartItem);
        await db.SaveChangesAsync();
        return Results.Created($"/cart/{cartItem.Id}" ,cartItem);
    });




app.MapPut("/cart", async ([FromBody] Cart cartItem , CartDb db) =>
{

    var cartFromDb = await db.Carts.FindAsync(new object[] {cartItem.Id});
    if (cartFromDb == null) return Results.NotFound();
    cartFromDb.Title = cartItem.Title;
    cartFromDb.Price = cartItem.Price;
    cartFromDb.Category = cartItem.Category;
    cartFromDb.Description = cartItem.Description;
    cartFromDb.Image = cartItem.Image;

    await db.SaveChangesAsync();
    return Results.NoContent();
});
app.MapDelete("/cart/{id}", async (int id, CartDb db) =>
{
    var cartFromDb = await db.Carts.FindAsync(new object[] {id});
    if (cartFromDb == null) return Results.NotFound();
    db.Carts.Remove(cartFromDb);
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.UseHttpsRedirection();

app.MapGet("/cart/total", (CartDb db) =>
{
    double total = 0;
    foreach (var item in db.Carts)
    {
        total += item.Price;
    }
    return Results.Ok(total);
});


app.Run();


public class CartDb : DbContext
{
    public CartDb(DbContextOptions<CartDb> options) : base(options) { }
    public DbSet<Cart> Carts => Set<Cart>();
}

public class Cart
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public double Price { get; set; }
    public string Category { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Image { get; set; } = string.Empty;
}