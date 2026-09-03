#nullable enable

using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace ModelForge.Generated;

public sealed class User
{
    [JsonPropertyName("id")]
    public long Id { get; init; }

    [JsonPropertyName("profile")]
    public Profile Profile { get; init; } = null!;

    [JsonPropertyName("tags")]
    public List<string> Tags { get; init; } = new();

    [JsonPropertyName("phone")]
    public string? Phone { get; init; }
}
