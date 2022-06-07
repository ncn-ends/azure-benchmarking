var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/api/benchmark", () => new Dictionary<string, string>
{
    {"hello", "world"}
});

app.Run();