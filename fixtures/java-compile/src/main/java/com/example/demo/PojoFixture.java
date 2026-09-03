package com.example.demo;

import java.time.OffsetDateTime;
import java.util.List;

public class PojoFixture {
    private Long id;
    private OffsetDateTime created;
    private List<String> tags;

    public PojoFixture() {}

    public PojoFixture(Long id, OffsetDateTime created, List<String> tags) {
        this.id = id;
        this.created = created;
        this.tags = tags;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public OffsetDateTime getCreated() { return created; }
    public void setCreated(OffsetDateTime created) { this.created = created; }
    public List<String> getTags() { return tags; }
    public void setTags(List<String> tags) { this.tags = tags; }
}
