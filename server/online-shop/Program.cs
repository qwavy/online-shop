var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<CartDb>(options =>
{
    options.UseSqlite(builder.Configuration.GetConnectionString("Sqlite"));
});
builder.Services.AddDbContext<ProductDb>(options =>
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

if(app.Environment.IsDevelopment())
{
    using var scope = app.Services.CreateScope();
    var cartDb = scope.ServiceProvider.GetRequiredService<CartDb>();
    var productDb = scope.ServiceProvider.GetRequiredService<ProductDb>();
    cartDb.Database.EnsureCreated();
    productDb.Database.EnsureCreated();
}

app.UseCors();

app.MapGet("/cart", async (CartDb db) => await db.Carts.ToListAsync());
app.MapGet("/product", async (ProductDb db) => await db.Products.ToListAsync());

app.MapGet("/cart/{id}", async (int id, CartDb db) =>
    await db.Carts.FirstOrDefaultAsync(item => item.Id == id) is Cart cart
    ? Results.Ok(cart)
    : Results.NotFound());

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



app.MapGet("/product/{id}", async (int id, ProductDb db) =>
    await db.Products.FirstOrDefaultAsync(item => item.Id == id) is Product product
    ? Results.Ok(product)
    : Results.NotFound());

app.MapPost("/product", async ([FromBody] Product productItem, [FromServices] ProductDb db) =>
{
    db.Products.Add(productItem);
    await db.SaveChangesAsync();
    return Results.Created($"/product/{productItem.Id}", productItem);
});

app.MapPut("/product", async ([FromBody] Product productItem, ProductDb db) =>
{
    var productFromDb = await db.Products.FindAsync(new object[] { productItem.Id });
    if (productFromDb == null) return Results.NotFound();
    productFromDb.Title = productItem.Title;
    productFromDb.Price = productItem.Price;
    productFromDb.Category = productItem.Category;
    productFromDb.Description = productItem.Description;
    productFromDb.Image = productItem.Image;

    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.MapDelete("/product/{id}", async (int id, ProductDb db) =>
{
    var productFromDb = await db.Products.FindAsync(new object[] { id });
    if (productFromDb == null) return Results.NotFound();
    db.Products.Remove(productFromDb);
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.MapGet("/product/total", (ProductDb db) =>
{
    double total = 0;
    foreach (var item in db.Products)
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

public class ProductDb : DbContext
{
    public ProductDb(DbContextOptions<ProductDb> options) : base(options) {}
    public DbSet<Product> Products => Set<Product>(); 
}

public class Product
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public double Price { get; set; }
    public string Category { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Image { get; set; } = string.Empty;
}
