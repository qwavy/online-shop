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
app.MapDelete("/cart/{id}", async (int id, ApplicationDbContext db) =>
{
    var cartFromDb = await db.Carts.FindAsync(new object[] { id });
    if (cartFromDb == null) return Results.NotFound();
    db.Carts.Remove(cartFromDb);
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.UseHttpsRedirection();

app.MapGet("/cart/total", (ApplicationDbContext db) =>
{
    double total = 0;
    foreach (var item in db.Carts)
    {
        total += item.Price;
    }
    return Results.Ok(total);
});



app.MapGet("/product/{id}", async (int id, ApplicationDbContext db) =>
    await db.Products.FirstOrDefaultAsync(item => item.Id == id) is Product product
    ? Results.Ok(product)
    : Results.NotFound());

app.MapPost("/product", async ([FromBody] Product productItem, [FromServices] ApplicationDbContext db) =>
{
    db.Products.Add(productItem);
    await db.SaveChangesAsync();
    return Results.Created($"/product/{productItem.Id}", productItem);
});

app.MapPut("/product", async ([FromBody] Product productItem, ApplicationDbContext db) =>
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

app.MapDelete("/product/{id}", async (int id, ApplicationDbContext db) =>
{
    var productFromDb = await db.Products.FindAsync(new object[] { id });
    if (productFromDb == null) return Results.NotFound();
    db.Products.Remove(productFromDb);
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.MapGet("/product/total", (ApplicationDbContext db) =>
{
    double total = 0;
    foreach (var item in db.Products)
    {
        total += item.Price;
    }
    return Results.Ok(total);
});


app.MapGet("/products/categories", async (ApplicationDbContext db) =>
{
    var categories = await db.Products.Select(p => p.Category).Distinct().ToListAsync();
    return Results.Ok(categories);
});
app.MapGet("/products/category/{category}", async (string category, string? sortingMethod, ApplicationDbContext db) =>
{
    var productsByCategory = await db.Products.Where(item => item.Category == category).ToListAsync();
    if (sortingMethod == "descending")
    {
        if (category == "all")
        {
            var sortedProductsAllCategory = db.Products.OrderByDescending(product => product.Price);
            return Results.Ok(sortedProductsAllCategory);
        }
        var sortedProducts = productsByCategory.OrderByDescending(product => product.Price);
        return Results.Ok(sortedProducts);
    }
    else if (sortingMethod == "ascending")
    {
        var sortedProducts = productsByCategory.OrderBy(product => product.Price);
        return Results.Ok(sortedProducts);
    }
    else if (sortingMethod == "rate")
    { 
        var sortedProducts = productsByCategory.OrderByDescending(product => product.Rate);
        return Results.Ok(sortedProducts);
    }
    else if (sortingMethod == "popularity")
    {
        var sortedProducts = productsByCategory.OrderByDescending(product => product.RateCount);
        return Results.Ok(sortedProducts);
    }
    else if (sortingMethod == "")   
    {
        return Results.Ok(productsByCategory);
    }
    return Results.Ok(productsByCategory);
});
app.MapGet("/products/topRate/", async (ApplicationDbContext db) =>
{
    var topRateProducts = await db.Products.Where(item => item.Rate >= 4).ToListAsync();

    return Results.Ok(topRateProducts);
});
app.MapGet("/products/searchResults/{value}", async (string value, ApplicationDbContext db) =>
{
    var searchProducts = await db.Products.Where(item => item.Title.ToLower().StartsWith(value.ToLower())).ToListAsync();
    return Results.Ok(searchProducts);
});
// app.MapGet("/products/category/{category}/sortBy/descending", async (string category, ApplicationDbContext db) =>
// {
//     if (category == "all")
//     {

//         var sortedProductsAll = db.Products.OrderByDescending(product => product.Price);
//         return Results.Ok(sortedProductsAll);
//     }
//     var products = await db.Products.Where(item => item.Category == category).ToListAsync();
//     var sortedProducts = products.OrderByDescending(product => product.Price);
//     return Results.Ok(sortedProducts);
// });
// app.MapGet("/products/category/{category}/sortBy/ascending", async (string category, ApplicationDbContext db) =>
// {
//     if (category == "all")
//     {

//         var sortedProductsAll = db.Products.OrderBy(product => product.Price);
//         return Results.Ok(sortedProductsAll);
//     }
//     var products = await db.Products.Where(item => item.Category == category).ToListAsync();
//     var sortedProducts = products.OrderBy(product => product.Price);
//     return Results.Ok(sortedProducts);
// });
// app.MapGet("/products/category/{category}/sortBy/popularity", async (string category, ApplicationDbContext db) =>
// {
//     if (category == "all")
//     {

//         var sortedProductsAll = db.Products.OrderByDescending(product => product.RateCount);
//         return Results.Ok(sortedProductsAll);
//     }
//     var products = await db.Products.Where(item => item.Category == category).ToListAsync();
//     var sortedProducts = products.OrderByDescending(product => product.RateCount);
//     return Results.Ok(sortedProducts);
// });
// app.MapGet("/products/category/{category}/sortBy/rate", async (string category, ApplicationDbContext db) =>
// {
//     if (category == "all")
//     {

//         var sortedProductsAll = db.Products.OrderByDescending(product => product.Rate);
//         return Results.Ok(sortedProductsAll);
//     }
//     var products = await db.Products.Where(item => item.Category == category).ToListAsync();
//     var sortedProducts = products.OrderByDescending(product => product.Rate);
//     return Results.Ok(sortedProducts);
// });
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
