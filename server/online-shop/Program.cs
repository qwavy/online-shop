var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddScoped<ApplicationDbContext>();

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
    var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    dbContext.Database.EnsureCreated();
}

app.UseCors();

app.MapGet("/cart", async (ApplicationDbContext db) => await db.Carts.ToListAsync());
app.MapGet("/product", async (ApplicationDbContext db) => await db.Products.ToListAsync());

app.MapGet("/cart/{id}", async (int id, ApplicationDbContext db) =>
    await db.Carts.FirstOrDefaultAsync(item => item.Id == id) is Cart cart
    ? Results.Ok(cart)
    : Results.NotFound());

app.MapPost("/cart", async ([FromBody] Cart cartItem, [FromServices] ApplicationDbContext db) =>
    {
        db.Carts.Add(cartItem);
        await db.SaveChangesAsync();
        return Results.Created($"/cart/{cartItem.Id}", cartItem);
    });

app.MapPut("/cart", async ([FromBody] Cart cartItem, ApplicationDbContext db) =>
{

    var cartFromDb = await db.Carts.FindAsync(new object[] { cartItem.Id });
    if (cartFromDb == null) return Results.NotFound();
    cartFromDb.Title = cartItem.Title;
    cartFromDb.Price = cartItem.Price;
    cartFromDb.Category = cartItem.Category;
    cartFromDb.Description = cartItem.Description;
    cartFromDb.Image = cartItem.Image;

    await db.SaveChangesAsync();
    return Results.NoContent();
});
app.MapDelete("/cart/{id}", async (int id,  ApplicationDbContext db) =>
{
    var cartFromDb = await db.Carts.FindAsync(new object[] { id });
    if (cartFromDb == null) return Results.NotFound();
    db.Carts.Remove(cartFromDb);
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.UseHttpsRedirection();

app.MapGet("/cart/total", ( ApplicationDbContext db) =>
{
    double total = 0;
    foreach (var item in db.Carts)
    {
        total += item.Price;
    }
    return Results.Ok(total);
});



app.MapGet("/product/{id}", async (int id,  ApplicationDbContext db) =>
    await db.Products.FirstOrDefaultAsync(item => item.Id == id) is Product product
    ? Results.Ok(product)
    : Results.NotFound());

app.MapPost("/product", async ([FromBody] Product productItem, [FromServices]  ApplicationDbContext db) =>
{
    db.Products.Add(productItem);
    await db.SaveChangesAsync();
    return Results.Created($"/product/{productItem.Id}", productItem);
});

app.MapPut("/product", async ([FromBody] Product productItem,  ApplicationDbContext db) =>
{
    var productFromDb = await db.Products.FindAsync(new object[] { productItem.Id });
    if (productFromDb == null) return Results.NotFound();
    productFromDb.Title = productItem.Title;
    productFromDb.Price = productItem.Price;
    productFromDb.Category = productItem.Category;
    productFromDb.Description = productItem.Description;
    productFromDb.Image = productItem.Image;
    productFromDb.Rate = productItem.Rate;
    productFromDb.RateCount = productItem.RateCount;

    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.MapDelete("/product/{id}", async (int id,  ApplicationDbContext db) =>
{
    var productFromDb = await db.Products.FindAsync(new object[] { id });
    if (productFromDb == null) return Results.NotFound();
    db.Products.Remove(productFromDb);
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.MapGet("/product/total", ( ApplicationDbContext db) =>
{
    double total = 0;
    foreach (var item in db.Products)
    {
        total += item.Price;
    }
    return Results.Ok(total);
});


app.MapGet("/products/categories", async ( ApplicationDbContext db) =>
{
    var categories = await db.Products.Select(p => p.Category).Distinct().ToListAsync();
    return Results.Ok(categories);
});
app.MapGet("/products/category/{category}", async (string category, ApplicationDbContext db) =>
{
    var products = await db.Products.Where(item => item.Category == category).ToListAsync();
    return Results.Ok(products);
});
app.Run();


public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Cart> Carts { get; set; }
    public DbSet<Product> Products { get; set; }
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



public class Product
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public double Price { get; set; }
    public string Category { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Image { get; set; } = string.Empty;
    public double Rate { get; set; }
    public double RateCount { get; set; }

}
