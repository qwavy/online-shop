var builder = WebApplication.CreateBuilder(args);


builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });
});

var app = builder.Build();
// builder.Services.AddCors();

app.UseCors();

var cart = new List<Cart>();

app.MapGet("/cart", () => cart);
app.MapGet("/cart/{id}", (int id) => cart.FirstOrDefault(item => item.Id == id));
app.MapPost("/cart", (Cart cartItem) => 
{

    cart.Add(cartItem);
});



app.MapPut("/cart", (Cart cartItem) =>
{
    var index = cart.FindIndex(item => item.Id == cartItem.Id);
    if (index < 0)
    {
        throw new Exception("not found");
    }
    cart[index] = cartItem;
});
app.MapDelete("/cart/{id}", (int id) =>
{
    var index = cart.FindIndex(item => item.Id == id);
    if (index < 0)
    {
        throw new Exception("not found");
    }
    cart.RemoveAt(index);
});


app.Run();


public class Cart
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public double Price { get; set; }
    public string Category { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Image { get; set; } = string.Empty;
}