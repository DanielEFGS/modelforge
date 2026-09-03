#nullable enable

using System.Text.Json.Serialization;

namespace ModelForge.Generated;

public sealed class Profile
{
    [JsonPropertyName("display_name")]
    public string DisplayName { get; init; } = string.Empty;
}
