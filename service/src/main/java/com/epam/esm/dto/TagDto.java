package com.epam.esm.dto;

import java.util.Objects;

public class TagDto extends BaseEntityDto  {

  private String name;

  public TagDto(Long id, String name) {
    this.id = id;
    this.name = name;
  }

  public TagDto(String name) {
    this(null, name);
  }

  public TagDto() {}

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    TagDto tagDto = (TagDto) o;
    return Objects.equals(id, tagDto.id) && Objects.equals(name, tagDto.name);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, name);
  }

  @Override
  public String toString() {
    return "TagDto {" + "id=" + id + ", name='" + name + '\'' + '}';
  }
}
