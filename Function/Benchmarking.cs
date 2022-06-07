using System.Net;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;

namespace Function;

public static class Benchmarking
{
    [Function("Benchmarking")]
    public static async Task<HttpResponseData> Run([HttpTrigger(AuthorizationLevel.Function, "get")] HttpRequestData req,
        FunctionContext executionContext)
    {
        var response = req.CreateResponse(HttpStatusCode.OK);

        var asd = new Dictionary<string, string>
        {
            {"hello", "world"}
        };
        
        await response.WriteAsJsonAsync(asd);

        return response;
    }
}